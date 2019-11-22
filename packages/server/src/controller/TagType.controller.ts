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