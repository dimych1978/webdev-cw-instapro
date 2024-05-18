import { getPosts } from "./api.js";
import {
  ADD_POSTS_PAGE,
  AUTH_PAGE,
  LOADING_PAGE,
  POSTS_PAGE,
  USER_POSTS_PAGE,
} from "./routes.js";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "./helpers.js";
import { renderApp } from "./render/render.js";

export let user = getUserFromLocalStorage();
export const handlerUser = newUser => {
  user = newUser;
};

export let page = null;
export let posts = [];
export let userPosts = [];

const getToken = () => {
  const token = user ? `Bearer ${user.token}` : undefined;
  return token;
};

export const logout = () => {
  user = null;
  removeUserFromLocalStorage();
  goToPage(POSTS_PAGE);
};

/**
 * Включает страницу приложения
 */
export const goToPage = (newPage, data) => {
  console.log(newPage);
  if (
    [
      POSTS_PAGE,
      AUTH_PAGE,
      ADD_POSTS_PAGE,
      USER_POSTS_PAGE,
      LOADING_PAGE,
    ].includes(newPage)
  ) {
    if (newPage === ADD_POSTS_PAGE) {
      // Если пользователь не авторизован, то отправляем его на авторизацию перед добавлением поста
      page = user ? ADD_POSTS_PAGE : AUTH_PAGE;
      return renderApp();
    }

    if (newPage === POSTS_PAGE) {
      page = LOADING_PAGE;
      renderApp();

      return getPosts()
        .then(newPosts => {
          page = POSTS_PAGE;
          posts = newPosts;
          console.log(posts);
          renderApp();
        })
        .catch(error => {
          console.error(error);
          goToPage(POSTS_PAGE);
        });
    }

    if (newPage === USER_POSTS_PAGE) {
      page = USER_POSTS_PAGE;
      posts = posts.filter(post => post.user.id === data.userId);
      return renderApp();
    }

    page = newPage;
    renderApp();

    return;
  }

  throw new Error("страницы не существует");
};

goToPage(POSTS_PAGE);
