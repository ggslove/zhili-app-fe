import { SwgClass, SwgProperty } from "@zhili/common/src/swagger/index";

@SwgClass()
export class TagCfgDto {
  @SwgProperty({ type: "string" }) name: string;
  @SwgProperty({ type: "number" }) pageNum: number;
}
