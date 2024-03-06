package mapper

import request_dtos "middleware_loader/core/domain/dtos/request"

func UrlPermissionRequestDTOMapper(body map[string]interface{}) request_dtos.UrlPermissionDTO{
	var input request_dtos.UrlPermissionDTO
	input.Url = body["url"].(string)
	return input
}