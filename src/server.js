const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql');

const schema = buildSchema(require('./schema'))

const POSTS = [
  { author: "John Doe", body: "Hello world" },
  { author: "Jane Doe", body: "Hi, planet!" },
];

const mapPost = (post, id) => post && ({ id, ...post });

const root = {
  posts: () => POSTS.map(mapPost),
  post: ({ id }) => mapPost(POSTS[id], id),
  submitPost: ({ input: { id, author, body } }) => {
    const post = { author, body };
    let index = POSTS.length;
  
    if (id != null && id >= 0 && id < POSTS.length) {
      if (POSTS[id].authorId !== authorId) return null;
  
      POSTS.splice(id, 1, post);
      index = id;
    } else {
      POSTS.push(post);
    }
  
    return mapPost(post, index);
  },
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

const port = process.env.PORT || 4000
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);