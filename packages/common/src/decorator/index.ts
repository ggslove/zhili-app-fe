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

export type GenericMethodDecorator<T>=(target: T, name: any, descriptor: TypedPropertyDescriptor<T>)=>void;

export type GenericParameterDecorator<T>=(target: T, propertyKey: any, parameterIndex: number)=>void;