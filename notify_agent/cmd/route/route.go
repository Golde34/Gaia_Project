package route

import (

	websocket_services "notify_"

	"github.com/go-chi/chi"
)

func Setup(router *chi.Mux) {
	websocketService := websocket_services.NewWebSocketService()
}