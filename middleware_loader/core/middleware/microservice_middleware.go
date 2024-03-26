package middleware

import (
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/core/domain/dtos/base"
	"middleware_loader/core/services/middleware_loader"
	"middleware_loader/core/port/store"
	database_mongo "middleware_loader/kernel/database/mongo"
	"net/http"
)

type MicroserviceConfigurationMiddleware struct {
	Store store.MicroserviceConfigurationStore
}

func NewMicroserviceConfigurationMiddleware(store store.MicroserviceConfigurationStore) *MicroserviceConfigurationMiddleware {
	return &MicroserviceConfigurationMiddleware{store}
}

func CheckMicroserviceStatus(db database_mongo.Database, microserviceName string) func(next http.Handler) http.Handler {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            result, err := isServiceActive(db, microserviceName)
			if err != nil || result.ErrorCode != 200 {
				w.WriteHeader(http.StatusBadRequest)
				return
			}
            next.ServeHTTP(w, r)
        })
    }
}

func isServiceActive(db database_mongo.Database, microserviceName string) (base_dtos.ErrorResponse, error) {
	var microservice request_dtos.GetMicroserviceConfigurationDTO
	microservice.MicroserviceName = microserviceName
	microserviceConfigService := services.NewMicroserviceConfigurationService(
		store.NewMicroserviceConfigurationStore(db),
	)

	return microserviceConfigService.CheckMicroserviceStatus(microservice)
}
