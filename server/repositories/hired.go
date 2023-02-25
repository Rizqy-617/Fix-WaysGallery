package repositories

import (
	"waysgallery/models"

	"gorm.io/gorm"
)

type HiredRepository interface {
	CreateHired(hired models.Hired) (models.Hired, error)
	GetHired(ID int) (models.Hired, error)
	UpdateHired(hired models.Hired) (models.Hired, error)
	FindOffer(ID int) ([]models.Hired, error)
	FindOrder(ID int) ([]models.Hired, error)
	FindOfferByLogin(ID int) (models.Hired, error)
	FindOrderByLogin(ID int) (models.Hired, error)
}

func RepositoryHired(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateHired(hired models.Hired) (models.Hired, error) {
	err := r.db.Create(&hired).Error

	return hired, err
}

func (r *repository) UpdateHired(hired models.Hired) (models.Hired, error) {
	err := r.db.Model(&hired).Updates(hired).Error

	return hired, err
}

func (r *repository) GetHired(ID int) (models.Hired, error) {
	var hired models.Hired
	err := r.db.Preload("Buyer").Preload("Seller").First(&hired, ID).Error

	return hired, err
}

func (r *repository) FindOffer(ID int) ([]models.Hired, error) {
	var hireds []models.Hired
	err := r.db.Preload("Buyer").Preload("Seller").Where("buyer_id=?", ID).Find(&hireds).Error

	return hireds, err
}

func (r *repository) FindOrder(ID int) ([]models.Hired, error) {
	var hireds []models.Hired
	err := r.db.Preload("Buyer").Preload("Seller").Where("seller_id=?", ID).Find(&hireds).Error

	return hireds, err
}

func (r *repository) FindOfferByLogin(ID int) (models.Hired, error) {
	var hireds models.Hired
	err := r.db.Preload("Buyer").Preload("Seller").Where("buyer_id=?", ID).First(&hireds).Error

	return hireds, err
}

func (r *repository) FindOrderByLogin(ID int) (models.Hired, error) {
	var hireds models.Hired
	err := r.db.Preload("Buyer").Preload("Seller").Where("seller_id=?", ID).First(&hireds).Error

	return hireds, err
}
