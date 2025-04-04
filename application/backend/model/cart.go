package model

type Cart struct {
	Image       string   `json:"Image,omitempty"`
	Name        string   `json:"name,omitempty"`
	Price       int      `json:"price,omitempty"`
	Ingredients []string `json:"ingredients,omitempty"`
	Topping     []string `json:"topping,omitempty"`
	Description string   `json:"description,omitempty"`
	Type        string   `json:"type,omitempty"`
}
