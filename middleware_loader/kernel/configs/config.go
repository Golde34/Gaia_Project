package configs

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Url                  string
	Port                 string
	GaiaPort             string
	AuthServicePort      string
	TaskManagerPort      string
	ClientCORSAllowedUrl string
}

func (in *Config) LoadEnv() (Config, error) {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Error loading .env file: ", err)
	}

	url := os.Getenv("URL")
	port := os.Getenv("PORT")
	gaiaPort := os.Getenv("GAIA_PORT")
	authServicePort := os.Getenv("AUTH_SERVICE_PORT")
	taskManagerPort := os.Getenv("TASK_MANAGER_PORT")
	clientCORSAllowedUrl := os.Getenv("CLIENT_CORS_ALLOWED_URL")

	config := Config{
		Url:                  url,
		Port:                 port,
		GaiaPort:             gaiaPort,
		AuthServicePort:      authServicePort,
		TaskManagerPort:      taskManagerPort,
		ClientCORSAllowedUrl: clientCORSAllowedUrl,
	}
	return config, nil
}
