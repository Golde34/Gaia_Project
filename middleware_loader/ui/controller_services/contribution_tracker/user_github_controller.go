package controller_services

import (
	"encoding/json"
	"log"
	services "middleware_loader/core/services/contribution_tracker"
	"middleware_loader/ui/controller_services/controller_utils"
	"net/http"

	"github.com/go-chi/chi"
)

func GetUserGithubInfo(w http.ResponseWriter, r *http.Request, userGithubService *services.UserGithubService) {
	userId := chi.URLParam(r, "userId")
	userGithubInfo, err := userGithubService.GetUserGithubInfo(userId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(userGithubInfo); err != nil {
		log.Printf("Error encoding response: %v", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
}

func GithubAuthorize(w http.ResponseWriter, r *http.Request, userGithubService *services.UserGithubService) {
	var body map[string]interface{}
	body, err := controller_utils.MappingBody(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	code := body["code"].(string)
	state := body["state"].(string)

	userGithubInfo, err := userGithubService.GithubAuthorize(code, state)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(userGithubInfo); err != nil {
		log.Printf("Error encoding response: %v", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
}

func SynchronizeUserGithub(w http.ResponseWriter, r *http.Request, userGithubService *services.UserGithubService) {
	userId := chi.URLParam(r, "userId")
	userGithubInfo, err := userGithubService.SynchronizeUserGithub(userId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(userGithubInfo); err != nil {
		log.Printf("Error encoding response: %v", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
}
