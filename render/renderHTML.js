import { posts } from '../index.js';

export const renderHTML = () => {
  `
<div class="page-container">
  <div class="header-container"></div> 
    <ul class="posts">${posts
      .map((post) => {
        return `
<li class="post">
  <div class="post-header" data-user-id=${post.user.id}>
    <img src=${post.user.imageUrl}class="post-header__user-image">
    <p class="post-header__user-name">${post.user.name}</p>
  </div>
  <div class="post-image-container">
    <img class="post-image" src=${post.imageUrl}>
  </div>
  <div class="post-likes">
    <button data-post-id=${post.id} class="like-button">
    <img ${
      post.isLiked
        ? 'src = "./assets/images/like-active.svg"'
        : 'src = "./assets/images/like-not-active.svg"'
    }>
    </button>
    <p class="post-likes-text">Нравится: <strong>${
      post.likes.length && post.likes[0].name
    } ${
      post.likes.length > 1 ? `и ещё ${post.likes.length - 1}` : ''
    }</strong></p>
  </div>
  <p class="post-text">
    <span class="user-name">${post.user.name}</span>&emsp;${post.description}
  </p>
  <p class="post-date">${post.createdAt}</p>
</li>`;
      })
      .join('')}
    </ul>
</div>`;
};
