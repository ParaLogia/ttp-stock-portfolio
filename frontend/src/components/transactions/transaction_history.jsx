import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchTransactions } from '../../actions/transaction_actions'
import TransactionItem from './transaction_item'

const TransactionHistory = ({ transactions, fetchTransactions }) => {
  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  const transactionItems = transactions.map(tr => (
    <TransactionItem 
      key={tr._id} 
      symbol={tr.symbol} 
      quantity={tr.quantity} 
      unitPrice={tr.unitPrice} 
      date={tr.date} 
    />
  ))

  return (
    <div>
      <h1>
        Transactions
      </h1>
      <ul>
        {transactionItems}
      </ul>
    </div>
  )
}

const msp = state => {
  const { transactions } = state;
  const { ids } = transactions;
  return {
    transactions: ids.map(id => transactions[id])
  }
}

const mdp = {
  fetchTransactions
}

export default connect(msp, mdp)(TransactionHistory)