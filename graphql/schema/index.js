const { buildSchema } = require("graphql");

module.exports = buildSchema(`

type User {
  _id: ID!
  email: String!
  password: String!
  name: String!
  joinedAt: String
  lastLoginAt: String
}
type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}
type Profile {
  id: String
  name: String
  email: String
}
type Church {
  _id: ID!
  name: String!
  location: String!
  address: String!
  createdAt: String!
}
type CreatedChurch {
  name: String
}
input UserInput {
  email: String!
  password: String!
  name: String!
}
input LoginInput {
  email: String!
  password: String!
}
input ChurchInput {
  name: String!
  location: String!
  address: String!
}
type RootQuery {
    Profile: Profile!
    churches: [Church]
}
type RootMutation {
    createUser(userInput: UserInput): User
    createChurch(userInput: ChurchInput): Church!
    deleteChurch(_id: ID!): Church
    login(userInput: LoginInput): AuthData!
    lastLoginUpdate(email: String): Boolean!
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);
