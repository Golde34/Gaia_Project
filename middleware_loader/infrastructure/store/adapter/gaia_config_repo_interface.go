package store_adapter

import (
	"context"
	"middleware_loader/core/domain/entity"
)

type IGaiaConfigurationRepository interface {
	GetAllGaiaConfiguration(context context.Context, paramType string) ([]entity.GaiaConfiguration, error)
}