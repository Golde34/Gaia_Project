package enums

import "errors"

var (
	ErrValidation = errors.New("validation error")
	ErrBadCredentials = errors.New("bad credentials")
	ErrNotFound = errors.New("not found")
)