package repository

import (
	database_mongo "middleware_loader/kernel/database/mongo"
)

// MicroserviceStatusRepository ...
type MicroserviceStatusRepository struct {
	Database database_mongo.Database
}

// NewMicroserviceStatusRepository ...
func NewMicroserviceStatusRepository(db database_mongo.Database) MicroserviceStatusRepository {
	return MicroserviceStatusRepository{db}
}