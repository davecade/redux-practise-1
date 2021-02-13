import React from 'react'
import './cart-icon.styles.scss'
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

const CartIcon = ({ toggleCartHidden, totalItems }) => (
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingIcon className="shopping-icon" />
        <span className="item-count">{totalItems}</span>
    </div>
)

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = ({cart: { cartItems }}) => {
    return {
        totalItems: cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.quantity, 0)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)