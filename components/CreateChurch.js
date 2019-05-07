import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { allChurchesQuery } from "../pages/admin/index";

export default function CreateChurch() {
  return (
    <ApolloConsumer>
      {client => (
        <form onSubmit={event => handleSubmit(event, client)}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Name"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                className="form-control"
                id="location"
                name="location"
                placeholder="location"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="Address"
              />
            </div>
          </div>
          <div className="pt-4 text-right">
            <button className="btn btn-sm btn-secondary" type="submit">
              Create
            </button>
          </div>
        </form>
      )}
    </ApolloConsumer>
  );
}

function handleSubmit(event, client) {
  event.preventDefault();
  const form = event.target;
  const formData = new window.FormData(form);
  const name = formData.get("name");
  const location = formData.get("location");
  const address = formData.get("address");
  console.log("name, location, address ", name, location, address);
  form.reset();

  client.mutate({
    mutation: gql`
      mutation createChurch(
        $name: String!
        $location: String!
        $address: String!
      ) {
        createChurch(
          userInput: { name: $name, location: $location, address: $address }
        ) {
          _id
          name
          location
          address
          createdAt
        }
      }
    `,
    variables: { name, location, address },
    update: (proxy, { data: { createChurch } }) => {
      const data = proxy.readQuery({
        query: allChurchesQuery
      });
      proxy.writeQuery({
        query: allChurchesQuery,
        data: {
          churches: [...data.churches, createChurch]
        }
      });
    }
  });
}
