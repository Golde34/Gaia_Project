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
)

type AuthService struct {
	SigninInput model.SigninInput
}

func NewAuthService() *AuthService {
	return &AuthService{}
}

var authValidator = validator.NewAuthDTOValidator()

func (s *AuthService) Signin(ctx context.Context, input model.SigninInput) (model.AuthTokenResponse, error) {
	err := authValidator.AuthValidate(input)
	ErrorReturnBlock("validation step", err)
	log.Println("Validation passed!")

	// Connect to authen service port 4001 to get token
	// Define the URL and port of the authentication service
	authServiceURL := "http://localhost:4001/auth/sign-in"

	// Marshal the input into JSON
	jsonData, err := json.Marshal(input)
	ErrorReturnBlock("marshal", err)

	// Create a new request
	req, err := http.NewRequest("POST", authServiceURL, bytes.NewBuffer(jsonData))
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

	// Unmarshal the response body into an AuthToken
	var authToken model.AuthTokenResponse
	log.Println("body: ", string(body))
	log.Printf("authToken: %+v\n", authToken)
	err = json.Unmarshal(body, &authToken)
	ErrorReturnBlock("unmarshal", err)

	// Return the AuthToken
	return authToken, nil
}


func ErrorReturnBlock(statusMessage string, err error) (model.AuthTokenResponse, error) {
	if err != nil {
		log.Println(statusMessage, err)
		return model.AuthTokenResponse{}, err
	}
	return model.AuthTokenResponse{}, nil
} 