import React from "react";
import redirect from "../../lib/redirect";
import checkLoggedIn from "../../lib/checkLoggedIn";

import SigninBox from "../../components/SigninBox";

export default class Signin extends React.Component {
  static async getInitialProps(context) {
    // debugger;
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);
    console.log("loggedInUser ", loggedInUser);
    if (loggedInUser.Profile) {
      // Already signed in? No need to continue.
      // Throw them back to the main page
      console.log("inside signin.js ");
      redirect(context, "/admin");
    }

    return {};
  }

  render() {
    return (
      <div>
        {/* SigninBox handles all login logic. */}
        <SigninBox />
      </div>
    );
  }
}
