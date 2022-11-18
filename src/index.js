import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';



const API_KEY = '31365930-c15782909a5a0e3024bcedf9d';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 40;
let page = 1;
let searchQuery = ''
// function fetchImages (searchQuery, page) {
//   return fetch(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&page=${page}&per_page=${PER_PAGE}&image_type=photo&orientation=horizontal&safesearch=true~`).then(response => {return response.json()});
// }


async function fetchImages(searchQuery, page) {
  try {
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&page=${page}&per_page=${PER_PAGE}&image_type=photo&orientation=horizontal&safesearch=true~`);
       return response.data;
  } catch (error) {
    console.error(error);
  }
}

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more')
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();
  page = 1;
      refs.gallery.innerHTML = "";
  searchQuery = event.currentTarget.elements.searchQuery.value;
  fetchImages (searchQuery, page).then((result) => {
     if (result.totalHits == 0) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    return;
  }
    renderMarkup(result.hits);
    Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images`);
    
    refs.loadMoreBtn.classList.remove ("visually-hidden");
  }
    ).catch(searchQuery => {console.log(searchQuery);
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")});
}


function onLoadMore (event) {
  page += 1;
 
    fetchImages (searchQuery, page).then((result) => {
      if (page > ((result.totalHits / 40) + 1)){
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        refs.loadMoreBtn.classList.add ("visually-hidden")

        return;
      }
    renderMarkup(result.hits);
    
    
  }).catch(error => console.log(error));
}


function renderMarkup (images) {
  const newMarkup = images.map(image => { return  `<div class="photo-card">
  <img class="image" src="${image.largeImageURL}" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b></br>${image.likes}
    </p>
    <p class="info-item">
      <b>Views</b></br>${image.views}
    </p>
    <p class="info-item">
      <b>Comments</b></br>${image.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b></br>${image.downloads}
    </p>
  </div>
</div>` }).join("");
refs.gallery.insertAdjacentHTML("beforeend", newMarkup);

}
