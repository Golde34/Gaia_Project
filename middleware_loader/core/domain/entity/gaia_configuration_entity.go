package entity

const (
	CollectionGaiaConfiguration = "gaia_configuration"
)

type GaiaConfiguration struct {
	ID          string `json:"id" bson:"_id"`
	ParamType   string `json:"paramType" bson:"paramtype"`
	ParamName   string `json:"paramName" bson:"paramname"`
	ParamValue  string `json:"paramValue" bson:"paramvalue"`
	Description string `json:"description" bson:"description"`
	Entity      string `json:"entity" bson:"entity"`
	Status      bool `json:"status" bson:"status"`
}

func NewGaiaConfiguration(id, paramType, paramName, paramValue, description, entity string, status bool) *GaiaConfiguration {
	return &GaiaConfiguration{
		ID:          id,
		ParamType:   paramType,
		ParamName:   paramName,
		ParamValue:  paramValue,
		Description: description,
		Entity:      entity,
		Status:      status,
	}
}

func (g *GaiaConfiguration) GetID() string {
	return g.ID
}

func (g *GaiaConfiguration) GetParamType() string {
	return g.ParamType
}

func (g *GaiaConfiguration) GetParamName() string {
	return g.ParamName
}

func (g *GaiaConfiguration) GetParamValue() string {
	return g.ParamValue
}

func (g *GaiaConfiguration) GetDescription() string {
	return g.Description
}

func (g *GaiaConfiguration) GetEntity() string {
	return g.Entity
}

func (g *GaiaConfiguration) GetStatus() bool {
	return g.Status
}

func (g *GaiaConfiguration) SetID(id string) {
	g.ID = id
}

func (g *GaiaConfiguration) SetParamType(paramType string) {
	g.ParamType = paramType
}

func (g *GaiaConfiguration) SetParamName(paramName string) {	
	g.ParamName = paramName
}

func (g *GaiaConfiguration) SetParamValue(paramValue string) {
	g.ParamValue = paramValue
}

func (g *GaiaConfiguration) SetDescription(description string) {
	g.Description = description
}

func (g *GaiaConfiguration) SetEntity(entity string) {
	g.Entity = entity
}

func (g *GaiaConfiguration) SetStatus(status bool) {
	g.Status = status 
}
