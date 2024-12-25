import { removeEmptyAttributes } from "@/shared/utils"
import QueryString from "qs"
import api from "../api"

const getTransactions = async (activeFilter: any, token: string) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Transactions`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getTransactionById = async (activeFilter: any, token: string, id: string) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Transactions/${id}`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getTransactionSummary = async (activeFilter: any, token: string) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Transactions/summary`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getTransactionCount = async (activeFilter: any, token: string) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/Transactions/count`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const postTransaction = async (payload: any, token: string) => {
    return api.post(`/Transactions`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const patchTransaction = async(payload: any, id: string, token: string) => {
    return api.patch(`/Transactions/${id}`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const deleteTransactionById = async(id: string, token: string) => {
    return api.delete(`/Transactions/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default {
    getTransactions,
    getTransactionById,
    getTransactionSummary,
    getTransactionCount,
    postTransaction,
    patchTransaction,
    deleteTransactionById
}