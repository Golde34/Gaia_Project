package request_dtos

import (
// "middleware_loader/infrastructure/graph/model"

// "github.com/devfeel/mapper"
)

type TaskRegisterConfigRequestDTO struct {
	UserId         float64 `json:"userId"`
	SleepDuration  float64 `json:"sleepDuration"`
	StartSleepTime string  `json:"startSleepTime"`
	EndSleepTime   string  `json:"endSleepTime"`
	RelaxTime      float64 `json:"relaxTime"`
	TravelTime     float64 `json:"travelTime"`
	EatTime        float64 `json:"eatTime"`
	WorkTime       float64 `json:"workTime"`
}

func NewTaskRegister() *TaskRegisterConfigRequestDTO {
	return &TaskRegisterConfigRequestDTO{}
}

// func (in *TaskRegisterConfigRequestDTO) MapperToModel(input model.TaskRegisterConfigInput) {
// 	mapper.AutoMapper(&input, in)
// }
