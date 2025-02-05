import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type pageInfoType = {
    title: string,
    desc?: string,
    js?: string,
    css?: string,
    isPublished?: boolean;
};
const INIF_STATE = {
    title: "",
    desc: "",
    js: "",
    css: "",
};
export const pageInfoSlice = createSlice({
    name: "pageInfo",
    initialState: INIF_STATE,
    reducers: {
        /**
         * 初始化 
         */
        resetPageInfo: (state: pageInfoType, actions: PayloadAction<pageInfoType>) => {
            return state = actions.payload as pageInfoType | any;
        },
        /**
         * 修改标题 
         */
        changeTitle: (state: pageInfoType, actions: PayloadAction<string>) => {
            state.title = actions.payload;
        }
    }
});

export const { resetPageInfo, changeTitle } = pageInfoSlice.actions;
export default pageInfoSlice.reducer;