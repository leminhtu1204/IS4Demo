import gql from "graphql-tag";
import { ApolloClient } from "apollo-boost";

export default class RoleServices{
  constructor(client: ApolloClient<any>) {
    this.client = client;
  }
  client: ApolloClient<any>;

  public getRoles() {
    const GET_ROLES =  gql`
    query{
      role{
        id,
        name
      }
    }`;
    return this.client.query<any>({
      query: GET_ROLES,
      fetchPolicy: "no-cache"
    });
  }
}
