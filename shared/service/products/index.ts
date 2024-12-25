import { removeEmptyAttributes } from "@/shared/utils"
import QueryString from "qs"
import api from "../api"

const getProducts = async (activeFilter: any, token: string) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Products`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getProductById = async (activeFilter: any, token: string, id: string) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Products/${id}`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getProductBySummary = async (activeFilter: any, token: string) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Products/summary`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getProductByCount = async (activeFilter: any, token: string) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Products/count`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const postProduct = async (payload: any, token: string) => {
    return api.post(`/Products`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const patchProduct = async(payload: any, id: string, token: string) => {
    return api.patch(`/Products/${id}`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const deleteProductById = async(id: string, token: string) => {
    return api.delete(`/Products/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default {
    getProducts,
    getProductById,
    getProductBySummary,
    getProductByCount,
    postProduct,
    patchProduct,
    deleteProductById
}