package entity

import "middleware_loader/core/domain/enums"

const (
	UrlPermissionConfiguration = enums.UrlPermissionConfiguration
)

type UrlPermissionConfiguration struct {
	ID  string `json:id bson:"_id"`
	Url string `json:url bson:"url"`
	Privilege string `json:privilege bson:"privilege"`
	Role string `json:role bson:"role"`
}
