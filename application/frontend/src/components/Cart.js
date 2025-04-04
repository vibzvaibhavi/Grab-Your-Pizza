import react from 'react'
import axios from 'axios';

export default class Cart extends react.Component {
    constructor(props) {
        super(props);

        this.state = {
            cart: [],
            sum: 0,
            min: 0,
            itemsList: ''
        };
    }

    componentDidMount() {
        axios.get("http://localhost:5000/retrivetocart")
            .then((responce) => {
                console.log(responce);
                this.setState({
                    cart: responce.data,
                })
            })
            .catch((err) => {
                console.log(err)
            })
    };
    totalPrice = () => {


        if (this.state.cart) {
            let temp = 0;
            for (var i = 0; i < this.state.cart.length; i++) {
                temp += this.state.cart[i].price
            }
            return temp
        }
        else
            return 0;
    }


    render() {
        var op;
        if (this.state.cart !== null) {
            op = this.state.cart.map((pizza, index) => {
                return (
                    <tr>
                        <td><img src={pizza.Image} style={{ height: '30px', width: '30px' }} /></td>
                        <td>{pizza.name}</td>
                        <td>

                            &nbsp;&nbsp;
                            {pizza.quantity}
                            &nbsp;&nbsp;
                        </td>
                        <td>
                            {this.state.total = pizza.quantity * pizza.price}
                        </td>
                        <td>
                            <button class="btn btn-warning" onClick={() => {
                                axios.post("http://localhost:5000/deletefromcart", pizza)
                                    .then((responce) => { })
                                    .catch((err) => {
                                        console.log(err)
                                    });
                            }
                            }> Delete Item
                            </button>
                        </td>

                    </tr>
                )
            })
        }
        else {
            op = <div><h1>Nothing in the Cart!</h1></div>
        }
        return (

            <div style={{ margin: '70px', textAlign: "center", border: '1px solid yellow' }}>
                <br />
                <h1>Pizzeria Cart</h1>

                <div className='row' style={{ margin: '50px' }} >
                    <table class="table table-bordered">

                        <thead>
                            <th>image</th>
                            <th>name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th />

                        </thead>
                        <tbody>
                            {op}
                        </tbody>

                    </table>
                    <div className='Bill' style={{ textAlign: 'left' }}>
                        <h2>Bill:</h2>
                        <hr />
                        <h6>Order Pizza :${this.totalPrice()}</h6>
                        <h6>Total Cart :${this.totalPrice()}</h6>
                    </div>

                    <div >
                        <br />
                        <button class="btn btn-warning" style={{ marginleft: '450px' }} onClick={() => {
                            this.props.history.push('./Cartt')
                        }}>
                            Check Out</button> &nbsp;
                        <button class="btn btn-warning" style={{ marginleft: '450px' }} onClick={() => {
                            this.props.history.push('./OrderPizza')
                        }}>
                            Menu</button>
                    </div> &nbsp;

                </div>
            </div >
        );

    }
}
