package base

import "middleware_loader/core/domain/models"

func ReturnErrorResponse(statusCode int, message string) models.ErrorResponse {
	switch status := statusCode; status {
	case 400:
		return models.ErrorResponse{
			Status:        "error",
			StatusMessage: "Bad Request",
			ErrorCode:     400,
			ErrorMessage:  message,
		}
	case 401:
		return models.ErrorResponse{
			Status:        "error",
			StatusMessage: "Unauthorized",
			ErrorCode:     401,
			ErrorMessage:  message,
		}
	case 403:
		return models.ErrorResponse{
			Status:        "error",
			StatusMessage: "Forbidden",
			ErrorCode:     403,
			ErrorMessage:  message,
		}
	case 404:
		return models.ErrorResponse{
			Status:        "error",
			StatusMessage: "Not Found",
			ErrorCode:     404,
			ErrorMessage:  message,
		}
	case 500:
		return models.ErrorResponse{
			Status:        "error",
			StatusMessage: "Internal Server Error",
			ErrorCode:     500,
			ErrorMessage:  message,
		}	
	default:
		return models.ErrorResponse{
			Status:        "error",
			StatusMessage: "Bad Request",
			ErrorCode:     400,
			ErrorMessage:  "",
		}
	}
}

func ReturnSuccessResponse(errorMessage string, data interface{}) models.ErrorResponse {
	return models.ErrorResponse{
		Status: "success",
		StatusMessage: "OK",
		ErrorCode: 200,
		ErrorMessage: errorMessage,
		Data: data,
	}
}
