package repository

import (
	"context"
	"middleware_loader/core/domain/entity"
	database_mongo "middleware_loader/kernel/database/mongo"

	"go.mongodb.org/mongo-driver/bson"
)

type GaiaConfigurationRepository struct {
	Database   database_mongo.Database
	Collection database_mongo.Collection
}

func NewGaiaConfigurationRepository(db database_mongo.Database, collection database_mongo.Collection) GaiaConfigurationRepository {
	return GaiaConfigurationRepository{db, collection}
}

func (repo *GaiaConfigurationRepository) GetAllGaiaConfiguration(context context.Context, paramType string) ([]entity.GaiaConfiguration, error) {
	filter := bson.M{"paramType": paramType, "status": true}
	results, err := repo.Collection.Find(context, filter)
	if err != nil {
		return nil, err
	}
	var gaiaConfigurations []entity.GaiaConfiguration
	if err = results.All(context, &gaiaConfigurations); err != nil {
		return nil, err
	}

	return gaiaConfigurations, nil
}
