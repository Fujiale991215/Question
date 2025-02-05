
class pageModel {
    constructor(args?: any) {
        Object.assign(this, args);
    }
    /** 数据总数 */
    public total?: number = 0;
    /** 页码数 */
    public current?: number = 1;
    /** 页容量 */
    public pageSize?: number = 10;
    /** 查询条件 */
    public conditions?: any = {};
    /** 排序条件 */
    public orders?: any = [];
    /** 分页数据 */
    public dataList?: any[] = [];
    /** 请求方法 */
    public get(args?: any) {
        return {
            current: this.current,
            pageSize: this.pageSize,
            conditions: this.conditions,
            ...args
        };
    }
}

export default pageModel;