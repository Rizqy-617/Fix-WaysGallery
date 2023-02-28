package models

import "time"

type Post struct {
	ID          int         `json:"id"`
	CreatedAt   time.Time   `json:"-" gorm:"type: TIMESTAMP DEFAULT CURRENT_TIMESTAMP"`
	UpdatedAt   time.Time   `json:"-" gorm:"type: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"`
	Title       string      `json:"title" gorm:"type:varchar(255)"`
	Description string      `json:"description" gorm:"type:text"`
	CreatedBy   int         `json:"created_by"`
	User        User        `json:"user" gorm:"foreignKey:CreatedBy"`
	PostImage   []PostImage `json:"post_image" gorm:"foreignKey:PostID"`
}

type PostResponse struct {
	ID          int         `json:"id"`
	CreatedAt   time.Time   `json:"-" gorm:"type: TIMESTAMP DEFAULT CURRENT_TIMESTAMP"`
	UpdatedAt   time.Time   `json:"-" gorm:"type: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"`
	Title       string      `json:"title" gorm:"type:varchar(255)"`
	Description string      `json:"description" gorm:"type:varchar(255)"`
	CreatedBy   int         `json:"created_by"`
	User        User        `json:"user" gorm:"foreignKey:CreatedBy"`
	PostImage   []PostImage `json:"post_image"`
}

func (PostResponse) Tablename() string {
	return "post"
}
