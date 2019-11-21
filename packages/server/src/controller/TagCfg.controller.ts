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
// const sTag = SApiTags(["TagCfg"]);

/**
 *  页面提交-> dto
 *  返回为-> vo
 */
@Controller("/tagcfg","标签配置")
class TagCfgController {
  public constructor(protected tagCfgService: TagCfgService) {}


  @Post("/")
  @SApiResult([
    {code:200,type:"object",ref:AffectVo}
  ])
  public async save(@Body({key:"body",parse: "object",ref:TagCfgDto,isArray:false}) tagCfgDto:TagCfgDto){
    return await this.tagCfgService.save(tagCfgDto);
  }

  @Delete("/:id")
  @SApiResult([
    {code:200,type:"object",ref:AffectVo}
  ])
  @SApiSummary("删除标签配置TagCfg")
  public async remove(@Path({key:"id",parse:"integer",required:true}) id:number) {
    return await this.tagCfgService.remove(id);
  }

  // @Get("/index")
  // @sTag
  // @SApiSummary("这是一个测试接口描述")
  // index(@Query({ key: "id", parse: "integer", required: true, format: "int32", description: "这是一个测试字段", isArray: false }) id: number,
  //   @Query({ key: "name", parse: "string", required: true, description: "这是一个测试字段string", isArray: false }) name: string
  // ): string {
  //   // 装饰参数
  //   return this.tagCfgService.pageByName("nanana:" + id).test;
  // }
  // //需要把body的参数全都提取出来
  // @Post("/")
  // @sTag
  // @SApiSummary("保存tagCfg")
  // @SApiResult([
  //   { code: HttpStatus.OK, type: "object", ref: TagCfgVo },
  //   { code: HttpStatus.BAD_REQUEST, type: "string", description: "400错误" }
  // ])
  // save(
  //   @Body({ key: "body", parse: "object", ref: TagCfgDto, isArray: false })
  //   tagCfgDto: TagCfgDto
  // ): ReponseData<any> {
  //     // 数据进来的是 dto ->  保存的是 do 对象 -> 返回的是 vo对象
  //   this.tagCfgService.save(tagCfgDto);

  //   return ResponseBuilder()
  //     .data(tagCfgDto)
  //     .code(HttpStatus.OK)
  //     .build();
  // }

  // @Get("/:id")
  // @sTag
  // @SApiSummary("获取tagCfg")
  // @SApiResult([
  //   { code: HttpStatus.OK, type: "object", ref: TagCfgVo },
  //   { code: HttpStatus.BAD_REQUEST, type: "string", description: "BAD_REQUEST" }
  // ])
  // get(
  //   @Path({ key: "id", parse: "integer" })
  //   id: number
  // ): ReponseData<any> {
  //   return ResponseBuilder().data(id).code(HttpStatus.OK).build();
  // }

  // @Post("/page")
  // @sTag
  // @SApiSummary("分页获取tagCfg")
  // @SApiResult([
  //   { code: HttpStatus.OK, type: "pagination", ref: TagCfgVo },
  //   { code: HttpStatus.BAD_REQUEST, type: "string", description: "BAD_REQUEST" }
  // ])
  // page(
  //   @Body({ parse: "object", key: "body", isArray: false, ref: TagCfgDto })
  //   tagCfgDto: TagCfgDto
  // ): ReponseData<any> {

  //   return ResponseBuilder().data([tagCfgDto]).code(HttpStatus.OK).build();
  // }

  // // router 有顺序
  // @Get("/list")
  // @sTag
  // public list() {
  //   return {

  //   };
  // }
}
