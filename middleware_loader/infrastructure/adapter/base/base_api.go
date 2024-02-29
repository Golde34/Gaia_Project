package base

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"middleware_loader/core/domain/models"
	"net/http"
)

func BaseAPI(url string, method string, input interface{}) (interface{}, error) {
	if input == nil {
		return baseAPINoInput(url, method)
	}
	return baseAPIWithInput(url, method, input)
}

func baseAPIWithInput(url string, method string, input interface{}) (interface{}, error) {
	jsonData, err := json.Marshal(input)
	if err != nil {
		return errorReturnBlock("marshal input", err)
	}

	req, err := http.NewRequest(method, url, bytes.NewBuffer(jsonData))
	req.Header.Set("Content-Type", "application/json")
	if err != nil {
		return errorReturnBlock("send request ", err)
	}

	return returnResponseData(req)
}

func baseAPINoInput(url string, method string) (interface{}, error) {
	req, err := http.NewRequest(method, url, nil)
	if err != nil {
		return errorReturnBlock("send request ", err)
	}

	return returnResponseData(req)
}

func returnResponseData(req *http.Request) (interface{}, error) {
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return errorReturnBlock("send request ", err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("read response body: %v", err)
	}

	// map body to Error Response
	var response models.ErrorResponse

	err = json.Unmarshal(body, &response)
	if err != nil {
		return nil, fmt.Errorf("unmarshal response: %v", err)
	}

	if response.ErrorCode != 200 {
		return response, fmt.Errorf(response.Data.(string))
	}
	return response.Data, nil
}

func errorReturnBlock(statusMessage string, err error) (interface{}, error) {
	if err != nil {	
		return models.ErrorResponse{
			Status:        "Error",
			StatusMessage: "Internal Server Error",
			ErrorCode:     500,
			ErrorMessage:  statusMessage,
		}, err
	}
	return models.ErrorResponse{
		Status:        "Success",
		StatusMessage: "Success",
		ErrorCode:     200,
		ErrorMessage:  statusMessage,
	}, nil
}

func ConvertResponseToMap(bodyResult interface{}) ([]byte, error) {
	bodyMap, ok := bodyResult.(map[string]interface{})
	if !ok {
		return nil, fmt.Errorf("convert response to map: %v", ok)
	}

	dataBytes, err := json.Marshal(bodyMap)
	if err != nil {
		return nil, fmt.Errorf("marshal response body: %v", err)
	}

	return dataBytes, nil
}

func ConvertResponseToMapArray(bodyResult interface{}, listObject []interface{}) ([]byte, error) {
	bodyMap, ok := bodyResult.([]interface{})
	if !ok {
		return nil, fmt.Errorf("convert response to map: %v", ok)
	}

	dataBytes, err := json.Marshal(bodyMap)
	if err != nil {
		return nil, fmt.Errorf("marshal response body: %v", err)
	}

	return dataBytes, nil
}