import type { PluginFunc } from 'dayjs';

export const dayJsFormat: PluginFunc = (_, dayJs) => {
    const oldFormat = dayJs.prototype.format;

    dayJs.prototype.formatTime = function (template = 'YYYY-MM-DD HH:mm:ss') {
        return oldFormat.call(this, template);
    };
    dayJs.prototype.formatDate = function (template = 'YYYY-MM-DD') {
        return oldFormat.call(this, template);
    };
};
