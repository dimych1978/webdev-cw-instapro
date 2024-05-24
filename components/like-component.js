import { likeOff, likeOn } from '../api.js';

export const likeHandler = async (element) => {
  element.className = 'like-button-loading';
  return element.querySelector('img').src.includes('not')
    ? likeOn(element.dataset.postId).catch((error) => console.log(error))
    : likeOff(element.dataset.postId).catch((error) => console.log(error));
};
