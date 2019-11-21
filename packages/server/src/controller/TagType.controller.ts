import {
  Controller,
  Get,
  Post,
  Path,
  Query,
  Body,
  Delete
} from "@zhili/common/src/mvc/decorator";
import {
  SApiSummary,
  SApiResult
} from "@zhili/common/src/swagger/decorator";
import { TagCfgDto } from "src/dto";
import { ResponseBuilder, ReponseData } from "src/vo/Response.vo";
import HttpStatus from "@zhili/common/src/util/HttpStatus";
import { TagCfgVo } from "src/vo/TagCfg.vo";
import TagCfgService from "../service/TagCfg.service";
import { PaginationVo } from "src/vo/Pagination.vo";
import { AffectVo } from "src/vo/Affect.vo";


@Controller("/tagtype","标签类型")
class TagTypeController {

  @Get("/test")
  @SApiSummary("测试第一个方法")
  @SApiResult([
    {code:200,type:"object",ref:AffectVo}
  ])
  public test(){
    return {affected:1}
  }
}