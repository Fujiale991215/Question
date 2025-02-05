import { combineReducers, configureStore } from "@reduxjs/toolkit";
// 数据持久化
import { persistStore, persistReducer } from "redux-persist";
import StorageLocation from "redux-persist/lib/storage";
// redux-undo
import undoable, { excludeAction, StateWithHistory } from "redux-undo";
// 导入所有封装好的reducers
import userInfo from "../pages/store/user";
import components from "../pages/store/components";
import pageInfo from "../pages/store/pageInfo";
import type { userInfoType } from "../pages/store/user";
import type { ComponentInfoType } from "../pages/store/components";
import type { pageInfoType } from "../pages/store/pageInfo";
export type storeType = {
    userInfo: userInfoType,
    components: StateWithHistory<ComponentInfoType>;
    pageInfo: pageInfoType;
};

// 配置持久化储存配置对象
// const persistConfig = {
//     key: "root",
//     version: 1,
//     storage: StorageLocation,
// };

// 持久化处理后的reducers
// const persistedReducer = persistReducer(
//     persistConfig,
//     combineReducers({
//         userInfo,
//         components: undoable(components, {
//             limit: 10, // 限制10步操作
//             filter: excludeAction([ //过滤不需要撤销的操作
//                 "components/resetComponents",
//                 "components/changeSelectId",
//                 "components/selectPrevComponent",
//                 "components/selectNextComponent",
//             ])
//         }
//         ),
//         pageInfo
//     })
// );
const reducer = combineReducers({
    userInfo,
    components: undoable(components, {
        limit: 10, // 限制10步操作
        filter: excludeAction([ //过滤不需要撤销的操作
            "components/resetComponents",
            "components/changeSelectId",
            "components/selectPrevComponent",
            "components/selectNextComponent",
        ])
    }
    ),
    pageInfo
});

// 将持久化插件和store通过middleware关联起来
const store = configureStore({
    reducer,
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: false,
    //     })
});

// 可以订阅 sotre
// store.subscribe(() => console.log(store.getState(), 'storeSlice'));

// 持久化的store
// const persistor = persistStore(store);

// export { store, persistor };
export default store;