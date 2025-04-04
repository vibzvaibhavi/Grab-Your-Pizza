package model

type Build struct {
	Image    string `json:"image,omitempty"`
	Name     string `json:"name,omitempty"`
	Price    int    `json:"price,omitempty"`
	Quantity int    `json:"quantity,omitempty"`
}
