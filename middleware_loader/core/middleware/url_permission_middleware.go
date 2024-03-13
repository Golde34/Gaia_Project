package middleware

import (
	"middleware_loader/core/domain/models"
	"middleware_loader/core/store"
	database_mongo "middleware_loader/kernel/database/mongo"
	"net/http"
)

type UrlPermissionConfigMiddleware struct {
	Store store.MicroserviceConfigurationStore
}

func NewUrlPermissionConfigMiddleware(store store.MicroserviceConfigurationStore) *UrlPermissionConfigMiddleware {
	return &UrlPermissionConfigMiddleware{store}
}

func CheckUrlPermissionConfig(db database_mongo.Database) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			result, err := isUrlPermissionConfigActive(db)
			if err != nil || result.ErrorCode != 200 {
				w.WriteHeader(http.StatusBadRequest)
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}

func isUrlPermissionConfigActive(db database_mongo.Database) (models.ErrorResponse, error) {
	return models.ErrorResponse{}, nil
}
