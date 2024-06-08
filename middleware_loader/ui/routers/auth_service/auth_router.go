package routers

import (
	"middleware_loader/core/domain/enums"
	"middleware_loader/core/middleware"
	"middleware_loader/core/services/auth_services"
	database_mongo "middleware_loader/kernel/database/mongo"
	"middleware_loader/ui/controller_services"
	"net/http"

	"github.com/go-chi/chi"
)

type AuthRouter struct {
	AuthService *services.AuthService
}

func NewAuthRouter(authService *services.AuthService, db database_mongo.Database, r *chi.Mux) *AuthRouter {
	r.Route("/auth", func(r chi.Router) {
		r.Use(middleware.CheckMicroserviceStatus(db, enums.AUTH_SERVICE))
		r.Post("/sign-in", func(w http.ResponseWriter, r *http.Request) {
			controller_services.Signin(w, r, authService)
		})
		r.Post("/gaia-auto-sign-in", func(w http.ResponseWriter, r *http.Request) {
			controller_services.GaiaAutoSignin(w, r, authService)
		})
	})
	return &AuthRouter{
		AuthService: authService,
	}
}
