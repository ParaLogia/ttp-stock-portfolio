import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createTransaction } from '../../actions/transaction_actions'

const TransactionForm = ({ balance, createTransaction }) => {
  const [ symbol, setSymbol ] = useState('')
  const [ quantity, setQuantity ] = useState('1')

  const handleSubmit = e => {
    e.preventDefault()
    createTransaction({
      symbol,
      quantity
    }).then(() => {
      setSymbol('')
      setQuantity(1)
    })
  }

  return (
    <div>
      <p>Cash - ${balance}</p>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={symbol} 
          onChange={e => setSymbol(e.target.value.toUpperCase())}
          placeholder={"Ticker Symbol"}/>

        <input 
          type="number" 
          value={quantity} 
          onChange={e => setQuantity(e.target.value)}
          min="1" 
          step="1" 
          placeholder={"Quantity"}/>

        <button>Buy</button>
      </form>
    </div>
  )
}

const msp = state => ({
  balance: state.session.user.balance,
})

const mdp = { 
  createTransaction
}

export default connect(msp, mdp)(TransactionForm)