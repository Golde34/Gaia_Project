package base

import (
	"context"
	"strings"
	"time"
)

func ConvertStringToArray(input []string) []string {
	if len(input) == 0 {
		return nil
	}
	stringComponent := input[0]
	stringComponent = strings.Trim(stringComponent, "[]")
	listComponent := strings.Fields(stringComponent)
	return listComponent
}

func DeferTimeout() (context.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	return ctx
}