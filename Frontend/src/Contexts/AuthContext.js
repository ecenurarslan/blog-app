import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router";
import Service from "../Services";

const Context = React.createContext();
const AuthConsumer = Context.Consumer;

const AuthProvider = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  useEffect(() => {
    Service.User.CheckLogin().then((response) => {
      if (!!response) {
        setAuthorized(true);
      }
    });
  }, []);
  return (
    <Context.Provider
      value={{
        authorized,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const AuthRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ authorized }) => {
      authorized ? (
        <Route render={(props) => <Component {...props} />} {...rest} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      );
    }}
  </AuthConsumer>
);

export { AuthConsumer, AuthProvider, AuthRoute, Context };
