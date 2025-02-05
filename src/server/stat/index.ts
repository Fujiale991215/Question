import http from "../../utils/http";
/**
 * 获取全部答卷列表(分页)
 */
export const getAllListPage = (page: any): Promise<any> => {
    return http.post(`/question/statPage`, page);
};
/**
 * 获取图表统计结果数据 
 */
export const getChart = (data: any): Promise<any> => {
    return http.post(`question/statTotal`, data);
}