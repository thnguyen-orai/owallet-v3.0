import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client";

const stargaze = new HttpLink({
  uri: "https://graphql.mainnet.stargaze-apis.com/graphql",
});

const talis = new HttpLink({
  uri: "https://orai.talis.art/api/graphql",
});

const clientApollo = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().apiName === "stargaze", // boolean check
    stargaze, // if true
    talis // if fa
  ),
  cache: new InMemoryCache(),
});

export default clientApollo;
