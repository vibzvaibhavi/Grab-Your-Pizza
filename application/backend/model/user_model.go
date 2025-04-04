package model

type User struct {
	Mob      string `json:"Mob,omitempty"`
	Name     string `json:"Name,omitempty" `
	Email    string `json:"Email,omitempty" `
	Password string `json:"Password,omitempty"`
}