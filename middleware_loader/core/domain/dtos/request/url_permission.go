package request_dtos

type UrlPermissionDTO struct {
	Url string `json:"url"`
}

func NewUrlPermissionDTO() *UrlPermissionDTO {
	return &UrlPermissionDTO{}
}