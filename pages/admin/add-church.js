import React from "react";
import AdminLayout from "../../components/AdminLayout";
import cookie from "cookie";
import { ApolloConsumer } from "react-apollo";
import CreateChurch from "../../components/CreateChurch";
import redirect from "../../lib/redirect";
import checkLoggedIn from "../../lib/checkLoggedIn";

export default class AddChurch extends React.Component {
  static async getInitialProps(context, apolloClient) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);

    if (!loggedInUser.Profile) {
      // If not signed in, send them somewhere more useful
      redirect(context, "admin/signin");
    }

    return { loggedInUser };
  }

  state = {
    test: ""
  };

  signout = apolloClient => () => {
    document.cookie = cookie.serialize("token", "", {
      maxAge: -1 // Expire the cookie immediately
    });

    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.
    apolloClient.cache.reset().then(() => {
      // Redirect to a more useful page when signed out
      redirect({}, "/admin/signin");
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, email } = this.props.loggedInUser.Profile;

    return (
      <ApolloConsumer>
        {client => (
          <AdminLayout
            signout={this.signout(client)}
            title={"Add Church"}
            name={name}
          >
            <CreateChurch />
          </AdminLayout>
        )}
      </ApolloConsumer>
    );
  }
}
