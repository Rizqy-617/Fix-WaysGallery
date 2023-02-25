package routes

import (
	"waysgallery/handlers"
	"waysgallery/pkg/middleware"
	"waysgallery/pkg/mysql"
	"waysgallery/repositories"

	"github.com/labstack/echo/v4"
)

func HiredRoutes(e *echo.Group) {
	hiredRepository := repositories.RepositoryHired(mysql.DB)
	h := handlers.HandlerHired(hiredRepository)

	e.POST("/hired", middleware.Auth(h.CreateHired))
	e.PATCH("/hired/:id", middleware.Auth(h.UpdateHired))
	// e.POST("/notification", h.Notification)
	e.GET("/offers", middleware.Auth(h.FindOffer) )
	e.GET("/orders", middleware.Auth(h.FindOrder) )
	e.GET("/order", middleware.Auth(h.FindOrderByLogin))
	e.GET("/offer", middleware.Auth(h.FindOfferByLogin))
}