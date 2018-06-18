const { GraphQLServer } = require('graphql-yoga');

// 1
let users = [
  {
    uid: 1,
    name: 'Erick Luan',
    email: 'erick.luan@email.com',
  },
  {
    uid: 2,
    name: 'João Paulo',
    email: 'joao.paulo@email.com',
  },
  {
    uid: 3,
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

`;

// 2
const resolvers = {
  Query: {
    users: () => users,
    posts: () => posts,
  },
  Mutation: {
    createUser: (parent, args) => {
      const newUser = Object.assign({ uid: users.length + 1 }, args);
      users.push(newUser);
      return newUser;
    },
  },
  User: {
    uid: root => root.uid,
    name: root => root.name,
    email: root => root.email,
  },
  Posts: {
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
