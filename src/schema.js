module.exports = `
type Query {
    posts: [Post]
    post(id: ID!): Post
}

type Post {
  id: ID
  author: String
  body: String
}

type Mutation {
  submitPost(input: PostInput!): Post
}

input PostInput {
  id: ID
  author: String!
  body: String!
}
`