package base

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
)

func BaseAPI(url string, method string, input interface{}) (interface{}, error) {
	jsonData, err := json.Marshal(input)
	if err != nil {
		return ErrorReturnBlock("marshal", err)
	}

	req, err := http.NewRequest(method, url, bytes.NewBuffer(jsonData))
	if err != nil {
		return ErrorReturnBlock("create new request", err)
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return ErrorReturnBlock("send request ",err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return ErrorReturnBlock("read response body", err)
	}

	return body, err
}

type ErrorResponse struct {
	StatusCode int
	Message    string
	Error error
	ErrorMessage string
}

func ErrorReturnBlock(statusMessage string, err error) (interface{}, error) {
	if err != nil {
		log.Println(statusMessage, err)
		return ErrorResponse{
			StatusCode: 500,
			Message:    "Internal Server Error",
			Error: err,
			ErrorMessage: statusMessage,
		}, err
	}
	return ErrorResponse{
		StatusCode: 200,
		Message:    "Success",
		Error: err,
		ErrorMessage: statusMessage,
	}, nil
}
