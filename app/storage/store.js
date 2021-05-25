import React from 'react';
import {models} from './models';
import {reducers} from './reducers';

export const Store = React.createContext();

const initialState = getModels();

function getModels() {
  const state = {};
  const modelKeys = models.map(x => x.name);
  modelKeys.forEach(el => {
    const item = models.find(x => x.name === el);
    state[el] = item.model;
  });
  return state;
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducers, initialState);
  const value = {state, dispatch};
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
