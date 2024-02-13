package enums

type ErrorResponse struct {
	Status string
	StatusMessage    string
	ErrorCode int
	ErrorMessage string
	Data interface{}
}