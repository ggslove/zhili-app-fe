import { SwgClass, SwgProperty } from "@zhili/common/src/swagger/decorator";

@SwgClass()
//考虑继承类
export class TagCfgDto {
  @SwgProperty({ type: "string" }) name: string;
  @SwgProperty({ type: "number" }) pageNum: number;
}
