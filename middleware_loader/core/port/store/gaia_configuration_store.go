package store

import (
	"context"
	result_dto "middleware_loader/core/domain/dtos/result"
	"middleware_loader/core/domain/enums"
	store_adapter "middleware_loader/infrastructure/store/adapter"
	"middleware_loader/infrastructure/store/repository"
	database_mongo "middleware_loader/kernel/database/mongo"
)

type GaiaConfigurationStore struct {
	Database   database_mongo.Database
	Collection string
}

func NewGaiaConfigurationStore(db database_mongo.Database) GaiaConfigurationStore {
	return GaiaConfigurationStore{db, enums.GaiaConfiguration}
}

func (store *GaiaConfigurationStore) GetAllGaiaConfiguration(context context.Context, paramType string) ([]result_dto.GaiaConfigurationResultDTO, error) {
	collection := store.Database.Collection(store.Collection)
	db := store.Database

	gaiaConfigurations, err := store_adapter.IGaiaConfigurationRepository(
		&repository.GaiaConfigurationRepository{Database: db, Collection: collection},
	).GetAllGaiaConfiguration(context, paramType)
	if err != nil {
		return []result_dto.GaiaConfigurationResultDTO{}, err
	}

	var results []result_dto.GaiaConfigurationResultDTO
	for _, gaiaConfiguration := range gaiaConfigurations {
		var result result_dto.GaiaConfigurationResultDTO
		result.ID = gaiaConfiguration.ID
		result.ParamType = gaiaConfiguration.ParamType
		result.ParamName = gaiaConfiguration.ParamName
		result.ParamValue = gaiaConfiguration.ParamValue
		result.Description = gaiaConfiguration.Description
		result.Entity = gaiaConfiguration.Entity
		result.Status = gaiaConfiguration.Status
		results = append(results, result)
	}
	return results, nil
}

func (store *GaiaConfigurationStore) GetConfigAndReturnParamValue(context context.Context, paramType string) (map[string]interface{}, error) {
	collection := store.Database.Collection(store.Collection)
	db := store.Database

	gaiaConfigurations, err := store_adapter.IGaiaConfigurationRepository(
		&repository.GaiaConfigurationRepository{Database: db, Collection: collection},
	).GetAllGaiaConfiguration(context, paramType)
	if err != nil {
		return nil, err
	}

	var results = make(map[string]interface{})
	for _, gaiaConfiguration := range gaiaConfigurations {
		results[gaiaConfiguration.ParamName] = gaiaConfiguration.ParamValue
	}

	return results, nil
}