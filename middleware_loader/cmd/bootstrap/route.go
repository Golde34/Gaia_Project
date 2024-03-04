package bootstrap

import (
	"middleware_loader/core/middleware"
	services "middleware_loader/core/services/graphql_service"
	repo_services "middleware_loader/core/services/repo_service"
	"middleware_loader/core/store"
	"middleware_loader/infrastructure/graph"
	database_mongo "middleware_loader/kernel/database/mongo"
	"middleware_loader/ui/routers"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
)

func Setup(router *chi.Mux, db database_mongo.Database) {

	// SERVICES
	authService := services.NewAuthService()
	gaiaService := services.NewGaiaService()
	taskService := services.NewTaskService()
	projectService := services.NewProjectService()

	// GRAPHQL FEDERATION
	router.Handle("/graphql", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", handler.NewDefaultServer(
		graph.NewExecutableSchema(
			graph.Config{
				Resolvers: &graph.Resolver{
					AuthGraphQLService:    authService,
					TaskGraphQLService:    taskService,
					ProjectGraphQLService: projectService,
				},
			},
		),
	))

	// ROUTERS
	routers.NewMicroserviceRouter(db, router)
	routers.NewURLPermissionRouter(db, router)

	// Auth Routers
	router.Group(func(r chi.Router) {
		middleware.CheckMicroserviceStatusMiddleware(router, db, "AUTH_SERVICE")	
		routers.NewAuthRouter(authService, router)
	})

	// Gaia Routers
	router.Group(func(r chi.Router) {
		router.Use(func(next http.Handler) http.Handler {
			return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				repo_services.NewMicroserviceConfigurationService(
					store.NewMicroserviceConfigurationStore(db),
				)
				next.ServeHTTP(w, r)
			})
		})
		routers.NewGaiaRouter(gaiaService, router)
	})

	// Task Manager Routers
	router.Group(func(r chi.Router) {
		routers.NewTaskRouter(taskService, router)
		routers.NewProjectRouter(projectService, router)
	})
}
