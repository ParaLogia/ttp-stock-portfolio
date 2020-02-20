import React from 'react'
import Portfolio from './portfolio'
import TransactionForm from './transaction_form'

const Home = ({ name, balance }) => {
  return (
    <main>
      <Portfolio />
      <TransactionForm />
    </main>
  )
}

export default Home