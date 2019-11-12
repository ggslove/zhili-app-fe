/**
 * Type for what object is instances of
 */
export interface Type<T> {
  new (...args: any[]): T;
}

/**
 * Generic `ClassDecorator` type
 */
export type GenericClassDecorator<T> = (target: T) => void;

/**
 * @returns {GenericClassDecorator<Type<any>>}
 * @constructor
 */
export const Service = (): GenericClassDecorator<Type<any>> => {
  return (target: Type<any>) => {
    // do something with `target`, e.g. some kind of validation or passing it to the Injector and store them
  };
};
