package client

type ITaskOptimizationAdapter interface {
	OptimizeTaskByUser(userId string) (string, error)
}