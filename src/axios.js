import axios from 'axios'

// baseURL for movies

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});


export default instance;