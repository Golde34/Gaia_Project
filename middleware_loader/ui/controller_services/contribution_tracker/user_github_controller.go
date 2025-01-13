package controller_services

import (
	"encoding/json"
	"log"
	services "middleware_loader/core/services/contribution_tracker"
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