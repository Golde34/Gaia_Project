package result_dto

import (
	"middleware_loader/core/domain/entity"

	"github.com/devfeel/mapper"
)

type GaiaConfigurationResultDTO struct {
	ID          string `json:"_id"`
	ParamType   string `json:"paramType"`
	ParamName   string `json:"paramName"`
	ParamValue  string `json:"paramValue"`
	Description string `json:"description"`
	Entity      string `json:"entity"`
	Status      bool `json:"status"`
}

func NewGaiaConfigurationResultDTO() *GaiaConfigurationResultDTO {
	return &GaiaConfigurationResultDTO{}
}

func (in *GaiaConfigurationResultDTO) MapperToEntity(input GaiaConfigurationResultDTO) entity.GaiaConfiguration {
	var out entity.GaiaConfiguration
	mapper.AutoMapper(&input, &out)
	return out
}

