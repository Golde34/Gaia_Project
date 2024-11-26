import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const WebSocketContext = createContext(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const connectWebSocket = () => {
    const userId = "1";
    console.log("Attempting to connect...");
    const client = new W3CWebSocket(`ws://localhost:4003/ws?userId=${userId}`);

    client.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
      clearTimeout(reconnectTimeoutRef.current);
    };

    client.onmessage = (message) => {
      console.log("Received message:", message.data);
      setMessages((prev) => [...prev, message.data]);
    };

    client.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
      attemptReconnect(); 
    };

    client.onerror = (error) => {
      console.error("WebSocket error:", error);
      client.close();
    };

    clientRef.current = client;
  };

  const attemptReconnect = () => {
    console.log("Attempting to reconnect...");
    reconnectTimeoutRef.current = setTimeout(() => {
      connectWebSocket();
    }, 5000);
  };

  const sendMessage = (msg) => {
    if (clientRef.current && clientRef.current.readyState === WebSocket.OPEN) {
      clientRef.current.send(msg);
    } else {
      console.error("WebSocket not connected, message not sent");
    }
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (clientRef.current) {
        clientRef.current.close();
      }
      clearTimeout(reconnectTimeoutRef.current);
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ messages, sendMessage, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
};