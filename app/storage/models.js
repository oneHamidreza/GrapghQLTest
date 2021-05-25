//create your model with below structure
// {
//   name:'your-model-name', // do not use uppercase for model name
//   model: {
//     // ...your model object
//   }
// }

export const models = [
  {
    name: 'order',
    model: {
      status: 'empty', // empty, new
      mobile: '',
      price: '',
    },
  },
  {
    name: 'bottomnav',
    model: {
      index: 0,
      params: null,
    },
  },
];
