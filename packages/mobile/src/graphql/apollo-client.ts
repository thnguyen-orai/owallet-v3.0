import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

export enum ProviderGraphQL {
  STARGAZE = "stargaze",
  TALIS = "talis",
}
const httpLink = createHttpLink({
  uri: ({ getContext }) => {
    const { provider } = getContext();
    if (provider === ProviderGraphQL.TALIS)
      return "https://orai.talis.art/api/graphql";
    if (provider === ProviderGraphQL.STARGAZE)
      return "https://graphql.mainnet.stargaze-apis.com/graphql";
  },
});

const clientApollo = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default clientApollo;
