import React from 'react';
import axios from 'axios';
import Cart from './Cart';

class BuildUrPizza extends React.Component {
    constructor() {
        super();
        this.state = {
            ingredients: [],
            total: 0,
            checkingredients: [],
        };
    }

    changeCheckingredients(ingredients) {
        this.setState({ checkingredients: ingredients });
    }

    changeTotal(price) {
        this.setState({ total: price });
    }

    onHandle = (pos) => {
        const selectedIngredient = this.state.ingredients[pos];
        const obj = {
            Name: selectedIngredient.tname,
            Price: selectedIngredient.price,
            Quantity: 1,
            Image: selectedIngredient.Image
        };

        const updated = this.state.checkingredients.map((item, index) =>
            index === pos ? !item : item
        );

        this.changeCheckingredients(updated);

        const totalPrice = updated.reduce((sum, checked, index) =>
            checked ? sum + this.state.ingredients[index].price : sum, 0);

        this.changeTotal(totalPrice);

        axios.post("http://localhost:5000/build", obj)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    componentDidMount() {
        axios.get('http://localhost:5000/getingredients')
            .then((res) => {
                console.log("✅ Ingredients fetched from backend:", res.data); // ← THIS LINE
                const temp = res.data.map(() => false);
                this.setState({
                    ingredients: res.data,
                    checkingredients: temp
                });
            })
            .catch((err) => {
                console.error("❌ Error fetching ingredients:", err);
            });
    }
    

    render() {
        const { ingredients, checkingredients } = this.state;

        const rows = ingredients.map((d, index) => (
            <tr key={index}>
                <td><img src={d.Image} alt="ingredient" style={{ height: '30px', width: '30px' }} /></td>
                <td>{d.tname} &nbsp; ${d.price}.00</td>
                <td>
                    <input
                        type='checkbox'
                        checked={checkingredients[index] || false}
                        onChange={() => this.onHandle(index)}
                    />
                    &nbsp; Add
                </td>
            </tr>
        ));

        return (
            <div style={{ margin: '100px', textAlign: "center", color: 'white' }}>
                <br />
                <p style={{ fontSize: '18px' }}>
                    🍕 Pizzeria now gives you options to build your own pizza.<br />
                    Customize your pizza by choosing ingredients from the list below.
                </p>

                <div className='row' style={{ justifyContent: 'center' }}>
                    <table className="table table-bordered" style={{ width: '80%', color: 'white' }}>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Ingredient</th>
                                <th>Choose</th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </table>

                    <h5 style={{ textAlign: 'left', width: '100%' }}>
                        🛒 Total Cart: ${this.state.total}
                    </h5>

                    <div>
                        <br />
                        <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => this.props.history.push("/Cart")}
                        >
                            Proceed to Cart
                        </button>
                    </div>
                </div>

                <div style={{ display: 'none' }}>
                    <Cart total={this.state.total} />
                </div>
            </div>
        );
    }
}

export default BuildUrPizza;
