/**
 * 定义API接口方法
 * @param method
 */
export const defineApi = (method: Function): Function => {
    return async (...args: any[]): Promise<any> => {
        return await method(...args);
    };
};
