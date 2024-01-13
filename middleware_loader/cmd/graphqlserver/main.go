package main

import (
	"log"
	"net/http"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"

	"middleware_loader/core/services"
	"middleware_loader/infrastructure/graph"
	"middleware_loader/ui/routers"
)

func main() {
	port := "4000"
    router := chi.NewRouter()

    router.Use(middleware.Logger)
    router.Use(middleware.RequestID)
    router.Use(middleware.Recoverer)
    router.Use(middleware.RedirectSlashes)
    router.Use(middleware.Timeout(time.Second * 60))

    cors := cors.New(cors.Options{
        AllowedOrigins:   []string{"http://localhost:5173"},
        AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
        ExposedHeaders:   []string{"Link"},
        AllowCredentials: true,
        MaxAge:           300, // Maximum value not ignored by any of major browsers
    })
    router.Use(cors.Handler)

    // SERVICES
    authService := services.NewAuthService()
    middlewareService := services.NewMiddlewareService()
    gaiaService := services.NewGaiaService()

    // ROUTERS
    routers.NewAuthRouter(authService, router)
    routers.NewGaiaRouter(gaiaService, router)
    routers.NewMiddlewareRouter(middlewareService, router)

    // GRAPHQL
    router.Handle("/", playground.Handler("GraphQL playground", "/query"))
    router.Handle("/query", handler.NewDefaultServer(
        graph.NewExecutableSchema(
            graph.Config{
                Resolvers: &graph.Resolver{
                    AuthService: authService,
                },
            },
        ),
    ))

    log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
    log.Fatal(http.ListenAndServe(":"+port, router))
}
