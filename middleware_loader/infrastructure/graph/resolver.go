package graph

import (
	"middleware_loader/infrastructure/graph/service_registry"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct{
	AuthService service_registry.AuthService
}