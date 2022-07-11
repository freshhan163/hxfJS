const Koa = require('koa');
const { ApolloServer, gql } = require('apollo-server-koa');
const { resolvers } = require('./resolver');

// 定义从服务器获取数据的graphql方法

const typeDefs = gql`
    type todo {
        _id: ID!
        content: String!
        completed: Boolean!
    }
    type Query {
        todoList: [todo]!
    }
    type updateRes {
        success: Boolean!
        todoList: [todo]!
    }
    type Mutation {
        addTodo(content: String): updateRes!
    }
`;

async function statApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        mocks: true
    });
    await server.start();

    const app = new Koa();
    server.applyMiddleware({ app });
    app.listen({ port: 4100 }, () => {
        console.log(`🚀 Server ready at http://localhost:4100${server.graphqlPath}`);
    });
}

statApolloServer(typeDefs, resolvers);
