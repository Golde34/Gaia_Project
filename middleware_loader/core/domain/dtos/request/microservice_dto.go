package request_dtos

import "time"

type MicroserviceConfigurationDTO struct {
	MicroserviceName string `json:"microserviceName"`
	Status           bool   `json:"status"`
}

func NewMicroserviceConfigurationDTO() *MicroserviceConfigurationDTO {
	return &MicroserviceConfigurationDTO{}
}

type GetMicroserviceConfigurationDTO struct {
	MicroserviceName string `json:"microserviceName"`
}

func NewGetMicroserviceConfigurationDTO() *GetMicroserviceConfigurationDTO {
	return &GetMicroserviceConfigurationDTO{}
}

type InsertMicroserviceConfigurationDTO struct {
	MicroserviceName string    `json:"microserviceName"`
	Status           bool      `json:"status"`
	Port             string    `json:"port"`
	CreatedAt        time.Time `json:"createdAt"`
}

func NewInsertMicroserviceConfigurationDTO() *InsertMicroserviceConfigurationDTO {
	return &InsertMicroserviceConfigurationDTO{}
}

type UpdateMicroserviceConfigurationDTO struct {
	MicroserviceName string    `json:"microserviceName"`
	Status           bool      `json:"status"`
	UpdatedAt        time.Time `json:"updatedAt"`
}

func NewUpdateMicroserviceConfigurationDTO() *UpdateMicroserviceConfigurationDTO {
	return &UpdateMicroserviceConfigurationDTO{}
}
