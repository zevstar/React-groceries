class App extends React.Component {

    state = {
        products: productsList,
        name: '', 
        price: 0,
        description: '',
        cartItems: []
    }

    addToCart = item => {
        // console.log('We are inside addToCart function', item)
        this.setState({
            cartItems: [item, ...this.state.cartItems]
        })
    }

    handleChange = (event) => {
        // console.log(event.target)
        // Don't update state directly, we will not see it update in the browser
        // this.state.value = teo.target.value

        // Correct way of updating
        // event.target.id allows us to use the id we specified in the form to make our handleChange dynamic
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const newItem = {
            name: this.state.name,
            price: parseInt(this.state.price),
            description: this.state.description
        }

        // console.log(typeof parseInt(newItem.price))
        this.setState({
            products: [newItem, ...this.state.products],
            name: '',
            price: 0,
            description: ''
        })

    }

    render() {
        // console.log('APP', this.state.products)
        // console.log('CART', this.state.cartItems)
        return (
            <div>
                <h1>Big Time Shopping</h1>

                <div id='create-product'>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor='name'>Name:</label>
                        <input id='name' type='text' value={this.state.name} onChange={this.handleChange} />
                        <label htmlFor='price'>Price:</label>
                        <input id='price' type='number' value={this.state.price} onChange={this.handleChange} />
                        <label htmlFor='description'>Description:</label>
                        <input id='description' type='text' value={this.state.description} onChange={this.handleChange} />
                        <input type='submit' />
                    </form>

                    <div className='preview'>
                        <h2>Preview our new item</h2>
                        <h3>{this.state.name}</h3>
                        <h4>{this.state.price}</h4>
                        <h5>{this.state.description}</h5>
                    </div>
                </div>


                <div className='products'>
                    <h3>Please Purchase our Excellent Products</h3>
                    <ul>
                        {
                            this.state.products.map(product => {
                                return (
                                    <Product 
                                        product={product} 
                                        handleAdd={this.addToCart} 
                                    />
                                )
                            })
                        }
                    </ul>
                </div>

                <div className='cart'>
                    <h3>Shopping Cart</h3>
                    <ul>
                        {
                            this.state.cartItems.map(item => {
                                return (
                                    <ShoppingCart product={item} />
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#container')
)