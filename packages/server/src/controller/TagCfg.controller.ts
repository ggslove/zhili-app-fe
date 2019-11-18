import { Controller } from "@zhili/common/src/mvc/decorator/ControllerDecorator";
import { Get, Post } from "@zhili/common/src/mvc/decorator/MethodDecorator";
import {Path, Query ,Body} from "@zhili/common/src/mvc/decorator/ParamDecorator";
import {SApiTags} from '@zhili/common/src/swagger';
import TagCfgService from "../service/TagCfg.service";
import { TagCfg } from "@zhili/character-tag/src";

import {swaggerApiList} from '@zhili/common/src/swagger';

const tag=SApiTags(["TagCfg"]);

@Controller("/tagcfg")
class TagCfgController {
  public constructor(protected tagCfgService: TagCfgService) {}

  @Get("/index")
  @tag
  index(@Query({key:"id",parse:"number"}) id: number) {
    // 装饰参数
    return this.tagCfgService.pageByName("nanana:"+id);
  }


  //需要把body的参数全都提取出来
  save(@Body({parse:"object"}) tagCfg:TagCfg ){

  }

  // router 有顺序
  @Get("/list")
  public list() {
    return swaggerApiList;
  }

  @Get("/:id")
  @tag
  getById(@Path({key:"id",parse:"number"}) id:Number){
    return this.tagCfgService.pageByName("getById:"+id);
  }

}
