// 1. Імпортувати зображення з файлу. Вивід на сторінку по шаблону
import images from '../gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
};

const galleryElementMarkup = createImagesCollection(images);

// створює картку зображення по шаблону
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
// додає розмітку в html
refs.gallery.insertAdjacentHTML('beforeend', galleryElementMarkup);

// 2. Реалізація делегування на галереї ul.js-gallery і отримання url великого зображення.
// 3. Модальне вікно. Відкриття при кліку на зображення.
// 4. Підміна значення атрибута src елемента img.lightbox__image.
// 5. Закриття модального вікна при натисканні на кнопку button[data - action= "close-modal"].
// 6. Очищення значення атрибута src елемента img.lightbox__image.Це необхідно   для того, щоб при наступному відкритті модального вікна, поки вантажиться   зображення, ми не бачили попереднє.

// Додатково
// 7. Закриття модального вікна при натисканні на div.lightbox__overlay.
// 8. Закриття модального вікна після натискання клавіші ESC.
// 9. Перегортування зображень галереї у відкритому модальному вікні клавішами "вліво"   і "вправо".
