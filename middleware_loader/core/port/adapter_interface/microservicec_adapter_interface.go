package adapter_interface

type IMicroserviceAdapter interface {
	GetMicroserviceByName(microserviceName string) (interface{}, error)
}