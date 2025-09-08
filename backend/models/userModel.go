package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Address struct {
	Street string `bson:"street" json:"street"`
	City   string `bson:"city" json:"city"`
	State  string `bson:"state" json:"state"`
	Zip    string `bson:"zip" json:"zip"`
}

type User struct {
	ID           primitive.ObjectID `bson:"_id" json:"id"`
	Email        string             `bson:"email" json:"email"`
	Name         string             `bson:"name,omitempty" json:"name,omitempty"`
	GivenName    string             `bson:"given_name,omitempty" json:"given_name,omitempty"`
	FamilyName   string             `bson:"family_name,omitempty" json:"family_name,omitempty"`
	PasswordHash string             `bson:"password_hash,omitempty" json:"password_hash,omitempty"`
	Bio          string             `bson:"bio,omitempty" json:"bio,omitempty"`
	Picture      string             `bson:"picture,omitempty" json:"picture,omitempty"`
	PhoneNumber  string             `bson:"phone_number,omitempty" json:"phone_number,omitempty"`
	Address      Address            `bson:"address" json:"address"`
}
