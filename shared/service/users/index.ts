import { removeEmptyAttributes } from "shared/utils"
import QueryString from "qs"
import api from "../api"

const getUsers = async (activeFilter: any, token: string) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Users`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getUserById = async (activeFilter: any, token: string, id: string) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Users/${id}`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getUserBySummary = async (activeFilter: any, token: string) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Users/summary`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getUserByCount = async (activeFilter: any, token: string) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Users/count`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const postUser = async (payload: any, token: string) => {
    return api.post(`/Users`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const patchUser = async(payload: any, id: string, token: string) => {
    return api.patch(`/Users/${id}`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const deleteUserById = async(id: string, token: string) => {
    return api.delete(`/Users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export default {
    getUsers,
    getUserById,
    getUserBySummary,
    getUserByCount,
    postUser,
    patchUser,
    deleteUserById
}