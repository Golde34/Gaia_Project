package request_dtos

type OptimizeTaskByUser struct {
	UserId        float64 `json:"userId"`
	OptimizedDate string  `json:"optimizedDate"`
}

func NewOptimizeTaskByUser() *OptimizeTaskByUser {
	return &OptimizeTaskByUser{}
}
