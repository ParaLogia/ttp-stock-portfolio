import React from 'react'
import '../../styles/session.css'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors()
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user);
  }

  renderErrors() {
    return (
      <ul className="errors">
        {Object.values(this.props.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="session-form-container">
        <h2>Sign In</h2>
        <form className="session-form" onSubmit={this.handleSubmit}>
          <input type="email"
            value={this.state.email}
            onChange={this.update('email')}
            placeholder="Email"
          />
          <input type="password"
            value={this.state.password}
            onChange={this.update('password')}
            placeholder="Password"
          />
          <input type="submit" value="Submit" />
          {this.renderErrors()}
        </form>
      </div>
    );
  }
}

export default LoginForm;