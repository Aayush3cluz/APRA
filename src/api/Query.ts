import { gql } from "@apollo/client";

export const GET_PHOTOS = gql`
  query getPhotos($page: Int, $query: String) {
    photos(
      options: { paginate: { page: $page, limit: 4 }, search: { q: $query } }
    ) {
      data {
        id
        title
        url
        thumbnailUrl
      }
      meta {
        totalCount
      }
    }
  }
`;
