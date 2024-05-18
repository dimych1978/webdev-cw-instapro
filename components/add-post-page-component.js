import { uploadImage, onAddPostClick } from "../api.js";
import { goToPage } from "../index.js";
import { POSTS_PAGE } from "../routes.js";

export function renderAddPostPageComponent({ appEl }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
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

    const inputFile = document.querySelector(".file-upload-input");
    inputFile.style.opacity = 0;

    const textDescription = document.querySelector(".textarea");

    document.getElementById("add-button").addEventListener("click", () => {
      uploadImage({ file: inputFile.files[0] })
        .then(data =>
          onAddPostClick({
            description: textDescription.value,
            imageUrl: data.fileUrl,
          })
        )
        .then(() => goToPage(POSTS_PAGE));
    });

    inputFile.addEventListener("change", () => {
      const uploadContainer = document.querySelector(".upload-image-container");

      const fileUploadImageContainer = document.createElement("div");
      fileUploadImageContainer.className = "file-upload-image-container";

      const image = document.createElement("img");
      image.className = "file-upload-image";
      image.file = inputFile.files[0];
      image.src = URL.createObjectURL(inputFile.files[0]);

      const buttonRemoveUpload = document.createElement("button");
      buttonRemoveUpload.className = "file-upload-remove-button";
      buttonRemoveUpload.textContent = "Заменить фото";

      // uploadContainer.removeChild(document.querySelector(".upload-image"));
      uploadContainer.appendChild(fileUploadImageContainer);
      fileUploadImageContainer.appendChild(image);
      fileUploadImageContainer.appendChild(buttonRemoveUpload);

      buttonRemoveUpload.addEventListener("click", () => {
        render();
      });
    });
  };

  render();
}
