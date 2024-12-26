import { removeEmptyAttributes } from "shared/utils"
import QueryString from "qs"
import api from "../api"

const getProviders = async (activeFilter: any, token: string) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Providers`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getProviderById = async (activeFilter: any, token: string, id: string) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Providers/${id}`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getProviderBySummary = async (activeFilter: any, token: string) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Providers/summary`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getProviderByCount = async (activeFilter: any, token: string) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Providers/count`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const postProvider = async (payload: any, token: string) => {
    return api.post(`/Providers`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const patchProvider = async(payload: any, id: string, token: string) => {
    return api.patch(`/Providers/${id}`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const deleteProviderById = async(id: string, token: string) => {
    return api.delete(`/Providers/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default {
    getProviders,
    getProviderById,
    getProviderBySummary,
    getProviderByCount,
    postProvider,
    patchProvider,
    deleteProviderById
}