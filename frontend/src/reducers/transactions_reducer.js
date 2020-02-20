import {
  RECEIVE_TRANSACTIONS,
  RECEIVE_TRANSACTION
} from '../actions/transaction_actions'
import { RECEIVE_CURRENT_USER } from '../actions/session_actions'

const transactionsReducer = (state = {}, action) => {
  Object.freeze(state)

  switch (action.type) {
    case RECEIVE_TRANSACTIONS:
      const pairs = action.transactions.map(tr => [tr._id, tr])
      return Object.fromEntries(pairs)

    case RECEIVE_TRANSACTION:
      return Object.assign({}, state, {
        [action.transaction._id]: action.transaction
      })

    case RECEIVE_CURRENT_USER:
      return {}

    default:
      return state
  }
} 

export default transactionsReducer