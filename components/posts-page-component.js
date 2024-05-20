import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, user } from "../index.js";
import { likeHandler } from "./like-component.js";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
export function renderPostsPageComponent({ appEl }) {
  const appHtml = `
    <div class="page-container">
      <div class="header-container"></div> 
        <ul class="posts">${posts
          .map(post => {
            return `
    <li class="post">
      <div class="post-header" data-user-id=${post.user.id}>
        <img src=${post.user.imageUrl} class="post-header__user-image">
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
              post.likes.length > 1 ? `и ещё ${post.likes.length - 1}` : ""
            }</strong></p>
      </div>
      <p class="post-text">
        <span class="user-name">${post.user.name}</span>&emsp;${
              post.description
            }
      </p>
      <p class="post-date">${formatDistanceToNow(new Date(post.createdAt), {
        addSuffix: true,
        locale: ru,
      })}</p>
</li>`;
          })
          .join("")}
        </ul>
    </div>`;
  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  for (let userEl of document.querySelectorAll(".like-button")) {
    userEl.addEventListener("click", () => {
      likeHandler(userEl).then(data => {
        const index = posts.indexOf(
          posts.find(post => post.id === data.post.id)
        );
        posts[index].isLiked = !posts[index].isLiked;
        renderPostsPageComponent({ appEl });
      });
    });
  }
}
