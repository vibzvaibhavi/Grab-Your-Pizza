import react from 'react'
import axios from 'axios';
import CheckLogin from './CheckLogin';
export default class Cartt extends react.Component {
    constructor(props) {
        super(props);

        this.state = {
            cart: []
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

    render() {
        if(this.state.cart !== null)
        return (
            <div className='cartt-main-container'>
                <h1 style={{textAlign:'center'}}>Hey Foodie, Order placed successfully!! </h1>  
                <CheckLogin />
            </div >

        );
        else{
            return (
                <div>
                    <h1>Nothing in Cart to CheckOut</h1>
                    <button class="btn btn-warning" style={{ marginleft: '450px' }} onClick={() => {
                            this.props.history.push('./OrderPizza')
                        }}>
                            Menu</button>
                </div>
            )
        }
    }
}