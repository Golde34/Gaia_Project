package result_dto

import (
	"middleware_loader/core/domain/entity"

	"github.com/devfeel/mapper"
)

type MicroserviceResultDTO struct {
	ID               string `json:"id"`
	MicroserviceName string `json:"microserviceName"`
	Status           bool   `json:"status"`
	Port             string `json:"port"`
}

func NewMicroserviceResultDTO() *MicroserviceResultDTO {
	return &MicroserviceResultDTO{}
}

func (in *MicroserviceResultDTO) MapperToEntity(input MicroserviceResultDTO) entity.MicroserviceConfiguration {
	var out entity.MicroserviceConfiguration
	mapper.AutoMapper(&input, &out)
	return out
}
