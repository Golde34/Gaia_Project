import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const WebSocketContext = createContext(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const clientRef = useRef(null);

    useEffect(() => {
        const client = new W3CWebSocket('ws://localhost:8080/ws');
        clientRef.current = client;

        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };

        client.onmessage = (message) => {
            console.log("Receive message: ", message);
            setMessages((prev) => [...prev, message.data]);
        };

        client.onclose = () => {
            console.log('WebSocket Client Disconnected');
        };

        return () => {
            client.close();
        };
    }, []);

    const sendMessage = (message) => {
        if (clientRef.current && clientRef.current.readyState === 1) {
            clientRef.current.send(message);
        } else {
            console.error('WebSocket is not connected');
        }
    };

    return (
        <WebSocketContext.Provider value={{ messages, sendMessage }}>
            {children}
        </WebSocketContext.Provider>
    )
}