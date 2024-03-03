package entity

import "middleware_loader/core/domain/enums"

const (
	CollectionUrlPermissionConfiguration = enums.UrlPermissionConfiguration
)

type UrlPermissionConfiguration struct {
	ID        string `json:"id" bson:"_id"`
	Url       string `json:"url" bson:"url"`
	Privilege string `json:"privilege" bson:"privilege"`
	Status    string `json:"status" bson:"status"`
}

func NewUrlPermissionConfiguration(id, url, privilege, status string) *UrlPermissionConfiguration {
	return &UrlPermissionConfiguration{
		ID:        id,
		Url:       url,
		Privilege: privilege,
		Status:    status,
	}
}

func (m *UrlPermissionConfiguration) GetID() string {
	return m.ID
}

func (m *UrlPermissionConfiguration) SetID(id string) {
	m.ID = id
}

func (m *UrlPermissionConfiguration) GetUrl() string {
	return m.Url
}

func (m *UrlPermissionConfiguration) SetUrl(url string) {
	m.Url = url
}

func (m *UrlPermissionConfiguration) GetPrivilege() string {
	return m.Privilege
}

func (m *UrlPermissionConfiguration) SetPrivilege(privilege string) {
	m.Privilege = privilege
}

func (m *UrlPermissionConfiguration) GetStatus() string {
	return m.Status
}

func (m *UrlPermissionConfiguration) SetStatus(status string) {
	m.Status = status
}