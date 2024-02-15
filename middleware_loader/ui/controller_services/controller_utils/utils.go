package controller_utils

import (
	"encoding/json"
	"net/http"
)

func SetHeaders(w http.ResponseWriter) http.ResponseWriter {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	return w
}


func MappingBody(w http.ResponseWriter, r *http.Request) (map[string]interface{}, error) {
	var body map[string]interface{}
	if err:= json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return nil, err
	}

	return body, nil	
}