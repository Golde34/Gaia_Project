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

type UserRouter struct {
	UserService *services.UserService
}

func NewUserRouter(userService *services.UserService, db database_mongo.Database, r *chi.Mux) *UserRouter {
	r.Route("/user", func(r chi.Router) {
		r.Use(middleware.CheckMicroserviceStatus(db, enums.AUTH_SERVICE))
		r.Get("/get-all-users", func(w http.ResponseWriter, r *http.Request) {
			controller_services.GetAllUsers(w, r, userService)
		})
		// r.Post("/create-user", func(w http.ResponseWriter, r *http.Request) {
		// 	controller_services.CreateUser(w, r, userService)
		// })
		r.Put("/update-user", func(w http.ResponseWriter, r *http.Request) {
			controller_services.UpdateUser(w, r, userService)
		})
		// r.Delete("/delete-user", func(w http.ResponseWriter, r *http.Request) {
		// 	controller_services.DeleteUser(w, r, userService)
		// })
		// r.Get("/get-user", func(w http.ResponseWriter, r *http.Request) {
		// 	controller_services.GetUserByUsername(w, r, userService)
		// })
	})
	return &UserRouter{
		UserService: userService,
	}
}
