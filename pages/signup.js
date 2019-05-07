import App from "../components/App";
import Header from "../components/Header";
import React, { Component } from "react";
import { graphql, Query } from "react-apollo";
import gql from "graphql-tag";

const data = gql`
  query {
    hello
    positions {
      position
    }
  }
`;
class SignUp extends Component {
  state = {
    data: this.props.data,
    name: "",
    email: "",
    password: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = () => {
    const { name, email, password } = this.state;

    if (name.trim() !== "" && email.trim() !== "" && password.trim() !== "") {
      const data = {
        email,
        name,
        password
      };
      console.log("data to be submitted ", data);
    }
  };

  render() {
    const { name, email, password } = this.state;
    console.log("data", this.props.data);
    return (
      <App>
        <Header />

        <div className="container">
          <div>
            <div>
              <input
                onChange={this.handleChange}
                value={email}
                type="text"
                name="email"
                placeholder="email"
              />
            </div>
            <div>
              <input
                onChange={this.handleChange}
                value={name}
                type="text"
                name="name"
                placeholder="name"
              />
            </div>
            <div>
              <input
                onChange={this.handleChange}
                value={password}
                type="password"
                name="password"
                placeholder="password"
              />
            </div>
            <button type="submit" onClick={this.onSubmit}>
              Submit
            </button>
          </div>
        </div>
      </App>
    );
  }
}

export default graphql(data)(SignUp);
