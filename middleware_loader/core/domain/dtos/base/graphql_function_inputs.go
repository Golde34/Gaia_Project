package base_dtos 

type GraphQLQuery struct {
	Functionname string
	QueryInput   interface{}
	QueryOutput  interface{}
}
