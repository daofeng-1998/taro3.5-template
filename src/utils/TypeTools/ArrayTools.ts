import { isSame } from '@/utils/TypeTools/ObjectTools';

export const isSameArray = (array: Array<any>, target: Array<any>): boolean => {
    if (!Array.isArray(array) || !Array.isArray(target))
        return false;

    if (array.length !== target.length)
        return false;

    return array.every((item, index) => {
        return isSame(item, target[index]);
    });
};
