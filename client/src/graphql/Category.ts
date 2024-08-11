import gql from 'graphql-tag';

export const GET_CATEGORIES = gql`
  query {
    categories {
      id
      name
      slug
      status
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation createCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      id
      name
      slug
      status
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation removeCategory($id: Int!) {
    removeCategory(id: $id) {
      status
      message
    }
  }
`;
