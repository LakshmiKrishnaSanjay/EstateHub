import { jwtDecode } from "jwt-decode";


export const getUserData = () => {
    return sessionStorage.getItem("userData") ? sessionStorage.getItem("userData") : null

}

export const getDecodedData = () => {
    return sessionStorage.getItem("userData") ? jwtDecode(sessionStorage.getItem("userData")) : null
}

