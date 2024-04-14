package graph

import (
	"middleware_loader/infrastructure/graph/service_registry"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct{
	AuthGraphQLService service_registry.AuthService
	TaskGraphQLService service_registry.TaskService
	ProjectGraphQLService service_registry.ProjectService
	UserGraphQLService service_registry.UserService
	GroupTaskGraphQLService service_registry.GroupTaskService
}