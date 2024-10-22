package entity

import (
	"middleware_loader/core/domain/enums"
	"time"
)

const (
	CollectionMicroserviceConfiguration = enums.MicroserviceConfiguration
)

type MicroserviceConfiguration struct {
	ID               string    `json:"id" bson:"_id"`
	MicroserviceName string    `json:"microserviceName" bson:"microservicename"`
	Status           bool      `json:"status" bson:"status"`
	Port             string    `json:"port" bson:"port"`
	CreatedAt        time.Time `json:"createdAt" bson:"createdat"`
	UpdatedAt        time.Time `json:"updatedAt" bson:"updatedat"`
}

func NewMicroserviceConfiguration(id, microserviceName string, status bool, port string, createdAt, updatedAt time.Time) *MicroserviceConfiguration {
	return &MicroserviceConfiguration{
		ID:               id,
		MicroserviceName: microserviceName,
		Status:           status,
		Port:             port,
		CreatedAt:        createdAt,
		UpdatedAt:        updatedAt,
	}
}

func (m *MicroserviceConfiguration) GetID() string {
	return m.ID
}

func (m *MicroserviceConfiguration) GetMicroserviceName() string {
	return m.MicroserviceName
}

func (m *MicroserviceConfiguration) GetStatus() bool {
	return m.Status
}

func (m *MicroserviceConfiguration) GetCreatedAt() time.Time {
	return m.CreatedAt
}

func (m *MicroserviceConfiguration) GetUpdatedAt() time.Time {
	return m.UpdatedAt
}

func (m *MicroserviceConfiguration) SetID(id string) {
	m.ID = id
}

func (m *MicroserviceConfiguration) SetMicroserviceName(microserviceName string) {
	m.MicroserviceName = microserviceName
}

func (m *MicroserviceConfiguration) SetStatus(status bool) {
	m.Status = status
}

func (m *MicroserviceConfiguration) SetCreatedAt(createdAt time.Time) {
	m.CreatedAt = createdAt
}

func (m *MicroserviceConfiguration) SetUpdatedAt(updatedAt time.Time) {
	m.UpdatedAt = updatedAt
}

func (m *MicroserviceConfiguration) SetPort(port string) {
	m.Port = port
}

func (m *MicroserviceConfiguration) GetPort() string {
	return m.Port
}