package models

type GraphQLQuery struct {
	Functionname string
	QueryInput interface{}
	QueryOutput interface{}
}