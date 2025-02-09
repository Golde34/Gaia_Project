#!/bin/bash

echo "🔄 Đang cập nhật code..."
git pull origin main

echo "🛠️ Đang build dự án Golde AI Assistant..."
go build -o golde_ai_assistant src/main.go  # Nếu dùng Golang

echo "🚀 Restarting service..."
sudo systemctl restart golde_ai_assistant

echo "✅ Deploy hoàn tất!"
