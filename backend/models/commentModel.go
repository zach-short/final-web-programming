package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Vote struct {
	ID        primitive.ObjectID `bson:"_id" json:"_id"`
	MotionID  primitive.ObjectID `bson:"motion_id" json:"motion_id"`
	UserID    primitive.ObjectID `bson:"user_id" json:"user_id"`
	Result    string             `bson:"result" json:"result"`
	CreatedAt time.Time          `bson:"created_at" json:"created_at"`
}

type Comment struct {
	ID        primitive.ObjectID `bson:"_id" json:"_id"`
	MotionID  primitive.ObjectID `bson:"motion_id" json:"motion_id"`
	UserID    primitive.ObjectID `bson:"user_id" json:"user_id"`
	Content   string             `bson:"content" json:"content"`
	CreatedAt time.Time          `bson:"created_at" json:"created_at"`
}
