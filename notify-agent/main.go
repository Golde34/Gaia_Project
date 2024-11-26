package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// WebSocket xử lý kết nối
func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	// Nâng cấp kết nối HTTP lên WebSocket
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("WebSocket upgrade error:", err)
		return
	}
	defer conn.Close()

	log.Println("Client connected!")

	// Lắng nghe và gửi dữ liệu qua lại
	for {
		// Nhận tin nhắn từ client
		messageType, message, err := conn.ReadMessage()
		if err != nil {
			log.Println("Read error:", err)
			break
		}

		log.Printf("Received: %s", message)

		// Gửi phản hồi lại client
		err = conn.WriteMessage(messageType, append([]byte("Server: "), message...))
		if err != nil {
			log.Println("Write error:", err)
			break
		}
	}
}

func main() {
	http.HandleFunc("/ws", handleWebSocket)

	port := "4003"
	log.Println("Server listening on port", port)
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatal("ListenAndServe error:", err)
	}
}