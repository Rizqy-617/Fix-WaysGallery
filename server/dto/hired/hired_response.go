package hireddto

import "waysgallery/models"

type CreateHiredResponse struct {
	Title        string      `json:"title"`
	Description  string      `json:"description"`
	StartProject string      `json:"startProject"`
	EndProject   string      `json:"endProject"`
	Price        int         `json:"price"`
	BuyerID      models.User `json:"buyer_id"`
	SellerID     models.User `json:"seller_id"`
}

type HiredResponse struct {
	Hired interface{} `json:"hired"`
}
