import React, { Component } from "react";
import "./App.scss";
import { Provider as ReduxProvider } from "react-redux";
import { ApolloProvider } from "react-apollo";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../src/App/reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter } from "react-router-dom";
import AuthenticationContainer from "../src/App/Views/Authentication/containers/AuthenticationContainer";
import client from "./App/utils/ApolloClient";


class App extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    const store = createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(thunk))
    );
    return (
      <ReduxProvider store={store}>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <AuthenticationContainer />
          </BrowserRouter>
        </ApolloProvider>
      </ReduxProvider>
    );
  }
}

export default App;
