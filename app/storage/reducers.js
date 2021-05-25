import {models} from './models';

//reducer calling by useReducer when we need to manipulate our state
//you don't need to do any changes in this file 'everything works dynamically'
export function reducers(state, action) {
  const [operations, model] = action.type.toString().split('_');
  switch (operations) {
    case 'SET':
      return getState('set', model.toLowerCase(), action, state);
    case 'RESET':
      return getState('reset', model.toLowerCase(), action, state);
    default:
      return state;
  }
}

function getState(operations, modelName, action, state) {
  const item = models.find(x => x.name === modelName);
  const body = {};
  if (operations === 'set') {
    const fields = Object.keys(item.model);
    fields.forEach(field => {
      body[field] =
          action.payload[field] === undefined
              ? state[modelName][field]
              : action.payload[field];
    });
  }
  const model = {
    ...state,
    [modelName]: operations === 'set' ? body : item.model,
  };
  return model;
}
