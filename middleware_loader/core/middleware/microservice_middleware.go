package middleware

import (
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/core/domain/models"
	"middleware_loader/core/services"
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

func CheckMicroserviceStatusMiddleware(router *chi.Mux, db database_mongo.Database, microserviceName string) {
	router.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			result, err := isServiceActive(db, microserviceName)
			if result.ErrorCode != 200 || err == nil {
				w.WriteHeader(http.StatusForbidden)
				return
			}
			next.ServeHTTP(w, r)
		})
	})
}

func isServiceActive(db database_mongo.Database, microserviceName string) (models.ErrorResponse, error) {
	var microservice request_dtos.GetMicroserviceConfigurationDTO
	microservice.MicroserviceName = microserviceName
	microserviceConfigService := services.NewMicroserviceConfigurationService(
		store.NewMicroserviceConfigurationStore(db),
	)

	return microserviceConfigService.CheckMicroserviceStatus(microservice)
}
