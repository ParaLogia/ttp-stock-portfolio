import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createTransaction } from '../../actions/transaction_actions'
import '../../styles/transaction_form.css'

const TransactionForm = ({ balance, createTransaction }) => {
  const [ symbol, setSymbol ] = useState('')
  const [ quantity, setQuantity ] = useState('')

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
    <div className="transaction-form-container">
      <p className="balance">Cash - ${balance}</p>

      <form className="transaction-form" onSubmit={handleSubmit}>
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

        <input type="submit" value="Buy"/>
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