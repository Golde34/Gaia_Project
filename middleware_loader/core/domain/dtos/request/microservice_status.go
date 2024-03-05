package request_dtos

type MicroserviceConfigurationDTO struct {
	MicroserviceName string `json:"microserviceName"`
	Status           string `json:"status"`
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