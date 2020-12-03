import {URL_BASE} from "../utils/constants";
import {authFetch} from "../utils/fetch";

export async function getAddressApi(idUser, logout) {
    try {
        const url = `${URL_BASE}/addresses?users_permissions_user=${idUser}`;
        const result = await authFetch(url, null, logout)
        if(result.statusCode=== 500) throw 'ERROR'
        return result ? result:null

    } catch (e) {
        console.log(e)
        return null
    }
}