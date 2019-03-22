import React, { Component } from "react";
import "./App.css";
import { Provider as ReduxProvider } from "react-redux";
import client from "./utils/ApolloClient";
import { ApolloProvider } from "react-apollo";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter } from "react-router-dom";
import AuthenContainer from './containers/Authen/AuthenContainer';

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
            <AuthenContainer />
          </BrowserRouter>
        </ApolloProvider>
      </ReduxProvider>
    );
  }
}

export default App;
