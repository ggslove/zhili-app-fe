/// <reference path = "../../types/CommonTypes.ts" /> 
import  {controllerList} from '../';
export function Controller(path = ""):CommonTypes.GenericClassDecorator<CommonTypes.Type<any>> {
  // target: controller 类，不是实例
  return (target: CommonTypes.Type<any>) => {
    controllerList.push({ path, target:target });
  };
}

