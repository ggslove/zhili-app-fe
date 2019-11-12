import { Controller } from "../decorator/ControllerDecorator";
import { Get } from "../decorator/MethodDecorator";
import { Query } from "../decorator/ParamDecorator";
import { Parse } from "../decorator/ParseDecorator";
import TagCfgService from "../service/TagCfg.service";

@Controller("/tagcfg")
class TagCfgController {
  public constructor(protected tagCfgService:TagCfgService ) {}


  @Get("/index") // 装饰 route
  index(@Parse("number") @Query("id") id: number) {
    // 装饰参数
    return this.tagCfgService.pageByName("nanana");
  }
  
  @Get("/list")
  public list() {
    return { data: "a" };
  }
}
