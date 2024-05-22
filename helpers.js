export function saveUserToLocalStorage(user) {
  window.localStorage.setItem('user', JSON.stringify(user));
}

export function getUserFromLocalStorage() {
  try {
    return JSON.parse(window.localStorage.getItem('user'));
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function removeUserFromLocalStorage() {
  window.localStorage.removeItem('user');
}
