import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

import NavBar from './navbar';

const msp = state => ({
  loggedIn: Boolean(state.session.user)
});

const mdp = { logout };

export default connect(msp, mdp)(NavBar);