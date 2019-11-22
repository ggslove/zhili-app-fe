/**
 * @desc 分页查询TagCfg
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = undefined;

export async function request(params, bodyParams) {
  return pontFetch({
    url: '/tagcfg/search',
    params: bodyParams,
    method: 'post',
  });
}
