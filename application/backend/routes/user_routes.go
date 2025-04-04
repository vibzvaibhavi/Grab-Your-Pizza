package routes

import (
	"backend/controllers"

	"github.com/gofiber/fiber/v2"
)

func UserRoute(app *fiber.App) {

	//All routes comes here

	// Sample testing route
	app.Get("/sample", controllers.Sample)

	// Register an User
	app.Post("/register", controllers.RegisterUser)

	// Fetches all users
	app.Get("/getall", controllers.GetAllUsers)

	// Fetch the pizza menu
	app.Get("/getmenu", controllers.GetMenu)

	// Route for add to cart button
	app.Post("/addtocart", controllers.InsertCart)

	// Fetch the cart data
	app.Get("/retrivetocart", controllers.RetriveToCart)

	// Login user
	app.Post("/login", controllers.Login)

	// Logout user
	app.Get("/logout", controllers.LogoutUser)

	// Get Ingredients
	app.Get("/getingredients", controllers.GetIngredients)

	// Delete from cart
	app.Post("/deletefromcart", controllers.DeleteFromCart)

	// Build
	app.Post("/build", controllers.BuildPizza)
}
