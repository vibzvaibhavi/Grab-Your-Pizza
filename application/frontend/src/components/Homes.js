import React from 'react';
import IngredientsLogo from '../images/IngredientsLogo.jpg';
import ChefLogo from '../images/ChefLogo.jpg';
import TimeLogo from '../images/TimeLogo.jpg';
import axios from 'axios';

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const btn = localStorage.getItem("loggedIn") === "1" ? (
            <button
                style={{ float: 'right' }}
                type="button"
                className="btn btn-outline-light"
                title="Logout"
                onClick={() => {
                    axios.get("http://localhost:5000/logout")
                        .then(() => this.props.history.push("/Homes"))
                        .catch((err) => console.log(err));
                    localStorage.clear();
                }}
            >
                Logout
            </button>
        ) : (
            <button
                style={{ float: 'right' }}
                type="button"
                className="btn btn-outline-light"
                title="Login"
                onClick={() => this.props.history.push("./Login")}
            >
                Login
            </button>
        );

        return (
            <div style={{ backgroundColor: '#121212', minHeight: '100vh', color: 'white', padding: '30px' }}>
                {btn}
                <br />
                <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '40px', color: '#ffc107' }}>
                    🍕 QuickSlice - Our Story
                </h1>
                <br />

                <div className="container" style={{ lineHeight: '2', fontSize: '18px' }}>
                    <p>
                        Welcome to a pizza revolution! At <b>QuickSlice</b>, we don’t just bake—
                        we craft unforgettable flavor moments. Born from a passion for cheesy goodness
                        and late-night cravings, we’ve been making pizza lovers smile since day one.
                        <br /><br />
                        Whether it’s a football night or a family dinner, our hand-stretched crusts,
                        signature sauces, and loaded toppings promise one thing—mouthwatering satisfaction.
                        Come for the pizza. Stay for the story.
                    </p>
                </div>

                {/* Ingredients */}
                <div className="container my-5 d-flex align-items-center">
                    <img src={IngredientsLogo} alt="Ingredients" className="rounded-circle mr-4" style={{ width: '220px', height: '220px', objectFit: 'cover' }} />
                    <div>
                        <h2 style={{ color: '#ff6f61', fontWeight: 'bold', fontSize: '28px' }}>🌿 Fresh Ingredients</h2>
                        <p style={{ fontSize: '18px', lineHeight: '1.8' }}>
                            We handpick every tomato, basil leaf, and cheese wheel to ensure you're getting the
                            freshest bites every time. Our ingredients travel from farm to flame in record time—
                            all for that unforgettable first bite.
                        </p>
                    </div>
                </div>

                {/* Chefs */}
                <div className="container my-5 d-flex align-items-center flex-row-reverse">
                    <img src={ChefLogo} alt="Chef" className="rounded-circle ml-4" style={{ width: '220px', height: '220px', objectFit: 'cover' }} />
                    <div>
                        <h2 style={{ color: '#7ed6df', fontWeight: 'bold', fontSize: '28px' }}>👨‍🍳 Master Chefs</h2>
                        <p style={{ fontSize: '18px', lineHeight: '1.8' }}>
                            Our culinary wizards knead, bake, and drizzle to perfection. With years of
                            experience and a deep love for food, they make every pizza a masterpiece—
                            one slice at a time.
                        </p>
                    </div>
                </div>

                {/* Delivery */}
                <div className="container my-5 d-flex align-items-center">
                    <img src={TimeLogo} alt="Delivery" className="rounded-circle mr-4" style={{ width: '220px', height: '220px', objectFit: 'cover' }} />
                    <div>
                        <h2 style={{ color: '#f6e58d', fontWeight: 'bold', fontSize: '28px' }}>🚚 45-Minute Delivery</h2>
                        <p style={{ fontSize: '18px', lineHeight: '1.8' }}>
                            Hot pizza, fast delivery. We guarantee your pizza will be delivered in under 45 minutes—
                            fresh, delicious, and piping hot. Because nobody likes waiting for greatness.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
