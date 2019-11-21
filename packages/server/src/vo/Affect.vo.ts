import { SwgClass, SwgProperty } from "@zhili/common/src/swagger/decorator";
@SwgClass()
export class AffectVo {
  @SwgProperty({ type: "integer" })
  affected: number;
}
