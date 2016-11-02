import {createStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../setup';

export default function configureStore(initialState) {
  const api = 'https://api-stowedge.herokuapp.com/';
  const middewares = [
    thunkMiddleware.withExtraArgument(api)
  ];

  return createStore(rootReducer, initialState, compose(
    applyMiddleware(...middewares)
    )
  );
}
