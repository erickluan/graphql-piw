const { GraphQLServer } = require('graphql-yoga');

// 1
let users = [
  {
    uid: 0,
    name: 'Erick Luan',
    email: 'erick.luan@email.com',
  },
  {
    uid: 1,
    name: 'João Paulo',
    email: 'joao.paulo@email.com',
  },
  {
    uid: 2,
    name: 'Lucas Mauricio',
    email: 'lucas.mauricio@email.com',
  },
];
let posts = [
  {
    pid: 1,
    user: {
      uid: 1,
      name: 'Erick Luan',
      email: 'erick.luan@email.com',
    },
    title: 'First Post',
    body: 'Hello World!',
  },
];
const typeDefs = `
type Query {
  users: [User!]!
  posts: [Post!]!
}

type Mutation {
  user(name: String!, email: String!): User,
  post(title: String!, body: String!): Post
}

type User {
  uid: ID! @unique
  name: String!
  email: String!
}

type Post {
  pid: ID!
  user: User!
  title: String!
  body: String!
}

`;
let uidCount = users.length;
let pidCount = posts.length;

const resolvers = {
  Query: {
    users: () => users,
    posts: () => posts,
  },
  Mutation: {
    user: (root, args) => {
      const newUser = {
        uid: uidCount++,
        name: args.name,
        email: args.email,
      };
      users.push(newUser);
      return newUser;
    },
    post: (root, args) => {
      const newPost = {
        pid: pidCount,
        user: args.user,
        title: args.title,
        body: args.body
      };
      posts.push(newPost);
      return newPost;
    },
  },
  User: {
    uid: root => root.uid,
    name: root => root.name,
    email: root => root.email,
  },
  Post: {
    pid: root => root.pid,
    user: root => root.user,
    title: root => root.title,
    body: root => root.body,
  },
};

// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));

//'./src/schema.graphql'
