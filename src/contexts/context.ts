import React from "react";

const context: React.Context<any> = React.createContext({});

export const ContextProvider: any = context.Provider;
export const ContextConsumer: any = context.Consumer;
export default context;
