import { Controller } from "@zhili/common/src/mvc/decorator/ControllerDecorator";
import { Get, Post } from "@zhili/common/src/mvc/decorator/MethodDecorator";
import { Query ,Body} from "@zhili/common/src/mvc/decorator/ParamDecorator";
import TagCfgService from "../service/TagCfg.service";

@Controller("/test")
class TestController {
  public constructor(protected tagCfgService: TagCfgService) {}

  @Get("/index")
  index(@Query({key:"name",parse:"string"}) name: string) {
    // 装饰参数
    return this.tagCfgService.pageByName("test:"+name);
  }
}
