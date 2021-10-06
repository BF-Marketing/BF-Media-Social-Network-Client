
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import{ createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context';
import dotenv from 'dotenv';
dotenv.config()

const httpLink = createHttpLink({
    uri: process.env.HOST_URL
});

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;
