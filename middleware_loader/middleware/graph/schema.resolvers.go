package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.41

import (
	"context"
	"fmt"
	"middleware_loader/graph/model"
)

// UpsertCharacter is the resolver for the upsertCharacter field.
func (r *mutationResolver) UpsertCharacter(ctx context.Context, input model.CharacterInput) (*model.Character, error) {
	panic(fmt.Errorf("not implemented: UpsertCharacter - upsertCharacter"))
	//id := input.ID
	//var character model.Character
	//character.Name = input.Name
	//
	//n := len(r.Resolver.CharacterStore)
	//if n == 0 {
	//	r.Resolver.CharacterStore = make(map[string]model.Character)
	//}
	//
	//if id != nil {
	//	_, ok := r.Resolver.CharacterStore[*id]
	//	if !ok {
	//		return nil, fmt.Errorf("not found")
	//	}
	//	r.Resolver.CharacterStore[*id] = character
	//} else {
	//	// generate unique id
	//	nid := strconv.Itoa(n + 1)
	//	character.ID = nid
	//	r.Resolver.CharacterStore[nid] = character
	//}
	//
	//return &character, nil
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
