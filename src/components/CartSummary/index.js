import CartContext from '../../context/CartContext'

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
        <div>
          <h1>
            Order Total <span>{sumTotal}</span>
          </h1>
          <p className="total-items">{cartList.length} Items in cart</p>
          <button type="button">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
