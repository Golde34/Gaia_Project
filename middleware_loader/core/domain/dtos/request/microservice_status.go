package request_dtos

type MicroserviceConfigurationDTO struct {
	MicroserviceName string `json:"microserviceName"`
	Status           string `json:"status"`
}

func NewMicroserviceConfigurationDTO() *MicroserviceConfigurationDTO {
	return &MicroserviceConfigurationDTO{}
}