package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/zach-short/final-web-programming/handlers"
	"github.com/zach-short/final-web-programming/middleware"
)

func SetupRoutes(r *gin.Engine) {
	auth := r.Group("/auth")
	{
		auth.POST("/login", handlers.Login)
		auth.POST("/register", handlers.Register)
		auth.POST("/social", handlers.SocialAuth)
		auth.POST("/check-email", handlers.CheckEmail)
	}

	api := r.Group("")
	api.Use(middleware.AuthMiddleware())
	{
		api.GET("/profile", func(c *gin.Context) {
			userID := c.GetString("userID")
			c.JSON(200, gin.H{"message": "Protected route", "userID": userID})
		})
	}
}
