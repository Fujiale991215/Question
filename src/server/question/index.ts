import http from "../../utils/http";
/**
 * 获取全部问卷列表(分页)
 */
export const getAllListPage = (page: any): Promise<any> => {
    return http.post(`/question/getQuestionListPage`, page);
};
/**
 * 获取全部问卷列表(不分页)
 */
export const getAllListNoPage = (data: any): Promise<any> => {
    return http.post(`/question/getQuestionListNoPage`, data);
};
/**
 * 标星/取消标星 
 */
export const setStar = (data: any): Promise<any> => {
    return http.post(`/question/star`, data);
};
/**
 * 修改单个问卷删除状态 
 */
export const setDeleteOne = (data: any): Promise<any> => {
    return http.post(`/question/deleteOne`, data);
};
/**
 * 恢复问卷状态 
 */
export const setRecover = (data: any): Promise<any> => {
    return http.post(`/question/recoverQuestionByIds`, data);
};
/**
 * 彻底删除问卷 
 */
export const setDeleteByIds = (data: any): Promise<any> => {
    return http.post(`/question/deleteQuestionByIds`, data);
};
/**
 * 复制新的问卷 
 */
export const setDuplicate = (cardId: string): Promise<any> => {
    return http.post(`/question/duplicate/${cardId}`);
};
/**
 * 获取单个问卷信息 
 */
export const getQuestionInfo = (cardId: string): Promise<any> => {
    return http.get(`/question/getQuestionById/${cardId}`);
};
/**
 * 新增或修改问卷
 */
export const saveOrUpdateQuestion = (data: any): Promise<any> => {
    return http.post(`/question/saveOrUpdateQuestion`, data);
};
/**
 * 修改问卷的发布状态 
 */
export const setPublish = (data: any): Promise<any> => {
    return http.post(`/question/publishQuestion`, data);
}