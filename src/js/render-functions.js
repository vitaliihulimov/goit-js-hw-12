import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('#load-more');
const loader = document.querySelector('#loader');
let lightbox = new SimpleLightbox('.gallery a', {
  captionData: 'alt',
  captionDelay: 250,
});

export function createGalleryMarkup(images) {
  return images
    .map(
      img => `
                <li class="gallery-item">
            <a href="${img.largeImageURL}">
                <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy"/>
            </a>
            <div class="info">
                <p><b>Likes:</b> ${img.likes}</p>
                <p><b>Views:</b> ${img.views}</p>
                <p><b>Comments:</b> ${img.comments}</p>
                <p><b>Downloads:</b> ${img.downloads}</p>
            </div>
        </li>`
    )
    .join('');
}
export function renderGallery(images) {
  if (!images || images.length === 0) {
    iziToast.warning({
      title: 'Oops',
      message: 'No images found',
      position: 'topRight',
    });
    return;
  }
  gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(images));
  lightbox.refresh();
}
export function clearGallery() {
  gallery.innerHTML = '';
}
export function toggleLoadMoreButton(visible) {
  loadMoreBtn.style.display = visible ? 'block' : 'none';
}
export function smoothScroll() {
  const { height } = gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({ top: height * 2, behavior: 'smooth' });
}
export function showLoader() {
  loader.style.display = 'block';
}
export function hideLoader() {
  loader.style.display = 'none';
}
