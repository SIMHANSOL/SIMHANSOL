import React from "react";

const prefix: React.Context<any> = React.createContext({});
export const PrefixProvider: any = prefix.Provider;
export const PrefixConsumer: any = prefix.Consumer;

const selectPage: React.Context<any> = React.createContext({});
export const SelectPageProvider: any = selectPage.Provider;
export const SelectPageConsumer: any = selectPage.Consumer;

export { prefix, selectPage };
