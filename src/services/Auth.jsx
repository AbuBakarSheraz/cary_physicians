import axios from 'axios';

const BASE_URL = 'https://caryphysicians.com/api';
const LOGIN_URL = `${BASE_URL}/login.php`;
const LOGOUT_URL = `${BASE_URL}/logout.php`;
const REFRESH_URL = `${BASE_URL}/refresh_token.php`;
const VERIFY_URL = `${BASE_URL}/validate_token.php`;

// Create an axios instance
const api = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add an interceptor to attach token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
export const login = async (email, password) => {
    try {
        const response = await api.post(LOGIN_URL, { email, password });
        console.log('Login response:', response.data);
        
        if (response.data.token) {
            // Store the token from the server in both accessToken and refreshToken
            localStorage.setItem('accessToken', response.data.token);
            localStorage.setItem('refreshToken', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};;

export const logout = async () => {
    try {
        await api.post(LOGOUT_URL);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return true;
    } catch (error) {
        console.error("Logout error:", error);
        throw error;
    }
};
export const refresh = async () => {
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error("No refresh token available");

        const response = await api.post(REFRESH_URL);
        console.log('Refresh response:', response.data);
        
        if (response.data.new_token) {
            localStorage.setItem('accessToken', response.data.new_token);
            localStorage.setItem('refreshToken', response.data.new_token);
        }
        return response.data;
    } catch (error) {
        console.error("Session refresh error:", error);
        throw error; // Re-throw to allow calling code to handle it
    }
};

// export const verifysession = async () => {
//     try {
//         const token = localStorage.getItem('accessToken'); // Get token from localStorage
//         if (!token) throw new Error("No access token available");

//         const response = await api.get(VERIFY_URL, {
//             headers: {
//                 "Authorization": `Bearer ${token}`
//             }
//         });

//         console.log('Verify session response:', response.data);
//         return response.data.token;
//     } catch (error) {
//         console.error("Session verification error:", error);
//         return { success: false };
//     }
// };

