import { removeEmptyAttributes } from "shared/utils"
import api from "../api"
import QueryString from "qs"


const postShows = async (payload: any) => {
    return api.post(`/Shows`, payload)
}


const getShows = async (activeFilter: any, token: string | null) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Shows`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getShowsById = async (activeFilter: any, token: string | null, id: string) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Shows/${id}`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getShowsBySummary = async (activeFilter: any, token: string | null) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Shows/summary`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getShowsByCount = async (activeFilter: any, token: string | null) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Shows/count`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const patchShows = async(payload: any, id: string, token: string) => {
    return api.patch(`/Shows/${id}`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const deleteShows = async(id: string, token: string) => {
    return api.delete(`/Shows/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export {
    postShows,
    getShows,
    getShowsById,
    getShowsBySummary,
    getShowsByCount,
    patchShows,
    deleteShows
}