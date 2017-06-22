import fetchJsonp from 'fetch-jsonp';
import {
  FETCHING,
  COMPLETE_FETCH
} from './actionTypes';

export const fetching = () => ({
  type: FETCHING,
});

export const completeFetch = data => ({
  type: COMPLETE_FETCH,
  data,
});

export const fetchData = (searchText) => (dispatch, getState) => {
  dispatch(fetching());
  fetchJsonp(`https://en.wikipedia.org/w/api.php?action=opensearch&limit=24&format=json&search=${searchText}&callback=?`).then((res) => {
    // console.log(res);
    res.json().then((data) => {
      dispatch(completeFetch(data));
    });
  });
};