import { useCookies } from "react-cookie";

const addAuthHeaders = () => {
    const [cookies, setCookies] = useCookies(['accessToken']);
    const accessToken = cookies.accessToken;
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }
    return headers;
}

export default addAuthHeaders;