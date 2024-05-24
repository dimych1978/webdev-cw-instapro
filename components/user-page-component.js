import { renderHeaderComponent } from './header-component.js';
import { posts } from '../index.js';
import { likeHandler } from './like-component.js';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { sanitize } from '../sanitize.js';
import { renderApp } from '../render/render.js';
export function renderUserPageComponent({ appEl }, newLike) {
  const appHtml = `
    <div class="page-container">
      <div class="header-container"></div> 
        <ul class="posts">${posts
          .map((post) => {
            return `
            <li class="post">
            <div class="post-header" data-user-id=${post.user.id}>
              <img src=${post.user.imageUrl} class="post-header__user-image"/>
              <p class="post-header__user-name">${sanitize(post.user.name)}</p>
            </div>
            <div class="post-image-container">
              <img class="post-image" src=${post.imageUrl}>
            </div>
            <div class="post-likes">
              <button data-post-id=${post.id} class="like-button">
              <img ${
                newLike?.post.id === post.id
                  ? newLike.post.isLiked
                    ? 'src = "./assets/images/like-active.svg"'
                    : 'src = "./assets/images/like-not-active.svg"'
                  : post.isLiked
                    ? 'src = "./assets/images/like-active.svg"'
                    : 'src = "./assets/images/like-not-active.svg"'
              }>
              </button>
              <p class="post-likes-text">Нравится: 
                <strong>
              ${
                newLike?.post.id === post.id
                  ? `${newLike.post.likes.length && sanitize(newLike.post.likes[0].name)} 
                    ${
                      newLike.post.likes.length > 1
                        ? `и ещё ${newLike.post.likes.length - 1}`
                        : ''
                    }`
                  : `${post.likes.length && sanitize(post.likes[0].name)} 
                  ${
                    post.likes.length > 1
                      ? `и ещё ${post.likes.length - 1}`
                      : ''
                  }`
              }
                  </strong>
              </p>
            </div>
            <p class="post-text">
              <span class="user-name">${sanitize(post.user.name)}</span>&emsp;${sanitize(post.description)}
            </p>
            <p class="post-date">${formatDistanceToNow(
              new Date(post.createdAt),
              {
                addSuffix: true,
                locale: ru,
              },
            )}
            </p>
          </li>`;
          })
          .join('')}
        </ul>
    </div>`;
  appEl.innerHTML = appHtml;

  const setError = (message, element) => {
    element.closest('.post').querySelector('.form-error').textContent = message;
    setTimeout(() => {
      element.closest('.post').querySelector('.form-error').textContent = '';
    }, 5000);
  };

  renderHeaderComponent({
    element: document.querySelector('.header-container'),
  });

  for (let userEl of document.querySelectorAll('.like-button')) {
    userEl.addEventListener('click', () => {
      likeHandler(userEl)
        .then((data) => {
          console.log(data);
          if (data.message?.includes('Нет авторизации'))
            throw new Error(data.message);
          renderApp(data);
        })
        .catch((error) => {
          userEl.className = 'like-button';
          setError(error.message, userEl);
        });
    });
  }
}
