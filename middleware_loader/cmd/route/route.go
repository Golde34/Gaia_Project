package route

import (
	"middleware_loader/core/services"
	"middleware_loader/infrastructure/graph"
	database_mongo "middleware_loader/kernel/database/mongo"
	auth_router "middleware_loader/ui/routers/auth_service"
	gaia_router "middleware_loader/ui/routers/gaia_connector"
	task_router "middleware_loader/ui/routers/task_manager"
	middleware_router "middleware_loader/ui/routers/middleware_service"

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
	router.Group(func(r chi.Router) {
		middleware_router.NewMicroserviceRouter(db, router)
		middleware_router.NewURLPermissionRouter(db, router)
	})

	auth_router.NewAuthRouter(authService, db, router)
	gaia_router.NewGaiaRouter(gaiaService, db, router)
	router.Group(func(r chi.Router) {
		task_router.NewProjectRouter(projectService, db, router)
		task_router.NewTaskRouter(taskService, db, router)
	})
}
