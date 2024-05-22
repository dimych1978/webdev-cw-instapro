import { uploadImage, onAddPostClick } from "../api.js";
import { goToPage } from "../index.js";
import { POSTS_PAGE } from "../routes.js";
import { sanitize } from "../sanitize.js";
import { renderUploadImageComponent } from "./upload-image-component.js";
export function renderAddPostPageComponent({ appEl }) {
  let imageUrl = "";

  const render = () => {
    const appHtml = `
      <div class="form">
        <h3 class="form-title">Добавить пост</h3>
        <div class="form-inputs">
          <div class="upload-image-container">
            <div class="upload-image">
              <label class="file-upload-label secondary-button">
                <input type="file" class="file-upload-input" style="display: none">Выберите фото
              </label>
            </div>
          </div>
          <label>Опишите фотографию:
            <textarea class="input textarea" rows="4"></textarea>
          </label>
          <button class="button" id="add-button">Добавить</button>
        </div>
      </div>`;
    appEl.innerHTML = appHtml;

    const textDescription = document.querySelector(".textarea");
    const userFields = appEl.querySelector(".form-inputs").children;

    Array.from(userFields).forEach(el => {
      el.addEventListener("change", () => {
        el.setAttribute("required", "none");
        el.setAttribute("style", "border: none");
      });
    });

    renderUploadImageComponent({
      element: appEl.querySelector(".upload-image-container"),
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      },
    });

    document.getElementById("add-button").addEventListener("click", () => {
      if (!textDescription.value.match(/\S/)) {
        textDescription.textContent = textDescription.value;
        textDescription.setAttribute("required", "required");
        alert("Заполните обязательные поля");
        return;
      }

      if (!imageUrl) {
        userFields[0].setAttribute("style", "border: 3px solid red");
        alert("Добавьте фотографию");
        return;
      }

      onAddPostClick({
        description: sanitize(textDescription.value),
        imageUrl: imageUrl,
      }).then(() => goToPage(POSTS_PAGE));
    });
  };

  render();
}
