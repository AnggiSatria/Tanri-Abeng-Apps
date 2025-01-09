import { removeEmptyAttributes } from "shared/utils"
import QueryString from "qs"
import api from "../api"

const getRecommendations = async (activeFilter: any, token: string) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Recommendations`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getRecommendationById = async (activeFilter: any, token: string, id: string) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Recommendations/${id}`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getRecommendationBySummary = async (activeFilter: any, token: string) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Recommendations/summary`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getRecommendationByCount = async (activeFilter: any, token: string) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Recommendations/count`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const postRecommendation = async (payload: any, token: string) => {
    return api.post(`/Recommendations`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const patchRecommendation = async(payload: any, id: string, token: string) => {
    return api.patch(`/Recommendations/${id}`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const deleteRecommendationById = async(id: string, token: string) => {
    return api.delete(`/Recommendations/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export {
    getRecommendations,
    getRecommendationById,
    getRecommendationBySummary,
    getRecommendationByCount,
    postRecommendation,
    patchRecommendation,
    deleteRecommendationById
}