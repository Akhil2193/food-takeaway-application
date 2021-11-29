import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import BillItem from "./BillItem";
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import axios from "axios";

function Cart(props) {
    const [finalItems, setFinalItems] = useState({
        username: localStorage.getItem('username'),
        restaurantName:props.restaurantName,
        foodItemOrder:[
            {
                name:''
            }
        ]
    });
    useEffect(()=>{
        var ded=[];
        for (let index = 0; index < props.shoppingCart.length; index++) {
            var obj ={};
            obj['name']=props.shoppingCart[index].name;
            ded.push(obj);     
        }
        if(ded.length>0){

            setFinalItems(prevValue=>{
                return({
                    ...prevValue,
                    foodItemOrder:[...ded]
                })
            })
        }

    },[props.shoppingCart])
    function handlePayment(){
        // console.log(finalItems);
        axios.post(`http://localhost:8080/api/user/placeOrder`,finalItems, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(function (response) {
                alert('Order Placed Suucessfully!')
                window.location.reload(false);
            })
            .catch(function (error) {
                alert('Oops! Something went wrong');
                console.log(error);
            })
    }
    if (props.shoppingCart.length > 0) {

        return (<div>
            <div className="checkout-mobile" onClick={props.displayCart} style={{ 'display': props.cartDisplay ? 'none' : 'flex' }}>
                <div style={{ 'display': props.cartDisplay ? 'none' : 'flex' }} >
                    <ShoppingCartTwoToneIcon fontSize="small" />
                </div>
            </div>
            <div style={{ 'display': props.cartDisplay ? 'none' : 'flex' }}>
                <div className="checkout-desktop" onClick={props.displayCart}>

                    <ShoppingCartTwoToneIcon />
                    View Cart
                </div>
            </div>
            <div className="checkout-bill" style={{ 'display': props.cartDisplay ? 'block' : 'none' }}>
                <div className="checkout-bill-close" onClick={props.displayCart}>
                    <ClearRoundedIcon fontSize="small" />
                </div>
                <div className="checkout-bill-name">
                    Checkout
                </div>
                <div className="checkout-bill-restaurant-name">
                    {props.restaurantName}
                </div>
                <div className="checkout-bill-type">
                    {props.restaurantType}

                </div>
                {props.shoppingCart.map(item => {
                    return (
                        <BillItem
                        id={item.id}
                            name={item.name}
                            price={item.price}
                            veg={item.veg}
                            quantity={item.quantity}
                            addToCart={props.addToCart}
                            removeFromCart={props.removeFromCart} />
                    )
                })}
                <div className="checkout-bill-total">
                    Bill Details

                    <div className="checkout-bill-total1">
                        <div className="checkout-bill-total1-child1">
                            Item Total
                        </div>
                        <div className="checkout-bill-total1-child2">
                            <span>&#8377;</span> {props.total}
                        </div>
                    </div>
                    {/* <div className="checkout-bill-total1">
                        <div className="checkout-bill-total1-child1">
                            Delievery Charges
                        </div>
                        <div className="checkout-bill-total1-child2">
                            <span>&#8377;</span> 40
                        </div>
                    </div> */}
                    <div className="checkout-bill-total2">
                        <div className="checkout-bill-total2-child1">
                            To Pay
                        </div>
                        <div className="checkout-bill-total2-child2">
                            <span>&#8377;</span> {props.total}
                        </div>
                    </div>
                    {/* <Link to={`/${props.restaurantId}/order/location`} style={{textDecoration:'none'}}> */}
                    <button className="checkout-bill-total3" onClick={handlePayment}>
                        Order Now
                    </button>
                    {/* </Link> */}
                </div>
            </div>
        </div>)
    }
    else {
        return (<div>
            <div className="checkout-mobile" onClick={props.displayCart} style={{ 'display': props.cartDisplay ? 'none' : 'flex' }}>
                <div style={{ 'display': props.cartDisplay ? 'none' : 'flex' }} >
                    <ShoppingCartTwoToneIcon fontSize="small" />
                </div>
            </div>
            <div style={{ 'display': props.cartDisplay ? 'none' : 'flex' }}>
                <div className="checkout-desktop" onClick={props.displayCart}>

                    <ShoppingCartTwoToneIcon />
                    View Cart
                </div>
            </div>
            <div className="checkout-bill-empty" style={{ 'display': props.cartDisplay ? 'flex' : 'none' }}>
                <div className="checkout-bill-close" onClick={props.displayCart}>
                    <ClearRoundedIcon fontSize="small" />
                </div>
                <div className="empty-cart">
                    <div className="empty-cart-child1">GOOD FOOD IS ALWAYS COOKING</div>
                    <div className="empty-cart-child2">Your Cart is empty</div>
                    <div className="empty-cart-child2">Add some items from Menu</div>
                    <button className="empty-cart-child3">
                        <Link to="/" style={{ textDecoration: 'none' }}><span>Browse Restaurants</span></Link>
                    </button>
                </div>
            </div>
        </div>)
    }
}

export default Cart;