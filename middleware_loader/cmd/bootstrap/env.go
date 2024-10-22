package bootstrap

import (
	"fmt"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type Env struct {
	AppEnv         string `mapstructure:"APP_ENV"`
	ServerAddress  string `mapstructure:"SERVER_ADDRESS"`
	ContextTimeout int    `mapstructure:"CONTEXT_TIMEOUT"`
	DBHost         string `mapstructure:"DB_HOST"`
	DBPort         string `mapstructure:"DB_PORT"`
	DBUser         string `mapstructure:"DB_USER"`
	DBPass         string `mapstructure:"DB_PASSWORD"`
	DBName         string `mapstructure:"DB_NAME"`
}

func NewEnv() *Env {
	env := godotenv.Load(".env")
	if env != nil {
		fmt.Println("Error loading .env file: ", env)
	}

	appEnv := os.Getenv("APP_ENV")
	serverAddress := os.Getenv("SERVER_ADDRESS")
	contextTimeoutStr := os.Getenv("CONTEXT_TIMEOUT")
	contextTimeout, _ := strconv.Atoi(contextTimeoutStr)
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	return &Env{
		AppEnv:         appEnv,
		ServerAddress:  serverAddress,
		ContextTimeout: contextTimeout,
		DBHost:         dbHost,
		DBPort:         dbPort,
		DBUser:         dbUser,
		DBPass:         dbPass,
		DBName:         dbName,
	}
}
