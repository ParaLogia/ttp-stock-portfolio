import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { fetchTransactions } from '../../actions/transaction_actions'
import TransactionItem from './transaction_item'
import '../../styles/transaction_history.css'

const TransactionHistory = ({ transactions, fetchTransactions }) => {
  const loaded = useRef(false);

  useEffect(() => {
    fetchTransactions()
    loaded.current = true;
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

  const placeholder = (loaded.current && transactionItems.length === 0) ? (
    <li>You don't have any transactions yet.</li>
  ) : null;

  return (
    <div className="list-container">
      <section className="list">
        <h1>
          Transactions
        </h1>
        <div className="scroller">
          <ul className="scroller-list">
            {placeholder || transactionItems}
          </ul>
        </div>
      </section>
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