import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getCookie, setCookie, deleteCookie} from './../utils/CookieUtils';
import {getAccessToken} from "../api/API";

export const login = createAsyncThunk('auth/login', async (credentials) => {
    return await getAccessToken(credentials);
});

const token = getCookie('accessToken');
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: token,
        isAuthenticated: !!token,
    },
    reducers: {
        async login(state, {payload: {email, password}}) {
            const result = await getAccessToken({email, password});
            if (result.authToken) {
                setCookie('accessToken', result.authToken, 365);
                state.isAuthenticated = true;
                state.token = result.authToken;
            }
        },
        logout(state) {
            deleteCookie('accessToken');
            state.isAuthenticated = false;
            state.token = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {

            })
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload.authToken) {
                    state.token = action.payload.authToken;
                    state.isAuthenticated = !!state.token;
                    setCookie('accessToken', state.token, 365);
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.token = false;
                state.isAuthenticated = false;
            });
    },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;