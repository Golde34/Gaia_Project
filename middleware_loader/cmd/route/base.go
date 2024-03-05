package route

import (
	"middleware_loader/core/middleware"
	database_mongo "middleware_loader/kernel/database/mongo"
	"net/http"

	"github.com/go-chi/chi"
)

func CheckMicroserviceStatusMiddleware(router *chi.Mux, db database_mongo.Database, microserviceName string) func (next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			middleware.CheckMicroserviceStatusMiddleware(router, db, microserviceName)
			next.ServeHTTP(w, r)
		})
	}
}