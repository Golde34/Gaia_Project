package configs

import (
	"os"

	"github.com/joho/godotenv"
)

type SecurityConfig struct {
	PublicKey  string
	PrivateKey string
}

func (in *SecurityConfig) LoadSecurityEnv() (SecurityConfig, error) {
	err := godotenv.Load(".env")
	if err != nil {
		return SecurityConfig{}, err
	}

	publicKey := os.Getenv("PUBLIC_KEY")
	privateKey := os.Getenv("PRIVATE_KEY")
	
	securityConfig := SecurityConfig{
		PublicKey:  publicKey,
		PrivateKey: privateKey,
	}
	return securityConfig, nil
}
