package routers

import (
	"middleware_loader/core/services"
	database_mongo "middleware_loader/kernel/database/mongo"
)

type UserRouter struct {
	UserService *services.UserService
}
func NewUserRouter(userService *services.UserService, db database_mongo.Database)