import Taro from '@tarojs/taro';
import { writeFile } from '@/utils/FileUtils';
import CanvasContext = Taro.CanvasContext;

// @ts-ignore
const CanvasUtils = {
    // 处理文字多出省略号显示
    dealWords(options) {
        options.ctx.beginPath();
        if (process.env.TARO_ENV === 'h5') {
            options.ctx.fontSize = options.fontSize ?? options.ctx.fontSize;// 设置字体大小
            options.ctx.fillStyle = options.fillStyle ?? options.ctx.fillStyle;// 设置字体大小
        } else {
            options.ctx.setFontSize(options.fontSize ?? options.ctx.fontSize);// 设置字体大小
            options.ctx.setFillStyle(options.fillStyle ?? options.ctx.fillStyle);// 设置字体大小
        }
        options.word = String(options.word || '');
        options.ctx.fontWeight = options.fontWeight ?? options.ctx.fontWeight;// 字体样式
        options.ctx.fontFamily = options.fontFamily ?? options.ctx.fontFamily;// 字体样式
        const allRow = Math.ceil(options.ctx.measureText(options.word).width / options.maxWidth);
        // 实际总共能分多少行
        const count = allRow >= options.maxLine ? options.maxLine : allRow;// 实际能分多少行与设置的最大显示行数比，谁小就用谁做循环次数

        let endPos = 0;// 当前字符串的截断点
        for (let j = 0; j < count; j++) {
            const nowStr = options.word.slice(endPos);// 当前剩余的字符串
            let rowWid = 0;// 每一行当前宽度
            if (options.ctx.measureText(nowStr).width > options.maxWidth) { // 如果当前的字符串宽度大于最大宽度，然后开始截取
                for (let m = 0; m < nowStr.length; m++) {
                    rowWid += options.ctx.measureText(nowStr[m]).width;// 当前字符串总宽度
                    if (rowWid > options.maxWidth) {
                        if (j === options.maxLine - 1) { // 如果是最后一行
                            options.ctx.fillText(`${nowStr.slice(0, m - 1)}...`, options.x, options.y + (j + 1) * 18); // (j+1)*18这是每一行的高度
                        } else {
                            options.ctx.fillText(nowStr.slice(0, m), options.x, options.y + (j + 1) * 18);
                        }
                        endPos += m;// 下次截断点
                        break;
                    }
                }
            } else { // 如果当前的字符串宽度小于最大宽度就直接输出
                options.ctx.fillText(nowStr.slice(0), options.x, options.y + (j + 1) * 18);
            }
        }
        options.ctx.stroke();
        options.ctx.closePath();
        return {
            totalLine: count,
        };
    },
    // 兼容多种储存形式的图片
    async drawImage(
        context: CanvasContext,
        /** 所要绘制的图片资源（网络图片要通过 getImageInfo / downloadFile 先下载） */
        imageResource: string,
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        dx = 0,
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        dy = 0,
        dWidth?: number,
        dHeight?: number
    ) {
        // eslint-disable-next-line prefer-rest-params,@typescript-eslint/no-unused-vars
        const [_, ...params] = arguments;
        if (process.env.TARO_ENV !== 'h5') {
            if (String(imageResource).toLowerCase().includes(';base64,'))
                params[0] = await writeFile(imageResource);
            else if (String(imageResource).startsWith('http://') || String(imageResource).startsWith('https://'))
                params[0] = (await Taro.getImageInfo({ src: imageResource })).path;
        } else {
            const image = new Image(dWidth, dHeight);
            image.src = imageResource;
            params[0] = image;
        }
        // @ts-ignore
        context.drawImage(...params);
    },
    // 画半圆
    async circleImgOne(ctx, img, x, y, r) {
        // 如果在绘制图片之后还有需要绘制别的元素，需启动 save() 、restore() 方法，否则 clip() 方法会导致之后元素都不可见
        //    save()：保存当前 Canvas 画布状态
        // restore()：恢复到保存时的状态

        ctx.save();
        const d = r * 2;
        const cx = x + r;
        const cy = y + r;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.strokeStyle = '#FFFFFF'; // 设置绘制圆形边框的颜色
        ctx.stroke(); // 绘制出圆形，默认为黑色，可通过 ctx.strokeStyle = '#FFFFFF'， 设置想要的颜色
        ctx.clip();
        await CanvasUtils.drawImage(ctx, img, x, y, d, d);
        ctx.closePath();
        ctx.save();
    },
};
export default CanvasUtils;
