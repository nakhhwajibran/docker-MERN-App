import axios from 'axios';
import { FETCH_USER, FETCH_BLOGS, FETCH_BLOG } from './types';
const REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

export const fetchUser = () => async dispatch => {
  const res = await axios.get(REACT_APP_API_URL+'/api/current_user').then(response => {
    console.log(response.data);
  }).catch(error => {
    console.error('Error fetching data:', error);
  });

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post(REACT_APP_API_URL+'/api/stripe', token).then(response => {
    console.log(response.data);
  }).catch(error => {
    console.error('Error fetching data:', error);
  });

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitBlog = (values, history) => async dispatch => {
  const res = await axios.post(REACT_APP_API_URL+'/api/blogs', values).then(response => {
    console.log(response.data);
  }).catch(error => {
    console.error('Error fetching data:', error);
  });
  history.push('/blogs');
  dispatch({ type: FETCH_BLOG, payload: res.data });
};

export const fetchBlogs = () => async dispatch => {
  const res = await axios.get(REACT_APP_API_URL+'/api/blogs').then(response => {
    console.log(response.data);
  }).catch(error => {
    console.error('Error fetching data:', error);
  });

  dispatch({ type: FETCH_BLOGS, payload: res.data });
};

export const fetchBlog = id => async dispatch => {
  const res = await axios.get(REACT_APP_API_URL+`/api/blogs/${id}`).then(response => {
    console.log(response.data);
  }).catch(error => {
    console.error('Error fetching data:', error);
  });

  dispatch({ type: FETCH_BLOG, payload: res.data });
};
