import { gql } from "@apollo/client";
export const GetWallets = gql(`
    query GetWallets($input: GetWalletInput!) {
  wallets(input: $input) {
    id
    user {
      id
      username
      hasAcceptedTerms
      isArtist
      email
      legalAgeConsent
      wantsToMerge
      followersCount
      wallet {
        id
        address
        __typename
      }
      profilePic
      coverPic
      description
      website
      discord
      facebook
      twitter
      telegram
      youtube
      showNotRegisteredBanner
      isBlocked
      allowIrys
      __typename
    }
    address
    createdAt
    updatedAt
    __typename
  }
}
    `);
