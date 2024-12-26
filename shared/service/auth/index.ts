import { removeEmptyAttributes } from "shared/utils"
import api from "../api"
import QueryString from "qs"


const postLogin = async (payload: any, token: string) => {
    return api.post(`/auth/login`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const postRegister = async (payload: any, token: string) => {
    return api.post(`/auth/register`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const postLogout = async (payload: any, token: string) => {
    return api.post(`/auth/logout`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const postVerifyToken = async (payload: any, token: string) => {
    return api.post(`/auth/verify-token`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const postChangePassword = async (payload: any, token: string) => {
    return api.post(`/auth/change-password`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const postForgetPassword = async (payload: any, token: string) => {
    return api.post(`/auth/forget-password`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const postResetPassword = async (payload: any, token: string) => {
    return api.post(`/auth/reset-password/${token}`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getUserInfo = async (activeFilter: any, token: string) => {
    const queryString = QueryString.parse(
        removeEmptyAttributes(activeFilter || "")
    )
    return api.get(`/auth/user`, {
        params: { ...queryString },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const patchUserInfo = async(payload: any, id: string, token: string) => {
    return api.patch(`/auth/user`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default {
    postLogin,
    postRegister,
    postLogout,
    postVerifyToken,
    postChangePassword,
    postForgetPassword,
    postResetPassword,
    getUserInfo,
    patchUserInfo
}