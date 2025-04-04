import React from 'react';
import axios from 'axios';

export default class OrderPizza extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pizz: [], // ✅ initialized as array
        };

        // ✅ API call to backend
        axios.get("http://127.0.0.1:5000/getmenu")
            .then((response) => {
                this.setState({
                    pizz: response.data // ✅ fixed typo here
                });
            })
            .catch((err) => {
                console.log("Error fetching menu:", err);
            });
    }

    render() {
        return (
            <div>
                <div className='row' style={{ margin: '30px', border: '1px solid yellow' }}>
                    {
                        Array.isArray(this.state.pizz) && this.state.pizz.map((pizza, index) => (
                            <div key={index} className="col-md-5" style={{ marginLeft: '70px', marginTop: '30px', border: '1px solid orange' }}>
                                <div className="container" style={{ alignItems: 'center', textAlign: "left" }}>
                                    <div className="content">
                                        <h6>{pizza.name}</h6>
                                        <div style={{ height: "15px", width: "15px", backgroundColor: (pizza.Type === "veg") ? "green" : "red" }}></div>
                                        <h6>${pizza.price}</h6>
                                    </div>

                                    <div className="details">
                                        <p>{pizza.Description}</p>
                                        <p><b>Ingredients:</b> {pizza.Ingredients}</p>
                                        <p><b>Toppings:</b> {pizza.Topping}</p>
                                    </div>

                                    <div className="order-image">
                                        <img
                                            src={pizza.Image}
                                            className="img-fluid"
                                            alt="pizzeria_image"
                                            style={{ height: "150px", width: '150px' }}
                                        />
                                        <div className="d-grid gap-2 d-md-flex ml-auto" style={{ margin: "10px" }}>
                                            <button
                                                type="button"
                                                className="btn btn-warning"
                                                onClick={() => {
                                                    axios.post("http://localhost:5000/addtocart", {
                                                        ...pizza,
                                                        Quantity: 1
                                                    })
                                                        .then((response) => {
                                                            console.log("Added to cart");
                                                        })
                                                        .catch((err) => {
                                                            console.log("Error adding to cart:", err);
                                                        });
                                                }}
                                            >
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}
