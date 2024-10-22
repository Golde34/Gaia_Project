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

type PrivilegeRouter struct {
	PrivilegeService *services.PrivilegeService
}

func NewPrivilegeRouter(privilegeService *services.PrivilegeService, db database_mongo.Database, r *chi.Mux) *PrivilegeRouter {
	r.Route("/privilege", func(r chi.Router) {
		r.Use(middleware.CheckMicroserviceStatus(db, enums.AUTH_SERVICE))
		r.Get("/get-all-privileges", func(w http.ResponseWriter, r *http.Request) {
			controller.GetAllPrivileges(w, r, privilegeService)
		})
	})
	return &PrivilegeRouter{PrivilegeService: privilegeService}
}