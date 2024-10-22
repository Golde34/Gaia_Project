package routers

import (
	"middleware_loader/core/domain/enums"
	"middleware_loader/core/middleware"
	services "middleware_loader/core/services/auth_services"
	database_mongo "middleware_loader/kernel/database/mongo"
	controller "middleware_loader/ui/controller_services/auth_service"
	"net/http"

	"github.com/go-chi/chi"
)

type RoleRouter struct {
	RoleService *services.RoleService
}

func NewRoleRouter(roleService *services.RoleService, db database_mongo.Database, r *chi.Mux) *RoleRouter {
	r.Route("/role", func(r chi.Router) {
		r.Use(middleware.CheckMicroserviceStatus(db, enums.AUTH_SERVICE))
		r.Get("/get-all-roles", func(w http.ResponseWriter, r *http.Request) {
			controller.GetAllRoles(w, r, roleService)
		})
		r.Post("/create-role", func(w http.ResponseWriter, r *http.Request) {
			controller.CreateRole(w, r, roleService)
		})
		r.Put("/update-role", func(w http.ResponseWriter, r *http.Request) {
			// controller_services.UpdateRole(w, r, roleService)
		})
		// r.Delete("/delete-role", func(w http.ResponseWriter, r *http.Request) {
		// 	controller_services.DeleteRole(w, r, roleService)
		// })
		// r.Get("/get-role", func(w http.ResponseWriter, r *http.Request) {
		// 	controller_services.GetRoleByUsername(w, r, roleService)
		// })
	})
	return &RoleRouter{
		RoleService: roleService,
	}
}