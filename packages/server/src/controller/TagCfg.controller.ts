import { Controller } from "@zhili/common/src/mvc/decorator/ControllerDecorator";
import { Get, Post } from "@zhili/common/src/mvc/decorator/MethodDecorator";
import {
  Path,
  Query,
  Body
} from "@zhili/common/src/mvc/decorator/ParamDecorator";
import { SApiTags, SApiSummary, SApiResult } from "@zhili/common/src/swagger";
import {
  swaggerApiList,
  swaggerApiParamCfgList,
  swaggerClassList,
  swaggerApiResultList,
  IResponseData
} from "@zhili/common/src/swagger";
import { TagCfgDto } from "src/dto";
import { ResponseBuilder } from "src/vo/Response.vo";
import HttpStatus from "@zhili/common/src/util/HttpStatus";
import { TagCfgVo } from "src/vo/TagCfg.vo";
import TagCfgService from "../service/TagCfg.service";
const sTag = SApiTags(["TagCfg"]);

/**
 *  页面提交-> dto
 *  返回为-> vo
 */
@Controller("/tagcfg")
class TagCfgController {
  public constructor(protected tagCfgService: TagCfgService) {}

  @Get("/index")
  @sTag
  index(@Query({ key: "id", parse: "number" }) id: number): string {
    // 装饰参数
    return this.tagCfgService.pageByName("nanana:" + id).test;
  }

  //需要把body的参数全都提取出来
  @Post("/")
  @sTag
  @SApiSummary("保存tagCfg")
  @SApiResult([
    { data: TagCfgVo, code: HttpStatus.OK },
    { code: HttpStatus.BAD_REQUEST, description: "400错误" }
  ])
  save(
    @Body({ parse: "object", key: "body", ref: TagCfgDto }) tagCfgDto: TagCfgDto
  ): IResponseData<any> {
    return ResponseBuilder()
      .data(tagCfgDto)
      .code(HttpStatus.OK)
      .build();
  }

  @Get("/:id")
  @sTag
  @SApiSummary("获取tagCfg")
  @SApiResult([
    { data: TagCfgVo, code: HttpStatus.OK },
    { code: HttpStatus.BAD_REQUEST, description: "400错误" }
  ])
  get(@Path({ key: "id", parse: "number" }) id: number): IResponseData<any> {
    return ResponseBuilder()
      .data(id)
      .code(HttpStatus.OK)
      .build();
  }

  

  @Post("/page")
  @sTag
  @SApiSummary("分页获取tagCfg")
  page(
    @Body({ parse: "object", key: "body", ref: TagCfgDto })
    tagCfgDto: TagCfgDto
  ): IResponseData<any> {
    console.log(tagCfgDto);
    return ResponseBuilder()
      .data([tagCfgDto])
      .code(HttpStatus.OK)
      .build();
  }

  // router 有顺序
  @Get("/list")
  public list() {
    return {
      swaggerApiList,
      swaggerApiParamCfgList,
      swaggerClassList,
      swaggerApiResultList
    };
  }

}
