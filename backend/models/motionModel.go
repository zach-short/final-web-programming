package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// May add Meeting so to keep track of motions

type Motion struct {
	ID           primitive.ObjectID             `bson:"_id" json:"id"`
	CommitteeID  primitive.ObjectID             `bson:"committee_id" json:"committee_id"`
	MoverID      primitive.ObjectID             `bson:"mover_id" json:"mover_id"`
	Title        string                         `bson:"title" json:"title"`
	Description  string                         `bson:"description" json:"description"`
	Votes        map[primitive.ObjectID]bool    `bson:"votes" json:"votes"`
	Comments     map[primitive.ObjectID]Comment `bson:"comments" json:"comments"`
	ParentMotion *primitive.ObjectID            `bson:"parent_motion,omitempty" json:"parent_motion"`
	Result       string                         `bson:"result" json:"result"`
	IsSpecial    bool                           `bson:"is_special" json:"is_special"`
	IsPast       bool                           `bson:"is_past" json:"is_past"`
	Summary      string                         `bson:"summary,omitempty" json:"summary"`
}

// May add Votes struct to separate concerns

type Comment struct {
	ID        primitive.ObjectID `bson:"_id" json:"_id"`
	MotionID  primitive.ObjectID `bson:"motion_id" json:"motion_id"`
	UserID    primitive.ObjectID `bson:"user_id" json:"user_id"`
	Content   string             `bson:"content" json:"content"`
	CreatedAt time.Time          `bson:"created_at" json:"created_at"`
}
