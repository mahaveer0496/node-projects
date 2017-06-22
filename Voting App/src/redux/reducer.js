import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import { FETCHING, COMPLETE_FETCH } from './actions/actionTypes';


const initialState = {
  fetching: false,
  data: ['', [], [], []],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return Object.assign({}, state, { fetching: true });

    case COMPLETE_FETCH:
      return Object.assign({}, state, {
        fetching: false,
        data: action.data,
      });

    default:
      return state;
  }
};

export default createStore(reducer, composeWithDevTools(applyMiddleware(ReduxThunk)));
