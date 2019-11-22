/**
 * @desc 测试第一个方法
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = new defs.AffectVo();

export async function request(params) {
  return pontFetch({
    url: '/tagtype/test',
    params,
    method: 'get',
  });
}
