// 创建一个数据
const data = [
    {
        _id: "5ca16ed7c39e5a03d8ad3547",
        content: "html5",
        completed: false
    },
    {
        _id: "5ca16ee0c39e5a03d8ad3548",
        content: "javascript",
        completed: false
    },
    {
        _id: "5ca16ee5c39e5a03d8ad3549",
        content: "css",
        completed: false
    }
];

// resolvers
module.exports = {
    resolvers: {
        Query: {
            todoList: () => data
        },
        Mutation: {
            addTodo: (_, { content }) => {
                console.log('mutation content = ', content);
                data.push({
                    _id:Math.random().toString(36).substring(3),
                    content: 'hxf',
                    completed: false
                });
                return { success: true, todoList: data };
            }
        }
    }
};
