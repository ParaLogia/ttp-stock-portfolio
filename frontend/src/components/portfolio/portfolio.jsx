import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { fetchPortfolio } from '../../actions/transaction_actions'
import PortfolioItem from './portfolio_item'
import '../../styles/portfolio.css'

const Portfolio = ({ stocks, totalValue, fetchPortfolio, transactionIds }) => {
  const loaded = useRef(false);
  const timer = useRef(null);

  // Query the api for market prices every 8 seconds
  const subscribeToMarket = () => {
    fetchPortfolio()
    timer.current = window.setTimeout(subscribeToMarket, 8000)
  }

  useEffect(() => {
    loaded.current = true
    subscribeToMarket()

    return () => {
      window.clearTimeout(timer.current);
    }
  }, [transactionIds, fetchPortfolio])

  const stockItems = stocks && Object.entries(stocks).map(([ symbol, props ]) => (
    <PortfolioItem key={symbol} symbol={symbol} {...props} />
  ))

  const placeholder = (loaded.current && stockItems.length === 0) ? (
    <li>You don't have any stocks yet.</li>
  ) : null;

  return (
    <div className="list-container">
      <section className="list">
        <h1>
          Portfolio {totalValue ? `($${totalValue})` : ''}
        </h1>
        <div className="scroller">
          <ul className="scroller-list">
            {placeholder || stockItems}
          </ul>
        </div>
      </section>
    </div>
  )
}

const msp = state => ({
  stocks: state.portfolio.stocks,
  totalValue: state.portfolio.totalValue,
  transactionIds: state.transactions.ids
})

const mdp = {
  fetchPortfolio
}


export default connect(msp, mdp)(Portfolio)