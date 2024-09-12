package route

import (
	"net/http"

	"github.com/go-chi/chi"
)

func Setup(router *chi.Mux) {
	router.Group(func(r chi.Router) {
		r.Post("/store-chat-log", func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte("Store chat log will be implemented soon"))
		})
	})
}