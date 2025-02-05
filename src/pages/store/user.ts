import { createSlice } from "@reduxjs/toolkit";

export type userInfoType = {
    userName: string;
    nickName: string;
    registerDate: string;
    userId: string;
};

export const userSlice = createSlice({
    name: "userInfo",
    initialState: {},
    reducers: {
        setUserInfo: (state: any, action: any) => {
            return state = action.payload;
        },
        logout: () => {
            return {};
        }
    }
});

export const { setUserInfo, logout } = userSlice.actions;
export default userSlice.reducer;