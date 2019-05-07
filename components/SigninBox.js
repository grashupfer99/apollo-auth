import { Mutation, withApollo } from "react-apollo";
import gql from "graphql-tag";
import cookie from "cookie";
import redirect from "../lib/redirect";

const SIGN_IN = gql`
  mutation login($email: String!, $password: String!) {
    login(userInput: { email: $email, password: $password }) {
      token
    }
  }
`;

const SigninBox = ({ client }) => {
  let email, password;

  return (
    <Mutation
      mutation={SIGN_IN}
      onCompleted={data => {
        debugger;
        // Store the token in cookie
        document.cookie = cookie.serialize("token", data.login.token, {
          maxAge: 1 * 24 * 60 * 60
          // maxAge: 30 * 24 * 60 * 60 // 30 days
        });
        // Force a reload of all the current queries now that the user is
        // logged in
        // client.cache.reset().then(() => {
        client.cache.reset().then(() => {
          console.log("inside SigninBox.js ");
          redirect({}, "/admin");
        });
      }}
      onError={error => {
        // If you want to send error to external service?
        console.log("error logging in user ", error);
      }}
    >
      {(login, { data, error }) => (
        <div>
          <form
            className="form-signin"
            onSubmit={e => {
              e.preventDefault();
              e.stopPropagation();

              login({
                variables: {
                  email: email.value,
                  password: password.value
                }
              });

              email.value = password.value = "";
            }}
          >
            <div className="text-center mb-4">
              <h1 className="h3 mb-3 font-weight-normal">Admin Page Login</h1>
              {/* <p>Admin account login page</p> */}
            </div>
            {/* {error && <p>No user found with that information.</p>} */}
            <div className="form-label-group">
              <input
                className={`form-control ${error ? "is-invalid" : ""}`}
                name="email"
                id="inputEmail"
                // autoComplete="off"
                placeholder="Email"
                ref={node => {
                  email = node;
                }}
              />
              <label htmlFor="inputEmail">Email address</label>
              {error && (
                <div className="invalid-feedback">
                  No user found with that information.
                </div>
              )}
            </div>

            <div className="form-label-group">
              <input
                className="form-control"
                name="password"
                id="inputPassword"
                placeholder="Password"
                ref={node => {
                  password = node;
                }}
                type="password"
              />
              <label htmlFor="inputPassword">Password</label>
            </div>

            <button
              className="btn btn-lg btn-secondary btn-block"
              type="submit"
            >
              Sign in
            </button>
            <p className="mt-5 mb-3 text-muted text-center">
              Church-Locator © {new Date().getFullYear()}
            </p>
          </form>
          <style jsx>
            {`
              .form-signin {
                width: 100%;
                max-width: 420px;
                padding: 15px;
                margin: auto;
              }

              .form-label-group {
                position: relative;
                margin-bottom: 1rem;
              }

              .form-label-group > input,
              .form-label-group > label {
                height: 3.125rem;
                padding: 0.75rem;
              }

              .form-label-group > label {
                position: absolute;
                top: 0;
                left: 0;
                display: block;
                width: 100%;
                margin-bottom: 0;
                line-height: 1.5;
                color: #495057;
                pointer-events: none;
                cursor: text;
                border: 1px solid transparent;
                border-radius: 0.25rem;
                transition: all 0.1s ease-in-out;
              }

              .form-label-group input::-webkit-input-placeholder {
                color: transparent;
              }

              .form-label-group input:-ms-input-placeholder {
                color: transparent;
              }

              .form-label-group input::-ms-input-placeholder {
                color: transparent;
              }

              .form-label-group input::-moz-placeholder {
                color: transparent;
              }

              .form-label-group input::placeholder {
                color: transparent;
              }

              .form-label-group input:not(:placeholder-shown) {
                padding-top: 1.25rem;
                padding-bottom: 0.25rem;
              }

              .form-label-group input:not(:placeholder-shown) ~ label {
                padding-top: 0.25rem;
                padding-bottom: 0.25rem;
                font-size: 12px;
                color: #777;
              }

              @supports (-ms-ime-align: auto) {
                .form-label-group > label {
                  display: none;
                }
                .form-label-group input::-ms-input-placeholder {
                  color: #777;
                }
              }

              @media all and (-ms-high-contrast: none),
                (-ms-high-contrast: active) {
                .form-label-group > label {
                  display: none;
                }
                .form-label-group input:-ms-input-placeholder {
                  color: #777;
                }
              }
            `}
          </style>
        </div>
      )}
    </Mutation>
  );
};

export default withApollo(SigninBox);
