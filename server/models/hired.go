package models

import (
	"time"
)

type Hired struct {
	ID        int       `json:"id"`
	CreatedAt time.Time `json:"-" gorm:"type: TIMESTAMP DEFAULT CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `json:"-" gorm:"type: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"`
	Title        string    `json:"title" gorm:"type: varchar(255)"`
	Description  string    `json:"description" gorm:"type: text"`
	StartProject time.Time `json:"startProject"`
	EndProject   time.Time `json:"endProject"`
	Price        int       `json:"price"`
	Status       string    `json:"status" gorm:"type: varchar(255)"`
	BuyerID      int       `json:"buyer_id"`
	Buyer        User      `json:"buyer"`
	SellerID     int       `json:"seller_id"`
	Seller       User      `json:"seller"`
}
