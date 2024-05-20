import { user } from "./index.js";

const personalKey = "Dmitrii-Bashkatov";
const baseHost = "https://webdev-hw-api.vercel.app";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

export function getPosts({ token }) {
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data.posts;
    });
}

export function getUserPosts({ token }, id) {
  return fetch(`${postsHost}/user-posts/${id}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data.posts;
    });
}

export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then(response => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then(response => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);
  console.log(data, file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then(response => {
    return response.json();
  });
}

export async function onAddPostClick({ description, imageUrl }) {
  const response = await fetch(postsHost, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({ description, imageUrl }),
  });
  return response.json();
}

export const likeOff = async id => {
  if (!user) return;
  const response = await fetch(`${postsHost}/${id}/dislike`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
};

export const likeOn = async id => {
  console.log(user);
  if (!user) return;
  const response = await fetch(`${postsHost}/${id}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
};

export const onDeletePostClick = async () => {};
