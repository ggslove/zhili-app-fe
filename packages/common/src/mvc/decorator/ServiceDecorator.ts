/// <reference path = "../../types/CommonTypes.ts" /> 
/**
 * @returns {GenericClassDecorator<Type<any>>}
 * @constructor
 */
export const Service = (): CommonTypes.GenericClassDecorator<CommonTypes.Type<any>> => {
  return (target: CommonTypes.Type<any>) => {
    // do something with `target`, e.g. some kind of validation or passing it to the Injector and store them
  };
};
