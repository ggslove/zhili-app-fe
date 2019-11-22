/**
 * @desc 删除标签配置TagCfg
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {
  /** id */
  id: number;
}

export const init = new defs.AffectVo();

export async function request(params) {
  return pontFetch({
    url: '/tagcfg/{id}',
    params,
    method: 'delete',
  });
}
