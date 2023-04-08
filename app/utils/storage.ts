import { nth } from 'ramda';

/**
 * CONVENTION: Yêu cầu 
    1. Comment rõ tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
    2. Polyfill, browser security
 */

let checked = false;
const storageAvailable = () => {
  if (!checked) {
    checked = true;
    const item = '@localStorageCheck';
    try {
      window.localStorage.setItem(item, item);
      window.localStorage.removeItem(item);
      return true;
    } catch {
      return false;
    }
  }
};

const memoryStorage = new Map<string, string>();
const createStorage = (): Storage => {
  if (storageAvailable()) {
    return window.localStorage;
  } else {
    return {
      getItem: key => {
        return memoryStorage.get(key) ?? null;
      },
      setItem: (key, value) => {
        memoryStorage.set(key, value);
      },
      removeItem: key => {
        memoryStorage.delete(key);
      },
      clear: () => {
        memoryStorage.clear();
      },
      key: index => {
        const key_ = nth(index, Array.from(memoryStorage.keys()));
        return key_ ? memoryStorage.get(key_) ?? null : null;
      },
      length: 0,
    };
  }
};

export const storage = createStorage();
