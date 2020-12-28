import {URL_BASE} from "../utils/constants";


export async function getLastGamesApi(limit) {
  try {
    const limitItems = `_limit=${limit}`;
    const sortItem = "_sort=createdAt:desc";
    const url = `${URL_BASE}/games?${limitItems}&${sortItem}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getGamesPlatformApi(platform, limit, start) {
  try {
    const limitItems = `_limit=${limit}`;
    const sortItem = "_sort=createdAt:desc";
    const startItems = `_start=${start}`
    const url = `${URL_BASE}/games?platform.url=${platform}&${limitItems}&${sortItem}&${startItems}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getTotalGamesPlatformApi(platform) {
  try {
    const url = `${URL_BASE}/games/count?platform.url=${platform}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getGameByUrlApi(path) {
  try {
    const url = `${URL_BASE}/games?url=${path}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}