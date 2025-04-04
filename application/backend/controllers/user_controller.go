package controllers

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"backend/config"
	"backend/model"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// Sample route for testing
func Sample(c *fiber.Ctx) error {

	fmt.Println("Inside User route")
	return c.JSON(&fiber.Map{"data": "Hello from Fiber & mongoDB"})
}

// Register a User
func RegisterUser(c *fiber.Ctx) error {

	fmt.Println("Inside User route")
	var userCollection *mongo.Collection = config.GetCollection(config.DB, "users")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var user model.User
	defer cancel()
	if err := c.BodyParser(&user); err != nil {
		return c.JSON(&fiber.Map{"data": "error body parsing"})
	}
	newUser := model.User{
		Mob:      user.Mob,
		Name:     user.Name,
		Email:    user.Email,
		Password: user.Password,
	}
	result, err := userCollection.InsertOne(ctx, newUser)
	if err != nil {
		return c.JSON(&fiber.Map{"data": "error"})
	}

	return c.JSON(&fiber.Map{"data": result})
}

// Get all the users
func GetAllUsers(c *fiber.Ctx) error {

	fmt.Println("Inside Get all user route")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var userCollection *mongo.Collection = config.GetCollection(config.DB, "users")

	var users []model.User
	defer cancel()

	results, err := userCollection.Find(ctx, bson.M{})

	if err != nil {
		return c.JSON(&fiber.Map{"data": "error in fetching data"})
	}

	//reading from the db in an optimal way
	defer results.Close(ctx)
	for results.Next(ctx) {
		var singleUser model.User
		if err = results.Decode(&singleUser); err != nil {
			return c.JSON(&fiber.Map{"data": "error in fetching data"})
		}

		users = append(users, singleUser)
	}

	return c.Status(http.StatusOK).JSON(users)
}

// Fetch pizza menu
func GetMenu(c *fiber.Ctx) error {

	fmt.Println("Inside Get menu route")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var userCollection *mongo.Collection = config.GetCollection(config.DB, "pizzadata")

	var menu []model.Cart
	defer cancel()

	results, err := userCollection.Find(ctx, bson.M{})

	if err != nil {
		return c.JSON(&fiber.Map{"data": "error in fetching data"})
	}

	//reading from the db in an optimal way
	defer results.Close(ctx)
	for results.Next(ctx) {
		var singlePizza model.Cart
		if err = results.Decode(&singlePizza); err != nil {
			return c.JSON(&fiber.Map{"data": "error in decoding feteched document"})
		}

		menu = append(menu, singlePizza)
	}

	return c.Status(http.StatusOK).JSON(menu)
}

// Insert into cart
func InsertCart(c *fiber.Ctx) error {
	fmt.Println("Inside Insert into cart route")
	var userCollection *mongo.Collection = config.GetCollection(config.DB, "cart")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var pizza model.CartCollection
	defer cancel()
	if err := c.BodyParser(&pizza); err != nil {
		return c.JSON(&fiber.Map{"data": "error body parsing"})

	}
	newPizza := model.CartCollection{
		Image:    pizza.Image,
		Name:     pizza.Name,
		Price:    pizza.Price,
		Quantity: pizza.Quantity,
	}
	result, err := userCollection.InsertOne(ctx, newPizza)
	if err != nil {
		return c.JSON(&fiber.Map{"data": "error in insertion to db"})
	}

	return c.JSON(result)
}

// Shopping cart button to right
func RetriveToCart(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var CartCollection *mongo.Collection = config.GetCollection(config.DB, "cart")

	var cart []model.CartCollection
	defer cancel()

	results, err := CartCollection.Find(ctx, bson.M{})

	if err != nil {
		return c.JSON(&fiber.Map{"data": "error in fetching data"})
	}

	//reading from the db in an optimal way
	defer results.Close(ctx)
	for results.Next(ctx) {
		var singleItem model.CartCollection
		if err = results.Decode(&singleItem); err != nil {
			return c.JSON(&fiber.Map{"data": "error in fetching data"})
		}

		cart = append(cart, singleItem)
	}

	return c.Status(http.StatusOK).JSON(cart)
}

// Login user
func Login(c *fiber.Ctx) error {
	fmt.Println("Inside login user route")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var userCollection *mongo.Collection = config.GetCollection(config.DB, "users")

	var users []model.User
	defer cancel()

	results, err := userCollection.Find(ctx, bson.M{})

	if err != nil {
		return c.JSON(&fiber.Map{"data": "error in fetching data"})
	}

	//reading from the db in an optimal way
	defer results.Close(ctx)
	for results.Next(ctx) {
		var singleUser model.User
		if err = results.Decode(&singleUser); err != nil {
			return c.JSON(&fiber.Map{"data": "error in fetching data"})
		}

		users = append(users, singleUser)
	}
	var loginuserdata model.User
	defer cancel()
	if err := c.BodyParser(&loginuserdata); err != nil {
		return c.JSON(&fiber.Map{"data": "error body parsing"})
	}
	fmt.Println(loginuserdata.Name)
	fmt.Println(loginuserdata.Password)
	// authenticate users here
	for i := 0; i < len(users); i++ {
		if users[i].Name == loginuserdata.Name && users[i].Password == loginuserdata.Password {
			return c.Status(http.StatusOK).JSON(&fiber.Map{"data": 1})
		}
	}

	return c.Status(http.StatusBadRequest).JSON(&fiber.Map{"data": 0})
}

// Logout user
func LogoutUser(c *fiber.Ctx) error {
	fmt.Println("Inside logout user route")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var CartCollection *mongo.Collection = config.GetCollection(config.DB, "cart")

	defer cancel()

	result, err := CartCollection.DeleteMany(ctx, bson.M{})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(&fiber.Map{"data": result})
	}

	return c.Status(http.StatusOK).JSON(&fiber.Map{"data": 1})
}

// Retrive all the ingredients
func GetIngredients(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var ingredients []model.Ingredients

	collection := config.GetCollection(config.DB, "ingredients")
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch ingredients"})
	}
	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var singleIngredient model.Ingredients
		if err := cursor.Decode(&singleIngredient); err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to decode ingredient"})
		}
		ingredients = append(ingredients, singleIngredient)
	}

	return c.Status(200).JSON(ingredients)
}

// Delete from cart
func DeleteFromCart(c *fiber.Ctx) error {
	fmt.Println("Inside delete from cart route")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var CartCollection *mongo.Collection = config.GetCollection(config.DB, "cart")
	var pizza model.Cart
	defer cancel()
	if err := c.BodyParser(&pizza); err != nil {
		return c.JSON(&fiber.Map{"data": "error body parsing"})

	}
	result, err := CartCollection.DeleteOne(ctx, bson.M{"name": pizza.Name})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(&fiber.Map{"data": result})
	}

	return c.Status(http.StatusOK).JSON(&fiber.Map{"data": 1})
}

// build api endpoint
func BuildPizza(c *fiber.Ctx) error {
	fmt.Println("Inside Build route")
	var BuilCollection *mongo.Collection = config.GetCollection(config.DB, "cart")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var pizza model.Build
	defer cancel()
	if err := c.BodyParser(&pizza); err != nil {
		return c.JSON(&fiber.Map{"data": "error body parsing"})

	}
	fmt.Println(pizza.Name)
	fmt.Println(pizza.Price)
	newPizza := model.Build{
		Image:    pizza.Image,
		Name:     pizza.Name,
		Price:    pizza.Price,
		Quantity: pizza.Quantity,
	}
	result, err := BuilCollection.InsertOne(ctx, newPizza)
	if err != nil {
		return c.JSON(&fiber.Map{"data": "error in insertion to db"})
	}

	return c.JSON(result)
}
