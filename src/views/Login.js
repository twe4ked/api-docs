import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
  }

  handleUsernameChange = (event) =>
    this.setState({username: event.target.value});

  handlePasswordChange = (event) =>
    this.setState({password: event.target.value});

  handleSubmit = (event) => {
    this.props.fetchData({
      'Authorization': 'Basic ' + btoa(this.state.username + ':' + this.state.password)
    });
    event.preventDefault();
  }

  render() {
    return (
      <section>
        <div className="left">
          <div className="padding">
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
              <label className="label">
                <div>Username</div>
                <input type="text" className="input" value={this.state.username} onChange={this.handleUsernameChange} />
              </label>
              <label>
                <div>Password</div>
                <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
              </label>
              <input className="btn" type="submit" value="Login" />
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default Login
