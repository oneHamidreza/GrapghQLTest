// with this file you can do any changes in the state from hook components
// you can use (set, reset) arrow functions
// or create your custom arrow functions for each model with following the rules
import {models} from './models';

export const set = (model, payload, dispatch) => {
  return dispatch({
    type: `SET_${model.toString().toUpperCase()}`,
    payload: payload,
  });
};
export const reset = (modelName, dispatch) => {
  const model = models.find(x => x.name === modelName).model;
  dispatch({
    type: `RESET_${modelName.toString().toUpperCase()}`,
    payload: model,
  });
  return model;
};

export const setOrder = (payload, dispatch) => {
  return dispatch({
    type: 'SET_ORDER',
    payload: payload,
  });
};
export const resetOrder = dispatch => {
  const model = models.find(x => x.name === 'order').model;
  dispatch({
    type: 'RESET_ORDER',
    payload: model,
  });
  return model;
};

export const setBottomNav = (payload, dispatch) => {
  return dispatch({
    type: 'SET_BOTTOMNAV',
    payload: payload,
  });
};
export const resetBottomNav = dispatch => {
  const model = models.find(x => x.name === 'bottomnav').model;
  dispatch({
    type: 'RESET_BOTTOMNAV',
    payload: model,
  });
  return model;
};
