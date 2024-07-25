package main

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha256"
	"crypto/x509"
	"encoding/base64"
	"fmt"
)

// Your base64 encoded public key
const PUBLIC_KEY_STRING = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCkFDBJGOSJg38OxsEbEV81DfQ5eySDQiggsMzIkKL7rxLJtvkSovJkJGaFPlqSU5s71r1+PoOY6KmwikCrnrB0LbdaDCtYwNuOp+AU/NfdUzpmfd9Iy3JC5KDJ8q/adlChM0tFwamepNzjrHb2oRnqRKABgSWDFKSl93bCCq0pPQIDAQAB"
const PRIVATE_KEY_STRING = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKQUMEkY5ImDfw7GwRsRXzUN9Dl7JINCKCCwzMiQovuvEsm2+RKi8mQkZoU+WpJTmzvWvX4+g5joqbCKQKuesHQtt1oMK1jA246n4BT8191TOmZ930jLckLkoMnyr9p2UKEzS0XBqZ6k3OOsdvahGepEoAGBJYMUpKX3dsIKrSk9AgMBAAECgYAHiOeFCGScCSm11LecCCzoqmDzeRbsTU/f3QMxTq1YzcT0Y9w8j0kQ3sp8vV8Dr8rqcUWlAckPSmo2MaVooL/x4JL3nA0I/DlbXlzscfoWzGMI6c1Bcb2mZngYXVqMmhxNdcreV+Y94LpFqXdH+H3vck8z+q3tNvgiLGNHsHl+zQJBALJGTZJC99gZosi6MVYqWiiA6lD6J7/Yvy2sJNilLeuozoLI7bgdx9d0rkWIFv9zcGuWvI6PgvFVxD+yTcd6HE8CQQDrnXWyP7vtgQeKZsV5hnOb0pCg4X/EpmU9fl/V1E+fReFcVKRVUrh/pc8VK0qJg0o0VmVdv2kQimN9fFbgUUKzAkBBrUTGrYVBR7CA4pdqdw/f/B5W1tHuC5vi55hrd+8C8p2h8QQi4FXPOl05oHlYgt7XxCCTJKvI3R//l2CwLHxhAkEAqerZeV4LSmH2LTKmkViMQUDeepeFTC1v76QWux+s+EEuICcOiFXqpmvOZwbcb0VWm13/JlenDn2u+E1WXdlcjwJAE0/Bf+5VOcJXYlyJg0SUt5qemArQjynOXQjMdrbO54avw+7792YGW0JG6plVfiZ2J3lQrDPsnAzpCrmLOKbHJA=="

func encrypt(plainText string) (string, error) {
	pubKeyBytes, err := base64.StdEncoding.DecodeString(PUBLIC_KEY_STRING)
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

func decrypt(encryptedText string) (string, error) {
	privKeyBytes, err := base64.StdEncoding.DecodeString(PRIVATE_KEY_STRING)
	if err != nil {
		return "", err
	}

	privKey, err := x509.ParsePKCS8PrivateKey(privKeyBytes)
	if err != nil {
		return "", err
	}

	decodedBytes, err := base64.StdEncoding.DecodeString(encryptedText)
	if err != nil {
		return "", err
	}
	
	decryptedBytes, err := rsa.DecryptOAEP(
		sha256.New(),
		rand.Reader,
		privKey.(*rsa.PrivateKey),
		decodedBytes,
		nil,
	)
	if err != nil {
		return "", err
	}

	return string(decryptedBytes), nil
}


func main() {
	plainText := "auth_service::Golde34::1"
	encryptedText, err := encrypt(plainText)
	if err != nil {
		fmt.Println("Error encrypting text:", err)
		return
	}
	fmt.Println("Encrypted Text:", encryptedText)

	decryptedText, err := decrypt(encryptedText)
	if err != nil {
		fmt.Println("Error decrypting text:", err)
		return
	}
	fmt.Println("Decrypted Text:", decryptedText)
}