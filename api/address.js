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

export async function deleteAddressApi(idAddress, logout) {
    try {
        const url = `${URL_BASE}/addresses/${idAddress}`;
        const params = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }

        }
        const result = await authFetch(url, params, logout)
        if(result.statusCode === 500) throw 'ERROR'
        return true

    } catch (e) {
        console.log(e)
        return false
    }
}

export async function updateAddressApi(idAddress, address, logout) {
    try {
        const url = `${URL_BASE}/addresses/${idAddress}`;
        const params = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(address)

        }
        const result = await authFetch(url, params, logout)
        return result

    } catch (e) {
        console.log(e)
        return false
    }
}