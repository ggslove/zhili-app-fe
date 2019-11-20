import { SwgClass, SwgProperty } from "@zhili/common/src/swagger/decorator";

@SwgClass()
export class TagCfgDto {
  @SwgProperty({ type: "string" }) name: string;
  @SwgProperty({ type: "number" }) pageNum: number;
}
