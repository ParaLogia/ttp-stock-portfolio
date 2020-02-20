import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createTransaction } from '../../actions/transaction_actions'
import '../../styles/transaction_form.css'

const TransactionForm = ({ balance, createTransaction, errors }) => {
  const [ symbol, setSymbol ] = useState('')
  const [ quantity, setQuantity ] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    createTransaction({
      symbol,
      quantity
    }).then(() => {
      setSymbol('')
      setQuantity('')
    })
  }

  const errorLis = Object.values(errors).map((err, i) => (
    <li key={i}>{err}</li>
  ))

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

      <ul className="errors">
        {errorLis}
      </ul>
    </div>
  )
}

const msp = state => ({
  balance: state.session.user.balance,
  errors: state.errors.transaction
})

const mdp = { 
  createTransaction
}

export default connect(msp, mdp)(TransactionForm)