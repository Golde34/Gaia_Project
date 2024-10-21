package utils

import (
	"encoding/base64"
	"io/ioutil"
	"os"
)

func DecodeBase64File(encodedContent string) ([]byte, error) {
	data, err := base64.StdEncoding.DecodeString(encodedContent)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func SaveToTempFile(content []byte, fileName string) (*os.File, error) {
	tempFile, err := ioutil.TempFile(os.TempDir(), fileName)
	if err != nil {
		return nil, err
	}
	_, err = tempFile.Write(content)
	if err != nil {
		return nil, err
	}
	return tempFile, nil
}
