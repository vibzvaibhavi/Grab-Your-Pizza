package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"

	"backend/config"
	"backend/model"
)

// Generic loader
func loadJSONFile[T any](filename string) ([]T, error) {
	data, err := ioutil.ReadFile(filename)
	if err != nil {
		return nil, err
	}
	var result []T
	err = json.Unmarshal(data, &result)
	if err != nil {
		return nil, err
	}
	return result, nil
}

// Insert into MongoDB
func insertMany[T any](collection *mongo.Collection, data []T) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var docs []interface{}
	for _, d := range data {
		docs = append(docs, d)
	}
	_, err := collection.InsertMany(ctx, docs)
	return err
}

// Seeding logic
func Seed() {
	client := config.Connect_to_Db()

	// Ingredients
	ingredients, err := loadJSONFile[model.Ingredients]("../../data/ingredientsdata.json")
	if err != nil {
		log.Fatal("Failed to read ingredients:", err)
	}
	err = insertMany(config.GetCollection(client, "ingredients"), ingredients)
	if err != nil {
		log.Fatal("Failed to insert ingredients:", err)
	}
	fmt.Println("✅ Ingredients inserted")

	// Pizzas
	pizzas, err := loadJSONFile[model.Build]("../../data/pizzadata.json")
	if err != nil {
		log.Fatal("Failed to read pizzas:", err)
	}
	err = insertMany(config.GetCollection(client, "pizzadata"), pizzas)
	if err != nil {
		log.Fatal("Failed to insert pizzas:", err)
	}
	fmt.Println("✅ Pizzas inserted")
}
