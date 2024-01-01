package services

import (
	"bytes"
	"context"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"middleware_loader/core/validator"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/configs"
)

type AuthService struct {
	SigninInput model.SigninInput
}

func NewAuthService() *AuthService {
	return &AuthService{}
}

var authValidator = validator.NewAuthDTOValidator()
var env, _ = configs.LoadEnv()

func (s *AuthService) Signin(ctx context.Context, input model.SigninInput) (model.AuthTokenResponse, error) {
	err := authValidator.AuthValidate(input)
	ErrorReturnBlock("validation step", err)
	log.Println("Validation passed!")

	authServiceURL := env.Url + env.AuthServicePort + "/auth/sign-in"

	body, err := HandleAPIRequest(authServiceURL, input)	

	// Unmarshal the response body into an AuthToken
	var authToken model.AuthTokenResponse
	err = json.Unmarshal(body, &authToken)
	ErrorReturnBlock("unmarshal", err)

	// Return the AuthToken
	return authToken, nil
}

func HandleAPIRequest(url string, input interface{}) ([]byte, error){
	
	// Marshal the input into JSON
	jsonData, err := json.Marshal(input)
	ErrorReturnBlock("marshal", err)

	// Create a new request
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	ErrorReturnBlock("create new request", err)

	// Set the content type to JSON
	req.Header.Set("Content-Type", "application/json")

	// Send the request
	client := &http.Client{}
	resp, err := client.Do(req)
	ErrorReturnBlock("send request ",err)
	defer resp.Body.Close()

	// Read the response body
	body, err := ioutil.ReadAll(resp.Body)
	ErrorReturnBlock("read response body", err)

	return body, nil
}

func ErrorReturnBlock(statusMessage string, err error) (model.AuthTokenResponse, error) {
	if err != nil {
		log.Println(statusMessage, err)
		return model.AuthTokenResponse{}, err
	}
	return model.AuthTokenResponse{}, nil
} 