/**
 * @desc undefined
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = new defs.AffectVo();

export async function request(params, bodyParams) {
  return pontFetch({
    url: '/tagcfg/',
    params: bodyParams,
    method: 'post',
  });
}
