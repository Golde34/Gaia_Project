package route

import (
	"middleware_loader/core/services"
	"middleware_loader/infrastructure/graph"
	database_mongo "middleware_loader/kernel/database/mongo"
	"middleware_loader/ui/routers"

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

	routers.NewAuthRouter(authService, db, router)
	routers.NewGaiaRouter(gaiaService, db, router)
	routers.NewTaskRouter(taskService, db, router)
	routers.NewProjectRouter(projectService, db, router)
}
