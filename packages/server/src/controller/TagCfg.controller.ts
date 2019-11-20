
import {
  Controller,
  Get, Post,
  Path,
  Query,
  Body
} from "@zhili/common/src/mvc/decorator";
import { SApiTags, SApiSummary, SApiResult } from "@zhili/common/src/swagger/decorator";
import { TagCfgDto } from "src/dto";
import { ResponseBuilder, ReponseData } from "src/vo/Response.vo";
import HttpStatus from "@zhili/common/src/util/HttpStatus";
import { TagCfgVo } from "src/vo/TagCfg.vo";
import TagCfgService from "../service/TagCfg.service";
import { PaginationVo } from "src/vo/Pagination.vo";
const sTag = SApiTags(["TagCfg"]);

/**
 *  页面提交-> dto
 *  返回为-> vo
 */
@Controller("/tagcfg")
class TagCfgController {
  public constructor(protected tagCfgService: TagCfgService) { }

  @Get("/index")
  @sTag
  index(@Query({ key: "id", parse: "number", isArray: false }) id: number): string {
    // 装饰参数
    return this.tagCfgService.pageByName("nanana:" + id).test;
  }

  //需要把body的参数全都提取出来
  @Post("/")
  @sTag
  @SApiSummary("保存tagCfg")
  @SApiResult([
    { code: HttpStatus.OK, type: "object", ref: TagCfgVo },
    { code: HttpStatus.BAD_REQUEST, type: "string", description: "400错误" }
  ])

  //array 
  save(
    @Body({ key: "body", parse: "object", ref: TagCfgDto, isArray: false })
    tagCfgDto: TagCfgDto
  ): ReponseData<any> {
    return ResponseBuilder()
      .data(tagCfgDto)
      .code(HttpStatus.OK)
      .build();
  }

  @Get("/:id")
  @sTag
  @SApiSummary("获取tagCfg")
  @SApiResult([
    { code: HttpStatus.OK, type: "object", ref: TagCfgVo },
    { code: HttpStatus.BAD_REQUEST, type: "string", description: "BAD_REQUEST" }
  ])
  get(
    @Path({ key: "id", parse: "number" })
    id: number
  ): ReponseData<any> {
    return ResponseBuilder()
      .data(id)
      .code(HttpStatus.OK)
      .build();
  }

  @Post("/page")
  @sTag
  @SApiSummary("分页获取tagCfg")
  @SApiResult([
    { code: HttpStatus.OK, type: "pagination", ref: TagCfgVo },
    { code: HttpStatus.BAD_REQUEST, type: "string", description: "BAD_REQUEST" }
  ])
  page(
    @Body({ parse: "object", key: "body", isArray: false, ref: TagCfgDto })
    tagCfgDto: TagCfgDto
  ): ReponseData<any> {
    return ResponseBuilder()
      .data([tagCfgDto])
      .code(HttpStatus.OK)
      .build();
  }

  // router 有顺序
  @Get("/list")
  public list() {
    return {
     
    };
  }
}
