import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const sumTotal = cartList.reduce(
        (prevValue, currentValue) =>
          prevValue + currentValue.price * currentValue.quantity,
        0,
      )

      return (
        <div className="summary-container">
          <h1 className="heading-order">
            Order Total : <span className="total">{sumTotal}</span>
          </h1>
          <p className="total-items">{cartList.length} Items in cart</p>
          <button type="button" className="button-checkout">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
