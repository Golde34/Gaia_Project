package main

import (
	"log"
	"logging_tracker/cmd/route"
	"logging_tracker/kernel/configs"
	"net/http"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)



func main() {
	config := configs.Config{}
	cfg, _ := config.LoadEnv()

	r := chi.NewRouter()

	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.RequestID)
	r.Use(middleware.RedirectSlashes)
	r.Use(middleware.Timeout(time.Second * 60))

	route.Setup(r)

	log.Printf("Server started at port %s", cfg.Port)
	log.Fatal(http.ListenAndServe(":"+cfg.Port, r))
}