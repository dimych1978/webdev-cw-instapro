import { renderLoadingPageComponent } from '../components/loading-page-component.js';
import { renderAuthPageComponent } from '../components/auth-page-component.js';
import { renderPostsPageComponent } from '../components/posts-page-component.js';
import { saveUserToLocalStorage } from '../helpers.js';
import {
  ADD_POSTS_PAGE,
  AUTH_PAGE,
  LOADING_PAGE,
  POSTS_PAGE,
  USER_POSTS_PAGE,
} from '../routes.js';
import { page, user, goToPage, handlerUser } from '../index.js';
import { renderAddPostPageComponent } from '../components/add-post-page-component.js';
import { renderUserPageComponent } from '../components/user-page-component.js';

export const renderApp = () => {
  const appEl = document.getElementById('app');
  if (page === LOADING_PAGE) {
    return renderLoadingPageComponent({
      appEl,
      user,
      goToPage,
    });
  }

  if (page === AUTH_PAGE) {
    return renderAuthPageComponent({
      appEl,
      setUser: (newUser) => {
        handlerUser(newUser);
        saveUserToLocalStorage(user);
        goToPage(POSTS_PAGE);
      },
      user,
      goToPage,
    });
  }

  if (page === ADD_POSTS_PAGE) {
    return renderAddPostPageComponent({
      appEl,
      onAddPostClick() {
        goToPage(POSTS_PAGE);
      },
    });
  }

  if (page === POSTS_PAGE) {
    return renderPostsPageComponent({ appEl });
  }

  if (page === USER_POSTS_PAGE) {
    return renderUserPageComponent({ appEl });
  }
};
