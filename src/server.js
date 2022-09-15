import { ApolloServer } from 'apollo-server';
import schemas from './schema.js';
import resolvers from './resolvers.js';
import { mergeSchemas } from 'graphql-tools';
import { getConfig } from './util';

const schema = mergeSchemas({
    schemas,
    resolvers
});

export const serverConfig = {
    schema,
    context: ({ req }) => ({
        // token: req.headers['authorization'],
        organizationId: req.headers['organization-id']
    })
};

export const instantiateServer = (customConfig = {}) =>
    new ApolloServer({
        ...serverConfig,
        ...customConfig,
        
    });

export async function startServer(server = instantiateServer(), customPort) {
    try {
        const port = customPort || getConfig('apolloPort');
        var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
        var server_host = process.env.YOUR_HOST || '0.0.0.0';
    

        const { url } = await server.listen(server_port, server_host);
        console.log(`🚀  Apollo Server ready at ${url}.`);
    } catch (error) {
        console.error('Could not start server.', error);
    }
}
