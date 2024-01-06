package routers

import (
	"middleware_loader/core/services"
	"middleware_loader/ui/controller_services"
	"net/http"

	"github.com/go-chi/chi"
)

type AuthRouter struct {
	AuthService *services.AuthService
}

func NewAuthRouter(authService *services.AuthService, r *chi.Mux) *AuthRouter {
	r.Route("/auth", func(r chi.Router) {
		r.Post("/sign-in", func(w http.ResponseWriter, r *http.Request) {
			controller_services.Signin(w, r, authService)
		})
	})
	return &AuthRouter{
		AuthService: authService,
	}
}