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

	"middleware_loader/core/domain/dtos/base"
)

func GenerateGraphQLQueryWithInput(action string, function string, input interface{}, output interface{}) string {
	// Convert input
	inputPairs := ConvertInput(input)

	//Convert output
	outputStr := ConvertOutput(output)

	// Generate query
	query := fmt.Sprintf(`%s { 
		%s(input: { %s}) {
			%s
		}
	}`, action, function, inputPairs, outputStr)

	return query
}

func GenerateGraphQLQueryNoInput(action string, function string, output interface{}) string {
	//Convert output
	outputStr := ConvertOutput(output)

	// Generate query
	query := fmt.Sprintf(`%s { 
		%s {
			%s
		}
	}`, action, function, outputStr)

	return query
}

func GenerateGraphQLQueryWithMultipleFunction(action string, graphQLQuery []base_dtos.GraphQLQuery) string {
	var functionScripts []string

	for i := 0; i < len(graphQLQuery); i++ {
		if i == 0 {
			inputPairs := ConvertInput(graphQLQuery[i].QueryInput)
			outputStr := ConvertOutput(graphQLQuery[i].QueryOutput)
			functionScripts = append(functionScripts, fmt.Sprintf(`
				%s {
					%s(input: { %s }) {
						%s
					}
				}
			`, action, graphQLQuery[i].Functionname, inputPairs, outputStr))
		} else {
			inputPairs := ConvertInput(graphQLQuery[i].QueryInput)
			outputStr := ConvertOutput(graphQLQuery[i].QueryOutput)
			functionScripts = append(functionScripts, fmt.Sprintf(`%s(input: { %s}) {
				%s
			}`, graphQLQuery[i].Functionname, inputPairs, outputStr))
		}
	}
	return strings.Join(functionScripts, "\n")
}

func GenerateGraphQLMultipleFunctionNoInput(action string, graphQLQuery []base_dtos.GraphQLQuery) string {
	var functionScripts []string

	for i := 0; i < len(graphQLQuery); i++ {
		if i == 0 {
			outputStr := ConvertOutput(graphQLQuery[i].QueryOutput)
			functionScripts = append(functionScripts, fmt.Sprintf(`
				%s {
					%s {
						%s
					}
				}
			`, action, graphQLQuery[i].Functionname, outputStr))
		} else {
			outputStr := ConvertOutput(graphQLQuery[i].QueryOutput)
			functionScripts = append(functionScripts, fmt.Sprintf(`%s {
				%s
			}`, graphQLQuery[i].Functionname, outputStr))
		}
	}
	return strings.Join(functionScripts, "\n")
}

func ConvertInput(input interface{}) string {
	if input == nil {
		return ""
	}

	inputMap := make(map[string]interface{})
	inrec, _ := json.Marshal(input)
	json.Unmarshal(inrec, &inputMap)

	return writeInputPairs(inputMap)
}

func writeInputPairs(inputMap map[string]interface{}) string {
	inputPairs := make([]string, 0, len(inputMap))
	for key, value := range inputMap {
		switch v := value.(type) {
		case string:
			inputPairs = append(inputPairs, fmt.Sprintf("%s: \"%s\"", key, v))
		case float64:
			inputPairs = append(inputPairs, fmt.Sprintf("%s: %f", key, v))
		case int:
			inputPairs = append(inputPairs, fmt.Sprintf("%s: %d", key, v))
		case bool:
			inputPairs = append(inputPairs, fmt.Sprintf("%s: %t", key, v))
		case []interface{}: // Only support array of strings
			strSlice := make([]string, len(v))
			for i, elem := range v {
				if str, ok := elem.(string); ok {
					strSlice[i] = fmt.Sprintf("\"%s\"", str)
				} else {
					strSlice[i] = fmt.Sprintf("%v", elem)
				}
			}
			inputPairs = append(inputPairs, fmt.Sprintf("%s: [%s]", key, strings.Join(strSlice, ", ")))
		default:
			inputPairs = append(inputPairs, fmt.Sprintf("%s: %v", key, v))
		}
	}
	return strings.Join(inputPairs, ", ")
}

func ConvertOutput(output interface{}) string {
	if output == nil {
		return ""
	}

	outputValue := reflect.ValueOf(output)
	outputKeys := make([]string, outputValue.NumField())
	for i := 0; i < outputValue.NumField(); i++ {
		field := outputValue.Type().Field(i)
		fieldValue := outputValue.Field(i)
		outputKeys[i] = convertSubFieldsOutput(field, fieldValue)
	}
	return strings.Join(outputKeys, ", ")
}

func convertSubFieldsOutput(field reflect.StructField, fieldValue reflect.Value) string {
	outputKey := ""
	switch fieldValue.Kind() {
	case reflect.Struct, reflect.Interface:
		subFields := ConvertOutput(fieldValue.Interface())
		fieldName := strings.Split(field.Tag.Get("json"), ",")[0]
		outputKey = fmt.Sprintf("%s { %s }", fieldName, subFields)
	case reflect.Slice:
		sliceOutput := make([]string, 0)
		sliceElementType := fieldValue.Type().Elem()
		if sliceElementType.Kind() == reflect.Ptr {
			sliceElementType = sliceElementType.Elem()
		}
		newElement := reflect.New(sliceElementType).Elem()
		if newElement.Kind() == reflect.Struct || newElement.Kind() == reflect.Interface {
			// Convert the struct fields to a string
			sliceOutput = append(sliceOutput, ConvertOutput(newElement.Interface()))
			fieldName := strings.Split(field.Tag.Get("json"), ",")[0]
			outputKey = fmt.Sprintf("%s { %s }", fieldName, strings.Join(sliceOutput, ", "))
		} else {
			outputKey = strings.Split(field.Tag.Get("json"), ",")[0]
		}
	default:
		outputKey = strings.Split(field.Tag.Get("json"), ",")[0]
	}
	return outputKey
}

func ConnectToGraphQLServer(w http.ResponseWriter, query string) {
	log.Println(query)
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
