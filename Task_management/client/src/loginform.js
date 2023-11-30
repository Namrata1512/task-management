import React from 'react';
import './bootstrap.css';
import './style.css';

class Loginform extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.credentials === "invalid") {
      alert("Incorrect username/password");
    }
    if (props.credentials === "acccreated") {
      alert("Account created successfully");
    }
    return null; // Must return something from getDerivedStateFromProps
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <>
        <div>
          <div className="container-fluid pt-4 bg-primary text-white" style={{ marginBottom: -7 }}>
            <center>
              <h1>WELCOME TO TASK MANAGEMENT TOOL</h1><br />
              <h5>The ultimate tool to manage your tasks</h5><br></br>
            </center>
          </div>

          <div className="container-fluid pt-3 bg-info text-white" style={{ paddingBottom: 100 }}>
            <center>
              <img src={require("./images/index.jpg")} alt="Task Management Tool" />
              <form action="http://localhost:9000/login" method="POST" autoComplete="off" className="form-group" style={{ display: "inline-block", marginTop: -200 }}>
                Username<br />
                <input className="form-control-lg" onChange={this.handleUsernameChange} type="text" name="username" /><br /><br />
                Password<br />
                <input className="form-control-lg" onChange={this.handlePasswordChange} type="password" name="password" /><br /><br />
                <button className="btn btn-primary" type="submit">Login</button>
              </form>
              <p>New user? Click below to create an account</p>
              <a href='/createacc'>
                <button className="btn btn-primary">Create Account</button>
              </a>
            </center>
            <h1>{this.state.username}</h1>
          </div>
        </div>
      </>
    );
  }
}

export default Loginform;
