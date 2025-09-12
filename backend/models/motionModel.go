package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Meeting struct {
	ID          primitive.ObjectID   `bson:"_id" json:"_id"`
	CommitteeID primitive.ObjectID   `bson:"committee_id" json:"committee_id"`
	Motions     []primitive.ObjectID `bson:"motions" json:"motions"`
	StartTime   time.Time            `bson:"start_time" json:"start_time"`
	EndTime     time.Time            `bson:"end_time" json:"end_time"`
}

type Motion struct {
	ID          primitive.ObjectID `bson:"_id" json:"id"`
	MoverID     primitive.ObjectID `bson:"mover_id" json:"mover_id"`
	Title       string             `bson:"title" json:"title"`
	Description string             `bson:"description" json:"description"`
	Votes       []Vote             `bson:"votes" json:"votes"`
	Comments    []Comment          `bson:"comments" json:"comments"`
	IsSpecial   bool               `bson:"is_special" json:"is_special"`
	IsPast      bool               `bson:"is_past" json:"is_past"`
	Summary     string             `bson:"summary,omitempty" json:"summary"`
}
