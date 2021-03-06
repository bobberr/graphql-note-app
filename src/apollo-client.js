import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
    link: new HttpLink({uri: 'https://my-note-appp.herokuapp.com/graphql'}),
    cache: new InMemoryCache()
});

export default client;