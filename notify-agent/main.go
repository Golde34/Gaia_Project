package main

import (
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// Quản lý các kết nối WebSocket theo userId
var userConnections = struct {
	sync.Mutex
	connections map[string]*websocket.Conn
}{connections: make(map[string]*websocket.Conn)}

func sendToUser(userId string, message []byte) {
	userConnections.Lock()
	defer userConnections.Unlock()

	if conn, ok := userConnections.connections[userId]; ok {
		err := conn.WriteMessage(websocket.TextMessage, []byte(message))
		if err != nil {
			log.Println("Error sending message to user:", err)
			conn.Close()
			delete(userConnections.connections, userId)
		}
	} else {
		log.Println("No active connection for userId:", userId)
	}
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
	userId := r.URL.Query().Get("userId")
	if userId == "" {
		log.Println("Missing userId in WebSocket connection")
		conn.Close()
		return
	}
	log.Println("userId:", userId)
	userConnections.Lock()
	userConnections.connections[userId] = conn
	userConnections.Unlock()

	log.Println("User connected")

	for {
		// Nhận tin nhắn từ client
		messageType, message, err := conn.ReadMessage()
		if err != nil {
			log.Println("User disconnected:", userId)
			userConnections.Lock()
			delete(userConnections.connections, userId)
			userConnections.Unlock()
			break
		}

		log.Printf("Received: %s of user %s", message, userId)

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
