import React from "react";
import AdminLayout from "../../components/AdminLayout";
import cookie from "cookie";
import { ApolloConsumer, Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import redirect from "../../lib/redirect";
import checkLoggedIn from "../../lib/checkLoggedIn";
import Router from "next/router";
import { formatDate } from "../../helpers/date";
export const allChurchesQuery = gql`
  query {
    churches {
      _id
      name
      location
      address
      createdAt
    }
  }
`;

export const deleteChurchMutation = gql`
  mutation deleteChurch($id: ID!) {
    deleteChurch(_id: $id) {
      _id
    }
  }
`;

const updateCache = (cache, { data: { deleteChurch } }) => {
  const { churches } = cache.readQuery({ query: allChurchesQuery });
  console.log("deleteChurch ", deleteChurch._id);
  cache.writeQuery({
    query: allChurchesQuery,
    data: {
      churches: churches.filter(church => church._id !== deleteChurch._id)
    }
  });
};

export default class Index extends React.Component {
  static async getInitialProps(context) {
    debugger;
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);

    if (!loggedInUser.Profile) {
      // If not signed in, send them somewhere more useful
      redirect(context, "/admin/signin");
    }

    return { loggedInUser };
  }

  addChurch = () => {
    Router.push("/admin/add-church");
  };

  signout = apolloClient => () => {
    debugger;
    console.log("signout clicked ");

    document.cookie = cookie.serialize("token", "", {
      maxAge: -1 // Expire the cookie immediately
    });
    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.

    apolloClient.cache.reset().then(() => {
      // Redirect to a more useful page when signed out
      console.log("inside resetStore ");
      redirect({}, "/admin/signin");
    });
  };

  render() {
    const { name } = this.props.loggedInUser.Profile;

    return (
      <ApolloConsumer>
        {client => (
          <AdminLayout
            signout={this.signout(client)}
            name={name}
            title={"Dashboard"}
          >
            <div className="py-3">
              <div className="row mx-0 pb-2 border-bottom">
                <div className="col-sm-8">
                  <span className="h5">Create a new church</span>
                </div>
                <div className="col-sm-4 text-right">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={this.addChurch}
                  >
                    New Church
                  </button>
                </div>
              </div>
            </div>
            <div className="py-3">
              <Query query={allChurchesQuery}>
                {({ loading, error, data }) => {
                  if (error) return <div>Error loading posts</div>;
                  if (loading) return <div>Loading</div>;
                  return (
                    <div className="table-responsive">
                      <table className="table table-striped table-sm">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>CreatedAt</th>
                          </tr>
                        </thead>
                        <tbody>
                          {!!data.churches &&
                            (data.churches.length === 0 ? (
                              <tr className="text-center">
                                <td colSpan="6">No church records found...</td>
                              </tr>
                            ) : (
                              data.churches.map((church, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{church.name}</td>
                                  <td>{church.location}</td>
                                  <td>
                                    <button className="btn btn-secondary btn-sm">
                                      Edit
                                    </button>
                                  </td>
                                  <td>
                                    <Mutation
                                      mutation={deleteChurchMutation}
                                      variables={{ id: church._id }}
                                      update={updateCache}
                                    >
                                      {(deleteChurch, { loading, error }) => (
                                        <button
                                          onClick={() =>
                                            deleteChurch({
                                              variables: { id: church._id }
                                            })
                                          }
                                          className="btn btn-sm btn-danger"
                                        >
                                          {loading ? (
                                            <i className="fas fa-spinner fa-spin px-3" />
                                          ) : (
                                            "Delete"
                                          )}
                                        </button>
                                      )}
                                    </Mutation>
                                  </td>
                                  <td>
                                    {formatDate(parseInt(church.createdAt))}
                                  </td>
                                </tr>
                              ))
                            ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }}
              </Query>
            </div>

            <style jsx>{`
              .table tbody tr td {
                vertical-align: middle;
              }
            `}</style>
          </AdminLayout>
        )}
      </ApolloConsumer>
    );
  }
}
