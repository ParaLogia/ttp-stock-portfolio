import {
  RECEIVE_TRANSACTIONS,
  RECEIVE_TRANSACTION
} from '../actions/transaction_actions'
import { RECEIVE_CURRENT_USER } from '../actions/session_actions'

const _preloadedState = {
  ids: []
}

const transactionsReducer = (state = _preloadedState, action) => {
  Object.freeze(state)
  let newState;

  switch (action.type) {
    case RECEIVE_TRANSACTIONS:
      const pairs = action.transactions.map(tr => [tr._id, tr])
      newState = Object.fromEntries(pairs)
      newState.ids = Object.keys(newState)
      return newState

    case RECEIVE_TRANSACTION:
      newState = Object.assign({}, state, {
        [action.transaction._id]: action.transaction
      })
      newState.ids = [action.transaction._id].concat(state.ids)
      return newState

    case RECEIVE_CURRENT_USER:
      return _preloadedState

    default:
      return state
  }
} 

export default transactionsReducer