package mapper

import "strconv"

func ChooseTaskBatch(body map[string]interface{}) (float64, float64) {
	bodyMap := body["body"].(map[string]interface{})
	batchNumber := bodyMap["batchNumber"].(string)
	userId := bodyMap["userId"].(string)
	userFloat, err := strconv.ParseFloat(userId, 64)
	if err != nil {
		return 0, 0
	}
	batchFloat, err := strconv.ParseFloat(batchNumber, 64)
	if err != nil {
		return 0, 0
	}
	return userFloat, batchFloat 
}