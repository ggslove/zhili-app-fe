import { Type, GenericClassDecorator } from "./ServiceDecorator";

interface ControllerType {
  path: string;
  target: Type<any>;
}
export const controllerList: ControllerType[] = [];

export function Controller(path = ""): GenericClassDecorator<Type<any>> {
  // target: controller 类，不是实例
  return (target: Type<any>) => {
    controllerList.push({ path, target });
  };
}
