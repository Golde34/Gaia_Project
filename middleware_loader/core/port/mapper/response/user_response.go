package mapper

import response_dtos "middleware_loader/core/domain/dtos/response"

func ReturnListAllUsersObjectMapper(body map[string]interface{}) *response_dtos.UserDTO {
	var input response_dtos.UserDTO
	input.ID = body["id"].(float64)
	input.Name = body["name"].(string)
	input.Username = body["username"].(string)
	input.Email = body["email"].(string)
	input.Password = checkNull(body["password"])
	input.LastLogin = checkNull(body["lastLogin"])
	input.Enabled = body["enabled"].(bool)
	input.IsUsing2fa = checkBool(body["isUsing2FA"])
	input.Secret = checkNull(body["secret"])
	input.Roles = body["roles"].([]interface{})	
	return &input
}

func checkNull(value interface{}) string {
	if value == nil {
		return ""
	}
	return value.(string)
}

func checkBool(value interface{}) bool {
	if value == nil {
		return false
	}
	return value.(bool)
}