import request from "../axios";

interface IResponse {
    code: number;
    data: any[];
    message: string;
}

const post = (url: string, data?: any) => {
    return new Promise((resolve, reject) => {
        request
            .post(url, data)
            .then((res: IResponse) => {
                resolve(res);
            })
            .catch((err: any) => {
                reject(err);
            });
    });
};
const get = (url: string, data?: any) => {
    return new Promise((resolve, reject) => {
        request
            .get(url, { params: data })
            .then((res: IResponse) => {
                resolve(res);
            })
            .catch((err: any) => {
                reject(err);
            });
    });
};
const put = (url: string, data?: any) => {
    return new Promise((resolve, reject) => {
        request
            .put(url, data)
            .then((res: IResponse) => {
                resolve(res);
            })
            .catch((err: any) => {
                reject(err);
            });
    });
};

const del = (url: string, data?: any) => {
    return new Promise((resolve, reject) => {
        request
            .delete(url, { params: data })
            .then((res: IResponse) => {
                resolve(res);
            })
            .catch((err: any) => {
                reject(err);
            });
    });
};

export default {
    post,
    get,
    put,
    del,
};