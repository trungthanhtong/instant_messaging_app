import React from "react";
import { Redirect, Route } from "react-router-dom";
import Auth from "../Authentication/Authentication";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                const { pathname } = props.location;
                if (Auth.isAuthenticated()) {
                    if (pathname === "/login" || pathname === "/") {
                        return (
                            <Redirect
                                to={{
                                    pathname: "/home",
                                    state: {
                                        from: props.location,
                                    },
                                }}
                            />
                        );
                    } else {
                        return <Component {...props} />;
                    }
                } else {
                    if (pathname === "/login" || pathname === "/") {
                        return <Component {...props} />;
                    } else {
                        return (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: {
                                        from: props.location,
                                    },
                                }}
                            />
                        );
                    }
                }
            }}
        />
    );
};
