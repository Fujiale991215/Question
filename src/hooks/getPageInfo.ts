import { useSelector } from "react-redux";
import type { pageInfoType } from "../pages/store/pageInfo";
import type { storeType } from '../store/index';
function useGetPageInfo() {
    // 从redux中获取页面信息
    const pageInfo = useSelector((state: storeType) => state.pageInfo) as pageInfoType;
    return pageInfo;
}

export default useGetPageInfo;