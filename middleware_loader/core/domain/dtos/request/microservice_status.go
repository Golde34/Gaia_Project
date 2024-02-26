package request_dtos

type MicroserviceStatusDTO struct {
	MicroserviceName string `json:"microserviceName"`
	Status           string `json:"status"`
}

func NewMicroserviceStatusDTO() *MicroserviceStatusDTO {
	return &MicroserviceStatusDTO{}
}