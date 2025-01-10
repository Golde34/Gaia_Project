package services

import (
	"encoding/json"
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

type WebSocketService struct {}

func NewWebSocketService() *WebSocketService {
	return &WebSocketService{}
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var userConnections = struct {
	sync.Mutex
	connections map[string]*websocket.Conn
}{connections: make(map[string]*websocket.Conn)}

func (s *WebSocketService) HandleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("WebSocket upgrade error:", err)
		return
	}
	defer conn.Close()

	userId := r.URL.Query().Get("userId")
	if userId == "" {
		log.Println("Missing userId in WebSocket connection")
		return
	}

	log.Println("Client connected, userId:", userId)

	// Ghi đè kết nối cũ nếu tồn tại
	userConnections.Lock()
	if existingConn, exists := userConnections.connections[userId]; exists {
		log.Println("Closing existing connection for user:", userId)
		existingConn.Close()
	}
	userConnections.connections[userId] = conn
	log.Println("Updated userConnections for userId:", userId)
	userConnections.Unlock()

	
	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			log.Println("Connection closed for userId:", userId)
			userConnections.Lock()
			delete(userConnections.connections, userId)
			userConnections.Unlock()
			break
		}
		log.Printf("Message received from userId %s: %s", userId, message)
	}
}
func SendToUser(userId string, message []byte) {
	log.Println("Attempting to send message to user:", userId)

	if conn, ok := userConnections.connections[userId]; ok {
		log.Println("Connection found for user:", userId)
		err := conn.WriteMessage(websocket.TextMessage, message)
		if err != nil {
			log.Println("Error sending message to user:", userId, "Error:", err)
			conn.Close()
			delete(userConnections.connections, userId)
		} else {
			log.Println("Message sent successfully to user:", userId)
		}
	} else {
		log.Println("No active connection found for user:", userId)
	}
}

func (s *WebSocketService) HandleOptimizeTask(userId string, status bool) {
	log.Printf("Starting optimization task for user %s...", userId)

	response := map[string]interface{}{
		"type":   "task_optimized",
		"userId": userId,
		"status": "success",
	}
	if !status{
		response["status"] = "failed"
		response["type"] = "task_failed"
	}

	responseBytes, err := json.Marshal(response)
	if err != nil {
		log.Println("Error marshaling response:", err)
		return
	}
	log.Println("Response:", string(responseBytes))

	LogActiveConnections()
	SendToUser(userId, responseBytes)
}

func LogActiveConnections() {
	userConnections.Lock()
	defer userConnections.Unlock()

	log.Println("Active connections:")
	for userId := range userConnections.connections {
		log.Println("- UserId:", userId)
	}
}
