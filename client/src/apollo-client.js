import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { toast } from "react-toastify";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const uploadLink = createUploadLink({
  uri: "http://localhost:5000/graphql",
  headers: {
    "Apollo-Require-Preflight": "true",
  },
})

const authLink = setContext((_, { headers }) => {
  // get authentication token;
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

// Error Link to handle errors globally
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      toast.error(message || 'A GraphQL error occurred.')
    );
    // Optionally display these errors to the user
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    toast.error('Network error occurred.');
  }
});

const client = new ApolloClient({
  link: authLink.concat(errorLink).concat(uploadLink),
  cache: new InMemoryCache(),
});

export default client;
