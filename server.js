const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const mongoose = require("mongoose");
const MONGODB_URI = "mongodb://localhost:27017/test-graphql";

const graphqlHTTP = require("express-graphql");
// const { buildSchema } = require("graphql");

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

const isAuth = require("./middleware/is-auth");

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("Database Connected!"))
  .catch(err => console.error(err));

app.prepare().then(() => {
  const server = express();

  server.use(cookieParser());
  server.use(bodyParser.json()); // application/json

  // server.use((req, res, next) => {
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  //   res.setHeader(
  //     "Access-Control-Allow-Methods",
  //     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  //   );
  //   res.setHeader(
  //     "Access-Control-Allow-Headers",
  //     "Content-Type, Authorization"
  //   );
  //   if (req === "OPTIONS") {
  //     return res.send(200);
  //   }
  //   next();
  // });

  server.use(isAuth);

  server.use(
    "/graphql",
    graphqlHTTP({
      schema: graphQlSchema,
      rootValue: graphQlResolvers,
      graphiql: true,
      formatErrorFn(err) {
        if (!err.originalError) {
          return err;
        }
        const data = err.originalError.data;
        const message = err.message || "An error occurred.";
        const code = err.originalError.code || 500;
        return {
          message: message,
          status: code,
          data: data
        };
      }
    })
  );

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
