import gql from "graphql-tag";
import User from "../types/Account/User";
import { ApolloClient } from "apollo-boost";

export default class UserServices {
  constructor(client: ApolloClient<any>) {
    this.client = client;
  }
  client: ApolloClient<any>;

  public getUsers() {
    const GET_USERS = gql`
      query {
        users {
          id,
          userName,
          roles {
            id,
            name
          }
        }
      }
    `;
    return this.client.query<any>({
      query: GET_USERS,
      fetchPolicy: "no-cache"
    });
  }

  public getUserById(id: String) {
    const GET_USER = gql`
      query {
        users: users {
          id
          userName
        }
      }
    `;
    return this.client.query<any>({
      query: GET_USER,
      fetchPolicy: "no-cache"
    });
  }
}
