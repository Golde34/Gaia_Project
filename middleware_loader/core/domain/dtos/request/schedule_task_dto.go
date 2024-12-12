package request_dtos

type ChooseTaskBatchDTO struct {
	UserId float64 `json:"userId"`
	BatchNumber float64 `json:"batchNumber"`
}

func NewChooseTaskBatchDTO() *ChooseTaskBatchDTO {
	return &ChooseTaskBatchDTO{}
}

func (in *ChooseTaskBatchDTO) MapperToModel(userId, batchNumber float64) {
	in.UserId = userId
	in.BatchNumber = batchNumber
}
