package base

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"middleware_loader/core/domain/enums"
	"net/http"
)

func BaseAPI(url string, method string, input interface{}) (interface{}, error) {
	jsonData, err := json.Marshal(input)

	req, err := http.NewRequest(method, url, bytes.NewBuffer(jsonData))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return ErrorReturnBlock("send request ",err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
        return nil, fmt.Errorf("read response body: %v", err)
    }

	// map body to Error Response
	var response enums.ErrorResponse

    err = json.Unmarshal(body, &response)
	if err != nil {
        return nil, fmt.Errorf("unmarshal response: %v", err)
    }

    if response.ErrorCode != 200 {
        return response, fmt.Errorf(response.Data.(string))
    } 
	return response.Data, nil
}

func ErrorReturnBlock(statusMessage string, err error) (interface{}, error) {
	if err != nil {
		log.Println(statusMessage, err)
		return enums.ErrorResponse{
			Status: "Error",
			StatusMessage:    "Internal Server Error",
			ErrorCode: 500,
			ErrorMessage: statusMessage,
		}, err
	}
	return enums.ErrorResponse{
		Status: "Success",
		StatusMessage:    "Success",
		ErrorCode: 200,
		ErrorMessage: statusMessage,
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