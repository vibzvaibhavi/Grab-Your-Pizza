package model

type CartCollection struct {
	Image    string `json:"Image,omitempty"`
	Name     string `json:"name,omitempty"`
	Price    int    `json:"price,omitempty"`
	Quantity int    `json:"quantity,omitempty"`
}