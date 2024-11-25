package response_dtos

type OptimizedTaskByUser struct {
	Id             string  `json:"id"`
	Title          string  `json:"title"`
	Priority       float64 `json:"priority"`
	Status         string  `json:"status"`
	StartDate      float64 `json:"startDate"`
	EndDate        float64 `json:"endDate"`
	ActiveStatus   string  `json:"activeStatus"`
	OriginalId     string  `json:"originalId"`
	ScheduleTaskId string  `json:"scheduleTaskId"`
	TaskOrder      float64 `json:"taskOrder"`
	Effort         float64 `json:"effort"`
	Enjoyability   float64 `json:"enjoyability"`
	Duration       float64 `json:"duration"`
	Weight         float64 `json:"weight"`
	StopTime       float64 `json:"stopTime"`
	TaskBatch      float64 `json:"taskBatch"`
}

func NewOptimizedTaskByUser() *OptimizedTaskByUser {
	return &OptimizedTaskByUser{}
}
