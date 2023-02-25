package models

import "time"

type Project struct {
	ID           int            `json:"id"`
	CreatedAt    time.Time      `json:"-" gorm:"type: TIMESTAMP DEFAULT CURRENT_TIMESTAMP"`
	UpdatedAt    time.Time      `json:"-" gorm:"type: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"`
	HiredId      int            `json:"-"`
	Hired        Hired          `json:"hired" gorm:"foreignKey:HiredId"`
	Description  string         `json:"description" gorm:"type: text"`
	ProjectImage []ProjectImage `json:"image" gorm:"foreignKey:ProjectID"`
}
