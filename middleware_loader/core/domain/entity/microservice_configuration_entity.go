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
	MicroserviceName string    `json:"microservice_name" bson:"microservice_name"`
	Status           string    `json:"status" bson:"status"`
	CreatedAt        time.Time `json:"created_at" bson:"created_at"`
	UpdatedAt        time.Time `json:"updated_at" bson:"updated_at"`
}

func NewMicroserviceConfiguration(id, microserviceName, status string, createdAt, updatedAt time.Time) *MicroserviceConfiguration {
	return &MicroserviceConfiguration{
		ID:               id,
		MicroserviceName: microserviceName,
		Status:           status,
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

func (m *MicroserviceConfiguration) GetStatus() string {
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

func (m *MicroserviceConfiguration) SetStatus(status string) {
	m.Status = status
}

func (m *MicroserviceConfiguration) SetCreatedAt(createdAt time.Time) {
	m.CreatedAt = createdAt
}

func (m *MicroserviceConfiguration) SetUpdatedAt(updatedAt time.Time) {
	m.UpdatedAt = updatedAt
}
