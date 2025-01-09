import { removeEmptyAttributes } from "shared/utils"
import api from "../api"
import QueryString from "qs"


const postSystems = async (payload: any) => {
    return api.post(`/Systems`, payload)
}

const getSystems = async (activeFilter: any, token: string | null) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Systems`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getSystemsById = async (activeFilter: any, token: string | null, id: string) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Systems/${id}`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getSystemsBySummary = async (activeFilter: any, token: string | null) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Systems/summary`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getSystemsByCount = async (activeFilter: any, token: string | null) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Systems/count`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const patchSystems = async(payload: any, id: string, token: string) => {
    return api.patch(`/Systems/${id}`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const deleteSystems = async(id: string, token: string) => {
    return api.delete(`/Systems/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export {
    postSystems,
    getSystems,
    getSystemsById,
    getSystemsBySummary,
    getSystemsByCount,
    patchSystems,
    deleteSystems
}