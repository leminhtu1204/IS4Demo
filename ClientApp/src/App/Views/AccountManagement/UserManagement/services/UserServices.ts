import gql from "graphql-tag";
import { ApolloClient } from "apollo-boost";
import User from "../types/User";

export default class UserServices {
  constructor(client: ApolloClient<any>) {
    this.client = client;
  }
  client: ApolloClient<any>;

  public getUsers(offset: any, size: any, searchTerm: any) {
    const GET_USERS =  gql`
    query User($allUserRequestInput: AllUserRequestInput) {
      users: user(allUserRequestInput: $allUserRequestInput) {
        id
        userName
        phoneNumber,
        address,
        email,
        roles {
          id
          name
        }
      }
      roles: role {
        id,
        name
      }
    }`;
    return this.client.query<any>({
      query: GET_USERS,
      variables: {
        allUserRequestInput: {
            offset: offset,
            size: size,
            searchTerm: searchTerm
        }
    },
      fetchPolicy: "no-cache"
    });
  }

  public editUser(user: User) {
    const UPDATE_USER =  gql`
    mutation updateUser($updateUserInput:UpdateUserInput){
      editUser(updateUserInput: $updateUserInput){
        id
      }
    }`;
    return this.client.mutate({
      mutation: UPDATE_USER,
      variables: {
        updateUserInput: {
          id: user.id,
          userName: user.userName,
          phoneNumber: user.phoneNumber,
          address: user.address,
          email: user.email,
          roleNames: user.roleNames
        }
    },
      fetchPolicy: "no-cache"
    });
  }

  public addUser(user: User) {
    const ADD_USER =  gql`
    mutation createUser($createUserInput: CreateUserInput){
      createUser(createUserInput: $createUserInput){
        userName
      }
    }`;
    return this.client.mutate({
      mutation: ADD_USER,
      variables: {
        createUserInput: {
          id: user.id,
          userName: user.userName,
          phoneNumber: user.phoneNumber,
          address: user.address,
          roleNames: user.roleNames,
          email: user.email
        }
    },
      fetchPolicy: "no-cache"
    });
  }

  public deleteUser(userId: string) {
    const DEL_USER =  gql`
    mutation deleteUser($userId: String) {
      deleteUser(userId: $userId){
        id
      }
    }`;
    return this.client.mutate({
      mutation: DEL_USER,
      variables: {
        userId: userId
    },
      fetchPolicy: "no-cache"
    });
  }
}
