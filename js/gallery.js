import images from '../gallery-items.js';

// Посилання
const refs = {
  gallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  modalOverlay: document.querySelector('.lightbox__overlay'),
  modalImage: document.querySelector('.lightbox__image'),
  modalCloseBtn: document.querySelector('button[data-action="close-lightbox"]'),
};

const galleryElementMarkup = createImagesCollection(images);

// 1. Створює розмітку по масиву даних і наданому шаблону.
function createImagesCollection(obj) {
  return obj
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
            <a
            class="gallery__link"
            href="${original}"
            >
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </li>`;
    })
    .join('');
}
// 1.1. Рендерить розмітку.
refs.gallery.insertAdjacentHTML('beforeend', galleryElementMarkup);

// 2. Реалізація делегування на галереї ul.js-gallery і отримання url великого зображення.
refs.gallery.addEventListener('click', onImageClick);

// 3. Модальне вікно. Відкриття при кліку на зображення.
function onImageClick(e) {
  if (!e.target.classList.contains('gallery__image')) {
    return;
  }

  // забороняє дію браузера по замовчуванню
  e.preventDefault();

  onModalOpen();

  // 4. Підміна значення атрибута src елемента img.lightbox__image.
  replaceAttribute(e);
}

// 5. Закриття модального вікна при натисканні на кнопку button[data - action= "close-modal"].
refs.modalCloseBtn.addEventListener('click', onCloseBtnClick);

// 7. Додатково. Закриття модального вікна при натисканні на div.lightbox__overlay.
refs.modalOverlay.addEventListener('click', onOverlayClick);

function onModalOpen() {
  refs.modal.classList.add('is-open');
  // 8. Додатково. Закриття модального вікна після натискання клавіші ESC.
  window.addEventListener('keydown', onEscBtnPress);
  window.addEventListener('keydown', onPressPrev);
  window.addEventListener('keydown', onPressNext);
}

function onPressPrev(params) {}
function onPressNext(params) {}

function onModalClose() {
  refs.modal.classList.remove('is-open');
  window.removeEventListener('keydown', onEscBtnPress);

  // 6. Очищення значення атрибута src елемента img.lightbox__image.
  refs.modalImage.src = '';
  refs.modalImage.alt = '';
}

function onCloseBtnClick() {
  onModalClose();
}

function replaceAttribute(ref) {
  refs.modalImage.src = ref.target.dataset.source;
  refs.modalImage.alt = ref.target.alt;
}

function onOverlayClick(e) {
  if (e.currentTarget === e.target) {
    onModalClose();
  }
}

function onEscBtnPress(e) {
  if (e.code === 'Escape') {
    onModalClose();
  }
}
// 9. Додатково. Перегортування зображень галереї у відкритому модальному вікні клавішами "вліво"   і "вправо".
