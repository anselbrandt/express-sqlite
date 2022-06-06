import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { NoteStore } from "../model/notes";

const schema = buildSchema(`
type Query {
  hello: String
}
`);

const root = {
  hello: () => {
    return "Hello world!";
  },
};

const graphql = (store: NoteStore) =>
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  });

export default graphql;
