/* eslint-disable @typescript-eslint/no-unused-vars */
// noinspection JSUnusedLocalSymbols

import type { FormDataOptions, useFormOptions } from '@/hooks/hooks';

// @ts-ignore
const emptyType = ['undefined', 'null', 'NaN'];

// @ts-ignore
const getType = (data) => {
    if (data === null)
        return 'null';
    else if (Number.isNaN(data))
        return 'NaN';
    else
        return typeof data;
};

export const index = async <F extends object,>(
    formOptions: useFormOptions<F>,
    formData: Record<string, any>
) => {
    for (const key in formOptions) {
        const option = formOptions[key] as FormDataOptions<unknown>;
        // @ts-ignore
        const data = formData[key];

        if (typeof option === 'object') {
            if (option.rules) {
                if (!Array.isArray(option.rules))
                    option.rules = [option.rules];

                const rules = option.rules;

                for (const rule of rules) {
                    if (rule.required)
                        console.log('1');
                }
            }
        }
    }
};
