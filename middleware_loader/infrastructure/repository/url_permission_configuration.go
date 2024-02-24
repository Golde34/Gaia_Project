package repository

import (
	database_mongo "middleware_loader/kernel/database/mongo"
)

// URLPermissionConfigurationRepository ...
type URLPermissionConfigurationRepository struct {
	Database database_mongo.Database
}

// NewURLPermissionConfigurationRepository ...
func NewURLPermissionConfigurationRepository(db database_mongo.Database) URLPermissionConfigurationRepository {
	return URLPermissionConfigurationRepository{db}
}
