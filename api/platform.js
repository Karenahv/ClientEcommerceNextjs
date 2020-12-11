import {URL_BASE} from "../utils/constants";


export async function getPlatformsApi() {
    try {
        const url = `${URL_BASE}/platforms?_sort=position:asc`;
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (e) {
        console.log(e)
        return null
    }
}