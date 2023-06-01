import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

const getLocalCartData = () => {
  const newCartData = localStorage.getItem('cartList')
  if (newCartData === []) {
    return []
  }
  return JSON.parse(newCartData)
}

class App extends Component {
  state = {
    cartList: getLocalCartData(),
  }

  useCase = () => {
    const {cartList} = this.state
    localStorage.setItem('cartList', JSON.stringify(cartList))
  }

  removeCartItem = id => {
    this.setState(
      prevState => ({
        cartList: prevState.cartList.filter(x => x.id !== id),
      }),
      this.useCase,
    )
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productObject = cartList.find(
      //   Value of first element that passes the test
      eachCartItem => eachCartItem.id === product.id,
    )

    if (productObject) {
      this.setState(
        prevState => ({
          cartList: prevState.cartList.map(eachCartItem => {
            if (productObject.id === eachCartItem.id) {
              const updatedQuantity = eachCartItem.quantity + product.quantity

              return {...eachCartItem, quantity: updatedQuantity}
            }

            return eachCartItem
          }),
        }),
        this.useCase,
      )
    } else {
      const updatedCartList = [...cartList, product]

      this.setState({cartList: updatedCartList}, this.useCase)
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []}, this.useCase)
  }

  incrementCartItemQuantity = id => {
    this.setState(
      prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }),
      this.useCase,
    )
  }

  decrementCartItemQuantity = id => {
    this.setState(
      prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity - 1
            if (updatedQuantity >= 1) {
              return {...eachCartItem, quantity: updatedQuantity}
            }
            return eachCartItem
          }
          return eachCartItem
        }),
      }),
      this.useCase,
    )
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
