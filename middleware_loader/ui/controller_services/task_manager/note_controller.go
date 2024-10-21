package controller_services

import (
	"encoding/json"
	"io"
	base_dtos "middleware_loader/core/domain/dtos/base"
	mapper "middleware_loader/core/port/mapper/request"
	services "middleware_loader/core/services/task_manager"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/utils"
	"middleware_loader/ui/controller_services/controller_utils"
	"net/http"
	"os"
	"path/filepath"
	"strconv"

	"github.com/go-chi/chi"
)

func GetAllNotes(w http.ResponseWriter, r *http.Request, noteService *services.NoteService) {
	userId := chi.URLParam(r, "userId")
	input := mapper.GetId(userId)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{FunctionName: "getAllNotes", QueryInput: input, QueryOutput: model.Note{}})
	graphQuery := utils.GenerateGraphQLQueryWithMultipleFunction("query", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphQuery)
}

const uploadPath = "./resources"

func CreateNote(w http.ResponseWriter, r *http.Request, noteService *services.NoteService) {
	// Parse the multipart form, allowing a maximum upload size (e.g., 10 MB)
	err := r.ParseMultipartForm(10 << 20) // 10 MB limit
	if err != nil {
		http.Error(w, "Unable to parse form", http.StatusBadRequest)
		return
	}

	// Extract "name" from the form data
	name := r.FormValue("name")
	if name == "" {
		http.Error(w, "Name is required", http.StatusBadRequest)
		return
	}

	// Extract "userId" from the form data
	userIdStr := r.FormValue("userId")
	userId, err := strconv.Atoi(userIdStr)
	if err != nil {
		http.Error(w, "Invalid userId", http.StatusBadRequest)
		return
	}

	// Extract the file from the form data
	file, handler, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Error retrieving the file", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Create the uploads directory if it doesn't exist
	if _, err := os.Stat(uploadPath); os.IsNotExist(err) {
		err := os.MkdirAll(uploadPath, os.ModePerm)
		if err != nil {
			http.Error(w, "Failed to create upload directory", http.StatusInternalServerError)
			return
		}
	}

	// Save the uploaded file to the server
	filePath := filepath.Join(uploadPath, handler.Filename)
	dst, err := os.Create(filePath)
	if err != nil {
		http.Error(w, "Failed to save the file", http.StatusInternalServerError)
		return
	}
	defer dst.Close()

	// Copy the uploaded file data to the created file on the server
	if _, err := io.Copy(dst, file); err != nil {
		http.Error(w, "Failed to write the file", http.StatusInternalServerError)
		return
	}

	// Successfully processed the file and form data
	response := map[string]interface{}{
		"message": "Note created successfully",
		"note": map[string]interface{}{
			"name":   name,
			"userId": userId,
			"file":   filePath,
		},
	}

	// Respond with JSON
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)

	// graphqlQueryModel := []base_dtos.GraphQLQuery{}
	// graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{FunctionName: "createNote", QueryInput: input, QueryOutput: model.Note{}})
	// graphQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	// utils.ConnectToGraphQLServer(w, graphQuery)
}

func UpdateNote(w http.ResponseWriter, r *http.Request, noteService *services.NoteService) {
	var body map[string]interface{}
	body, err := controller_utils.MappingBody(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	noteId := chi.URLParam(r, "id")
	input := mapper.UpdateNoteRequestDTOMapper(body, noteId)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{FunctionName: "updateNote", QueryInput: input, QueryOutput: model.Note{}})
	graphQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphQuery)
}
