package graph

import (
	"middleware_loader/core/graph_services"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct{
	AuthService graph_services.AuthService
}