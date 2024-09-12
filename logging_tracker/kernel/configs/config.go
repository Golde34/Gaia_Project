package configs

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Url      string
	Port     string
	GaiaPort string
}

func (in *Config) LoadEnv() (Config, error) {
	err := godotenv.Load(".env")
	if err != nil {
		return Config{}, err
	}

	url := os.Getenv("URL")
	port := os.Getenv("PORT")
	gaiaPort := os.Getenv("GAIA_PORT")

	return Config{
		Url:      url,
		Port:     port,
		GaiaPort: gaiaPort,
	}, nil
}