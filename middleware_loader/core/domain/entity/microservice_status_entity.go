package entity

import (
	"middleware_loader/core/domain/enums"
	"time"
)

const (
	CollectionMicroserviceStatus = enums.MicroserviceStatus
)

type MicroserviceStatus struct {
	ID               string    `json:"id" bson:"_id"`
	MicroserviceName string    `json:"microservice_name" bson:"microservice_name"`
	Status           string    `json:"status" bson:"status"`
	CreatedAt        time.Time `json:"created_at" bson:"created_at"`
	UpdatedAt        time.Time `json:"updated_at" bson:"updated_at"`
}

func NewMicroserviceStatus(id, microserviceName, status string, createdAt, updatedAt time.Time) *MicroserviceStatus {
	return &MicroserviceStatus{
		ID:               id,
		MicroserviceName: microserviceName,
		Status:           status,
		CreatedAt:        createdAt,
		UpdatedAt:        updatedAt,
	}
}

func (m *MicroserviceStatus) GetID() string {
	return m.ID
}

func (m *MicroserviceStatus) GetMicroserviceName() string {
	return m.MicroserviceName
}

func (m *MicroserviceStatus) GetStatus() string {
	return m.Status
}

func (m *MicroserviceStatus) GetCreatedAt() time.Time {
	return m.CreatedAt
}

func (m *MicroserviceStatus) GetUpdatedAt() time.Time {
	return m.UpdatedAt
}

func (m *MicroserviceStatus) SetID(id string) {
	m.ID = id
}

func (m *MicroserviceStatus) SetMicroserviceName(microserviceName string) {
	m.MicroserviceName = microserviceName
}

func (m *MicroserviceStatus) SetStatus(status string) {
	m.Status = status
}

func (m *MicroserviceStatus) SetCreatedAt(createdAt time.Time) {
	m.CreatedAt = createdAt
}

func (m *MicroserviceStatus) SetUpdatedAt(updatedAt time.Time) {
	m.UpdatedAt = updatedAt
}
