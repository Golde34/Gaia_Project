package kafka

import (
	"gaia_cron_jobs/domain"
	"time"
)

func CreateKafkaMessage(cronType, message string) *domain.KafkaMessage {
	return &domain.KafkaMessage{
		Cmd:         cronType,
		ErrorCode:   "00",
		ErrorMessage: "Success",
		DisplayTime: time.Now().String(),
		Data:        message,
	}
}