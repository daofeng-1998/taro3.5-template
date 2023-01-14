import Taro from '@tarojs/taro';

export function writeFile(base64: string) {
    return new Promise((resolve, reject) => {
        if (process.env.TARO_ENV === 'weapp') {
            const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64) || [];
            const arrayBuffer = Taro.base64ToArrayBuffer(bodyData);
            const filePath = `${Taro.env.USER_DATA_PATH}/${Math.random()}.${format}`;

            Taro.getFileSystemManager().writeFile({
                filePath,
                data: arrayBuffer,
                encoding: 'binary',
                success() {
                    resolve(filePath);
                },
                fail() {
                    reject(false);
                },
            });
        } else if (process.env.TARO_ENV === 'h5') {
            resolve(base64);
        } else {
            reject(false);
        }
    });
}
