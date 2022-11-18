const API_KEY = '31365930-c15782909a5a0e3024bcedf9d';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 40;


function fetchImages (searchQuery) {
  return fetch(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&page=${page}&per_page=${PER_PAGE}&image_type=photo&orientation=horizontal&safesearch=true~`).then(response => {return response.json()});
}


export default { fetchImages };
