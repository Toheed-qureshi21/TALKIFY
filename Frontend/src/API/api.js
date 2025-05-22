import axios from 'axios';
import toast from 'react-hot-toast';
import { authFailure, authStart, authSuccess, resetAuth } from '../slices/authSlice';
import { getChats, getUsers, getUsersFailure, sendChats, setLoadingStates, setSelectedUser } from '../slices/chatSlice';

const API = `${import.meta.env.VITE_SERVER_URL}/api` 

const api = axios.create({
    baseURL: API,
    withCredentials: true,
});

export const signup = async (formData, dispatch) => {
    dispatch(authStart());
    try {
        const { data } = await api.post('/user/signup', formData);
        dispatch(authSuccess(data.userWithoutPassword));
        toast.success(data?.message);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        dispatch(authFailure(error?.response?.data?.message));
    }
};

export const login = async (formData, dispatch) => {
    try {
        dispatch(authStart());
        const { data } = await api.post("/user/login", formData);
        dispatch(authSuccess(data.userWithoutPassword));
        toast.success(data.message);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        dispatch(authFailure(error?.response?.data?.message));
    }
};

export const checkUser = async (dispatch) => {
    dispatch(authStart());
    try {
        const { data } = await api.get("/user/me");
        dispatch(authSuccess(data));
        return data;
    } catch (error) {
        dispatch(authFailure(error?.response?.data?.message));
    }
};

export const logout = async (dispatch) => {
    try {
        const { data } = await api.post("/user/logout");
        await dispatch(resetAuth(data));
        toast.success(data.message);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        dispatch(authFailure(error?.response?.data?.message));
    }
};

export const updatePic = async (formData, dispatch) => {
    dispatch(authStart());
    try {
        const { data } = await api.post("/user/updatepic", formData);
        dispatch(authSuccess(data.userWithoutPassword));
        toast.success(data.message);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        dispatch(authFailure(error?.response?.data?.message));
    }
};

export const getUsersFn = async (dispatch) => {
    dispatch(setLoadingStates({ isUserLoading: true }));
    try {
        const { data } = await api.get("/message/users");
        dispatch(getUsers(data));
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        dispatch(getUsersFailure(error?.response?.data?.message));
    } finally {
        dispatch(setLoadingStates({ isUserLoading: false }));
    }
};

export const getChatsFn = async (dispatch, id) => {
    try {
        const { data } = await api.get(`/message/${id}`);
        dispatch(getChats(data));

        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        dispatch(getUsersFailure(error?.response?.data?.message));
    }
};

export const    sendChatsFn = async (dispatch, id, messageData) => {

    try {
        const { data } = await api.post(`/message/send/${id}`, messageData);
        await dispatch(sendChats(data));
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to send message");
    }
};

export const setSelectedUserFn = async (dispatch, selectedUser) => {
    dispatch(setSelectedUser(selectedUser));
};

