import gql from "graphql-tag";

export default apolloClient =>
  apolloClient
    .query({
      query: gql`
        query Profile {
          Profile {
            name
            email
          }
        }
      `
    })
    .then(({ data }) => {
      debugger;
      return { loggedInUser: data };
    })
    .catch(err => {
      // Fail gracefully
      return { loggedInUser: {} };
    });
