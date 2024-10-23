package configs

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Url                     string
	Port                    string
	GaiaPort                string
	AuthServicePort         string
	TaskManagerPort         string
	ClientCORSAllowedUrl    string
	WorkOptimServicePort    string
	SchedulePlanServicePort string
	FileDisplayWord         string 
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
	workOptimServicePort := os.Getenv("WORK_OPTIM_SERVICE_PORT")
	schedulePlanServicePort := os.Getenv("SCHEDULE_PLAN_SERVICE_PORT")
	fileDisplayWord := os.GetEnv("FILE_DISPLAY_WORD")

	config := Config{
		Url:                  url,
		Port:                 port,
		GaiaPort:             gaiaPort,
		AuthServicePort:      authServicePort,
		TaskManagerPort:      taskManagerPort,
		ClientCORSAllowedUrl: clientCORSAllowedUrl,
		WorkOptimServicePort: workOptimServicePort,
		SchedulePlanServicePort: schedulePlanServicePort,
		FileDisplayWord: fileDisplayWord
	}
	return config, nil
}
