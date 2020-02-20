import React from 'react';
import '../../styles/session.css'

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
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
      name: this.state.name,
      password: this.state.password
    };

    this.props.signup(user);
  }

  renderErrors() {
    return (
      <ul>
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
        <h2>Register</h2>
        <form className="session-form" onSubmit={this.handleSubmit}>
          <input type="email"
            value={this.state.email}
            onChange={this.update('email')}
            placeholder="Email"
          />
          <input type="text"
            value={this.state.name}
            onChange={this.update('name')}
            placeholder="Name"
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

export default SignupForm;