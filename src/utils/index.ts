import lodash from 'lodash';
import * as mathjs from 'mathjs';

export { lodash, mathjs };

export const isResponseSuccess = (status: number): boolean => status >= 200 && status < 300;
