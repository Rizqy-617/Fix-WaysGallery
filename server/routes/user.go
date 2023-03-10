package routes

import (
	"waysgallery/handlers"
	"waysgallery/pkg/middleware"
	"waysgallery/pkg/mysql"
	"waysgallery/repositories"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Group) {
	userRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerUser(userRepository)

	e.GET("/user", middleware.Auth(h.GetUserDetailByLogin))
	e.GET("/user/:id", middleware.Auth(h.GetUserDetailById))
	e.GET("/profile", middleware.Auth(h.GetUser))
	e.PATCH("/update-profile", middleware.Auth(h.UpdateProfile))
}