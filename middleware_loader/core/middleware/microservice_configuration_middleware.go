package middleware

import (
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/core/domain/models"
	services "middleware_loader/core/services/repo_service"
	"middleware_loader/core/store"
	database_mongo "middleware_loader/kernel/database/mongo"
	"net/http"

	"github.com/go-chi/chi"
)

type MicroserviceConfigurationMiddleware struct {
	Store store.MicroserviceConfigurationStore
}

func NewMicroserviceConfigurationMiddleware(store store.MicroserviceConfigurationStore) *MicroserviceConfigurationMiddleware {
	return &MicroserviceConfigurationMiddleware{store}
}

func CheckAuthMicroserviceStatus(handler http.Handler, db database_mongo.Database) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		result := getMicroserviceByName(db, "AUTH_SERVICE")
		if result.ErrorCode != 200 {
			w.WriteHeader(http.StatusForbidden)
			return
		}
		handler.ServeHTTP(w, r)
	})
}

func CheckMicroserviceStatusMiddleware(router *chi.Mux, db database_mongo.Database, microserviceName string) {
	router.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			result := getMicroserviceByName(db, "AUTH_SERVICE")
			if result.ErrorCode != 200 {
				w.WriteHeader(http.StatusForbidden)
				return
			}
			next.ServeHTTP(w, r)
		})
	})
}

func getMicroserviceByName(db database_mongo.Database, microserviceName string) models.ErrorResponse {
	var microservice request_dtos.GetMicroserviceConfigurationDTO
	microservice.MicroserviceName = microserviceName
	microserviceConfigurationStore := store.NewMicroserviceConfigurationStore(db)
	microserviceConfigurationService := services.NewMicroserviceConfigurationService(microserviceConfigurationStore)
	return microserviceConfigurationService.GetMicroserviceByName(microservice)
}
