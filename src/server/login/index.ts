import http from "../../utils/http";

/**
 * 注册 
 */
export const register = (data: any): Promise<any> => {
    return http.post("/question/user/register", data);
};

/**
 * 登陆 
 */
export const login = (data: any): Promise<any> => {
    return http.post("/question/user/login", data);
};

/**
 * 获取用户信息 
 */
export const getUserInfo = (userId: any): Promise<any> => {
    return http.get(`/question/user/getUserInfo/${userId}`);
};

/**
 * 获取刷新token方法 
 */
export const refreshNewToken = (): Promise<any> => {
    const refreshToken: string = localStorage.getItem("question_refreshToken_token")!;
    return http.get(`/refresh/${refreshToken}`);
};