import {URL_BASE} from "../utils/constants";
import {authFetch} from "../utils/fetch";


export async function isFavoriteApi(idUser, idGame, logout) {
    try {
        const url = `${URL_BASE}/favorites?users_permissions_user=${idUser}&game=${idGame}`
        return await authFetch(url, null, logout)

    } catch (e) {
        console.log(e)
        return null
    }

}

export async function addFavoriteApi(idUser, idGame, logout) {
    try {
        const dataFound = await isFavoriteApi(idUser, idGame, logout)
        if (dataFound.length > 0 || !dataFound) {
            return 'Este juego ya está en tu lista de favoritos'
        } else {
            const url = `${URL_BASE}/favorites`
            const params = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    users_permissions_user: idUser,
                    game: idGame,

                })
            }
            const result = await authFetch(url, params, logout)
            return result
        }

    } catch (e) {
        console.log(e)
        return null

    }

}

export async function deleteFavoriteApi(idUser, idGame, logout) {
    try {
        const dataFound = await isFavoriteApi(idUser, idGame, logout)
        if (dataFound.length > 0) {
            const url = `${URL_BASE}/favorites/${dataFound[0]?.id}`;
            const params = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }

            }
            const result = await authFetch(url, params, logout)
            return result
        }


    } catch (e) {
        console.log(e)
        return null
    }
}

export async function getFavoriteApi(idUser, logout) {
    try {
        const url = `${URL_BASE}/favorites?users_permissions_user=${idUser}`
        return await authFetch(url, null, logout)

    } catch (e) {
        console.log(e)
        return null
    }

}