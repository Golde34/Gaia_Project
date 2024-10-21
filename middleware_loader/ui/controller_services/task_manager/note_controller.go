package controller_services

import (
	base_dtos "middleware_loader/core/domain/dtos/base"
	mapper "middleware_loader/core/port/mapper/request"
	services "middleware_loader/core/services/task_manager"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/utils"
	"middleware_loader/ui/controller_services/controller_utils"
	"net/http"

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

func CreateNote(w http.ResponseWriter, r *http.Request, noteService *services.NoteService) {
	var body map[string]interface{}
	body, err := controller_utils.MappingBody(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	input, file, ok := mapper.CreateNoteRequestDTOMapper(body)
	if ok != nil {
		http.Error(w, "Invalid request body, cannot read file", http.StatusBadRequest)
		return
	}

	// Convert the base64 string back to binary data
	decodedFile, err := utils.DecodeBase64File(file)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Save the decoded content to a temporary file
	tempFile, err := utils.SaveToTempFile(decodedFile, input.Name+".txt")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer tempFile.Close()

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{FunctionName: "createNote", QueryInput: input, QueryOutput: model.Note{}})
	graphQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphQuery)
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
