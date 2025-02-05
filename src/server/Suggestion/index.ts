import http from "../../utils/http";
/**
 * 保存建议路由
 */
export const saveSuggestion = (data: any): Promise<any> => {
    return http.post(`/question/saveSuggestion`, data);
}
