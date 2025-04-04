package main

import (
	"backend/config"
	"backend/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	// initialize the app
	app := fiber.New()

	// Cross browser compatibility
	app.Use(cors.New())

	// Connect to a database
	config.Connect_to_Db()

	// Using the routes
	routes.UserRoute(app)

	// Listening on port number
	app.Listen(":5000")
}
