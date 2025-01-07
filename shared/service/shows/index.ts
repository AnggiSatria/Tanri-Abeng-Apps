import { removeEmptyAttributes } from "shared/utils"
import api from "../api"
import QueryString from "qs"


const postShows = async (payload: any) => {
    return api.post(`/Shows`, payload)
}


const getUserInfo = async (activeFilter: any, token: string | null) => {
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

export {
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