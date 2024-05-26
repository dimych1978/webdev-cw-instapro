import { user } from './index.js';

const personalKey = 'Dmitrii-Bashkatov';
const baseHost = 'https://webdev-hw-api.vercel.app';
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

export function getPosts({ token }) {
  return fetch(postsHost, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

export function getUserPosts({ token }, id) {
  return fetch(`${postsHost}/user-posts/${id}`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + '/api/user', {
    method: 'POST',
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error('Такой пользователь уже существует');
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch(baseHost + '/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error('Неверный логин или пароль');
    }
    return response.json();
  });
}

export function uploadImage({ file }) {
  const data = new FormData();
  data.append('file', file);

  return fetch(baseHost + '/api/upload/image', {
    method: 'POST',
    body: data,
  }).then((response) => {
    return response.json();
  });
}

export async function onAddPostClick({ description, imageUrl }) {
  try {
    const response = await fetch(postsHost, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ description, imageUrl }),
    });
    if (response.status === 400)
      throw new Error('Добавьте фото и(или) описание к нему');
    return response.json();
  } catch (error) {
    alert(error.message);
  }
}

export const likeOff = async (id) => {
  if (!user) return;
  try {
    const response = await fetch(`${postsHost}/${id}/dislike`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.status === 401)
      throw new Error('Нет авторизации. Войдите под своим аккаунтом');

    const data = await response.json();
    return data;
  } catch (error) {
    alert(error.message);
  }
};

export const likeOn = async (id) => {
  try {
    const response = await fetch(`${postsHost}/${id}/like`, {
      method: 'POST',
      headers: {
        Authorization: `${user && `Bearer ${user.token}`}`,
      },
    });
    if (response.status === 401)
      throw new Error('Нет авторизации. Войдите под своим аккаунтом');

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const onDeletePostClick = async (id) => {
  try {
    const response = await fetch(`${postsHost}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `${user && `Bearer ${user.token}`}`,
      },
    });
    if (response.status === 401)
      throw new Error('Нет авторизации. Войдите под своим аккаунтом');

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
