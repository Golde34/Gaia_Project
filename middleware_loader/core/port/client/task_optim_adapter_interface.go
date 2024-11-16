package client

type ITaskOptimizationAdapter interface {
	OptimizateTaskByUser(user string) (string, error)
}