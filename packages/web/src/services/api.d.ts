type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
  [key in Key]: Value;
};

declare namespace defs {
  export class AffectVo {
    /** affected */
    affected?: number;
  }

  export class TagCfg {
    /** name */
    name?: string;

    /** sqlContent */
    sqlContent?: string;
  }

  export class TagCfgDto {
    /** name */
    name?: string;

    /** pageNum */
    pageNum?: number;
  }
}

declare namespace API {
  /**
   * 标签配置
   */
  export namespace tagcfg {
    /**
     * 分页查询TagCfg
     * /tagcfg/page
     */
    export namespace page {
      export class Params {}

      export type Response = object;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: defs.TagCfgDto,
      ): Promise<object>;
    }

    /**
     * undefined
     * /tagcfg/save
     */
    export namespace save {
      export class Params {}

      export type Response = defs.AffectVo;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: defs.TagCfgDto,
      ): Promise<defs.AffectVo>;
    }

    /**
     * 删除标签配置TagCfg
     * /tagcfg/{id}
     */
    export namespace remove {
      export class Params {
        /** id */
        id: number;
      }

      export type Response = defs.AffectVo;
      export const init: Response;
      export function request(params: Params): Promise<defs.AffectVo>;
    }
  }

  /**
   * 标签类型
   */
  export namespace tagtype {
    /**
     * 测试第一个方法
     * /tagtype/test
     */
    export namespace test {
      export class Params {}

      export type Response = defs.AffectVo;
      export const init: Response;
      export function request(params: Params): Promise<defs.AffectVo>;
    }
  }
}
