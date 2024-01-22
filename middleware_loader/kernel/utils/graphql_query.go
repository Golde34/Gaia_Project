package utils

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	// "middleware_loader/infrastructure/graph/model"
	"net/http"
	"reflect"
	"strings"
)

func GenerateGraphQLQueryWithInput(action string, function string, input interface{}, output interface{}) (string) {
	// Convert input
	inputMap := make(map[string]interface{})
	inrec, _ := json.Marshal(input)
	json.Unmarshal(inrec, &inputMap)
	
	inputPairs := make([]string, 0, len(inputMap))
	for key, value := range inputMap {
		inputPairs = append(inputPairs, fmt.Sprintf("%s: \"%s\"", key, value))
	}

	//Convert output
	outputValue := reflect.ValueOf(output)
	outputKeys := make([]string, outputValue.NumField())
	for i:=0; i<outputValue.NumField(); i++ {
		outputKeys[i] = outputValue.Type().Field(i).Tag.Get("json")
	}
	outputStr := strings.Join(outputKeys, ", ")

	// Generate query
	query := fmt.Sprintf(`%s { 
		%s(input: { %s}) {
			%s
		}
	}`, action, function, strings.Join(inputPairs, ", "), outputStr)
	
	return query
}

func GenerateGraphQLQueryNoInput(action string, function string, output interface{}) (string) {
	//Convert output
	outputValue := reflect.ValueOf(output)
	outputKeys := make([]string, outputValue.NumField())
	for i:=0; i<outputValue.NumField(); i++ {
		outputKeys[i] = outputValue.Type().Field(i).Tag.Get("json")
	}
	outputStr := strings.Join(outputKeys, ", ")

	// Generate query
	query := fmt.Sprintf(`%s { 
		%s {
			%s
		}
	}`, action, function, outputStr)
	
	return query
}

func ConnectToGraphQLServer(w http.ResponseWriter, query string) {
	// Wrap the query in a JSON object
	jsonQuery := map[string]string{
		"query": query,
	}

	// Encode the JSON object into a buffer
	var buf bytes.Buffer
	if err := json.NewEncoder(&buf).Encode(jsonQuery); err != nil {
		log.Printf("err: %v", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	//Send the query to the GraphQL server
	resp, err := http.Post("http://localhost:4000/query", "application/json", &buf)
	if err != nil {
		log.Printf("err: %v", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	defer resp.Body.Close()

	io.Copy(w, resp.Body)
}

// func main() {
// 	action := "mutation"
// 	function := "signin"
// 	input := model.SigninInput{
// 		Username: "admin",
// 		Password: "admin",
// 	}
// 	output := model.AuthTokenResponse{}

// 	query := GenerateGraphQLQueryWithInput(action, function, input, output)
// 	fmt.Println(query)
// }