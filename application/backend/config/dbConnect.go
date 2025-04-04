package config

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Function to connect DB
func Connect_to_Db() *mongo.Client {
	client, connection_err := mongo.NewClient(options.Client().ApplyURI(GetDbURL()))
	if connection_err != nil {
		log.Fatal(connection_err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	connection_err = client.Connect(ctx)
	if connection_err != nil {
		log.Fatal(connection_err)
	}

	//ping the database
	connection_err = client.Ping(ctx, nil)
	if connection_err != nil {
		log.Fatal(connection_err)
	}

	fmt.Println("Connected to MongoDB")
	return client
}

// Client instance
var DB *mongo.Client = Connect_to_Db()

// getting database collections
func GetCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	collection := client.Database("pizzeria").Collection(collectionName)
	return collection
}
