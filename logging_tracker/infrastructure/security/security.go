package security

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha256"
	"crypto/x509"
	"encoding/base64"
	"log"
	"logging_tracker/kernel/configs"
)

func ReadKeyPair() (string, string, error) {
	var secConfig = configs.SecurityConfig{}
	var securityConfig, err = secConfig.LoadSecurityEnv()
	if err != nil {
		return "", "", err
	}

	var PUBLIC_KEY_STRING = securityConfig.PublicKey
	var PRIVATE_KEY_STRING = securityConfig.PrivateKey
	return PUBLIC_KEY_STRING, PRIVATE_KEY_STRING, nil
}

func Encrypt(plainText string) (string, error) {
	log.Println("Encrypting: ", plainText)
	publicKeyString, _, err := ReadKeyPair()
	if err != nil {
		return "", err
	}
	pubKeyBytes, err := base64.StdEncoding.DecodeString(publicKeyString)
	if err != nil {
		return "", err
	}

	pubKey, err := x509.ParsePKIXPublicKey(pubKeyBytes)
	if err != nil {
		return "", err
	}

	encryptedBytes, err := rsa.EncryptOAEP(
		sha256.New(),
		rand.Reader,
		pubKey.(*rsa.PublicKey),
		[]byte(plainText),
		nil,
	)
	if err != nil {
		return "", err
	}

	return base64.StdEncoding.EncodeToString(encryptedBytes), nil
}