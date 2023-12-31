package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"

	"middleware_loader/core/services"
	"middleware_loader/infrastructure/graph"
)

func main() {
	port := "4000"
	router := chi.NewRouter()

	router.Use(middleware.Logger)
	router.Use(middleware.RequestID)
	router.Use(middleware.Recoverer)
	router.Use(middleware.RedirectSlashes)
	router.Use(middleware.Timeout(time.Second * 60))

	// SERVICES
	authService := services.NewAuthService()	

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
	
	router.Post("/auth/signin", func(w http.ResponseWriter, r *http.Request) {
		// Parse the request body
		var input = authService.SigninInput
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		
		// Convert the signin input into a GraphQL query
		query := fmt.Sprintf(`
			mutation {
				signin(input: { username: "%s", password: "%s" }) {
					accessToken,
					refreshToken,
					name,
					username,
					email,
					lastLogin
				}
			}
		`, input.Username, input.Password)

		// Wrap the query in a JSON object
		jsonQuery := map[string]string{
			"query": query,
		}

		// Encode the JSON object into a buffer
		var buf bytes.Buffer
		if err := json.NewEncoder(&buf).Encode(jsonQuery); err != nil {
			log.Printf("err: %v", err)
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		//Send the query to the GraphQL server
		resp, err := http.Post("http://localhost:4000/query", "application/json", &buf)
		if err != nil {
			log.Printf("err: %v", err)
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		defer resp.Body.Close()

		io.Copy(w, resp.Body)
	})

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))	
}