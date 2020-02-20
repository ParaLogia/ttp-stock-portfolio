import React from 'react'
import Portfolio from './portfolio'
import TransactionForm from './transaction_form'

const Home = () => {
  return (
    <main>
      <Portfolio />
      <div className="vert-sep"></div>
      <TransactionForm />
    </main>
  )
}

export default Home