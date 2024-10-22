package base_dtos

type GraphQLQuery struct {
	FunctionName string
	QueryInput   interface{}
	QueryOutput  interface{}
}
