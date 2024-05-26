import { loginUser, registerUser } from '../api.js';
import { sanitize } from '../sanitize.js';
import { renderHeaderComponent } from './header-component.js';
import { renderUploadImageComponent } from './upload-image-component.js';

export function renderAuthPageComponent({ appEl, setUser }) {
  let isLoginMode = true;
  let imageUrl = '';

  const renderForm = () => {
    const appHtml = `
      <div class="page-container">
          <div class="header-container"></div>
          <div class="form">
              <h3 class="form-title">
                ${
                  isLoginMode
                    ? 'Вход в&nbsp;Instapro'
                    : 'Регистрация в&nbsp;Instapro'
                }
                </h3>
              <div class="form-inputs">
    
                  ${
                    !isLoginMode
                      ? `
                      <div class="upload-image-container"></div>
                      <input type="text" id="name-input" class="input" placeholder="Имя" />
                      `
                      : ''
                  }
                  
                  <input type="text" id="login-input" class="input" placeholder="Логин" />
                  <input type="password" id="password-input" class="input" placeholder="Пароль" />
                  
                  <div class="form-error"></div>
                  
                  <button class="button" id="login-button">${
                    isLoginMode ? 'Войти' : 'Зарегистрироваться'
                  }</button>
              </div>
            
              <div class="form-footer">
                <p class="form-footer-title">
                  ${isLoginMode ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
                  <button class="link-button" id="toggle-button">
                    ${isLoginMode ? 'Зарегистрироваться.' : 'Войти.'}
                  </button>
                </p> 
               
              </div>
          </div>
      </div>    
`;

    appEl.innerHTML = appHtml;

    const userFields = appEl.querySelector('.form-inputs').children;

    Array.from(userFields).forEach((el) => {
      el.addEventListener('change', () => {
        el.setAttribute('required', 'none');
        el.setAttribute('style', 'border: none');
      });
    });

    const setError = (message) => {
      appEl.querySelector('.form-error').textContent = message;
    };

    renderHeaderComponent({
      element: document.querySelector('.header-container'),
    });

    const uploadImageContainer = appEl.querySelector('.upload-image-container');

    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector('.upload-image-container'),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }

    document.getElementById('login-button').addEventListener('click', () => {
      setError('');

      if (isLoginMode) {
        const login = appEl.querySelector('#login-input').value;
        const password = appEl.querySelector('#password-input').value;

        if (!login.match(/\S/) || !password.match(/\S/)) {
          Array.from(userFields).forEach((el) => {
            el.setAttribute('required', 'required');
          });
          alert('Заполните обязательные поля');
          return;
        }
        loginUser({
          login: sanitize(login),
          password: password,
        })
          .then((user) => {
            setUser(user.user);
          })
          .catch((error) => {
            console.warn(error);
            setError(error.message);
          });
      } else {
        const login = document.getElementById('login-input').value;
        const name = document.getElementById('name-input').value;
        const password = document.getElementById('password-input').value;
        if (!login.match(/\S/) || !password.match(/\S/) || !name.match(/\S/)) {
          Array.from(userFields).forEach((el) => {
            el.setAttribute('required', 'required');
          });
          alert('Заполните обязательные поля');
          return;
        }
        if (!imageUrl) {
          userFields[0].setAttribute('style', 'border: 3px solid red');
          alert('Добавьте фотографию');
          return;
        }

        registerUser({
          login: sanitize(login),
          password: password,
          name: sanitize(name),
          imageUrl,
        })
          .then((user) => {
            setUser(user.user);
          })
          .catch((error) => {
            console.warn(error);
            setError(error.message);
          });
      }
    });

    document.getElementById('toggle-button').addEventListener('click', () => {
      isLoginMode = !isLoginMode;
      renderForm();
    });
  };

  renderForm();
}
