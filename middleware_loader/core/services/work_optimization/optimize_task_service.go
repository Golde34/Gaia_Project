package services

// import "middleware_loader/core/port/client"

type TaskOptimizationService struct{}

func NewTaskOptimizationService() *TaskOptimizationService {
	return &TaskOptimizationService{}
}

func (s *TaskOptimizationService) OptimizeTaskByUser(userId string) (string, error) {
	// response, err := client.ITaskOptimizationAdapter(&adapter.TaskOptimizationAdapter{}).OptimizeTaskByUser(input)
	// if err != nil {
	// 	return model.OptimizeTaskByUser{}, err
	// }
	// taskOptimizationModel := response_dtos.NewOptimizeTaskByUserResponseDTO().MapperToGraphQLModel(response)
	// return nil
	return "OK", nil
}