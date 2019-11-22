namespace CommonTypes {
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

  export type GenericMethodDecorator<T> = (
    target: T,
    name: any,
    descriptor: TypedPropertyDescriptor<T>
  ) => void;

  export type GenericParameterDecorator<T> = (
    target: T,
    propertyKey: any,
    parameterIndex: number
  ) => void;
  export type GenericPropertyDecorator<T> = (
    target: T,
    propertyKey: string | symbol
  ) => void;


  export type NextFunction = () => Promise<any>;

  export interface Contact {
    name?: string; // The identifying name of the contact person/organization.
    url?: string; // The URL pointing to the contact information. MUST be in the format of a URL.
    email?: string; // The email address of the contact person/organization. MUST be in the format of an email address.
    [extension: string]: any; // Allows extensions to the Swagger Schema. The field name MUST begin with x-.
  }
  export interface SwaggerInfo {
    title: string; // The title of the application.
    description?: string; // A short description of the application.
    termsOfService?: string; // The Terms of Service for the API.
    contact?: Contact; // The contact information for the exposed API.
    version: string; // Provides the version of the application API.
    [extension: string]: any; // Allows extensions to the Swagger Schema. The field name MUST begin with x-.
  }

  export interface SwaggerDoc {
    swagger: '2.0';
    basePath?: string;
    info: SwaggerInfo;
    host?: string;
    schemes?: Array<'http' | 'https' | 'ws' | 'wss'>;
    consumes?: string[];

    [extension: string]: any;
  }

  export interface IKoaControllerOptions {
    controllers: Array<string>;
    versions?: Array<number | string> | object;
    disableVersioning?: boolean;
    initBodyParser?: boolean;
    boomifyErrors?: boolean;
    attachRoutes?: boolean;
    router?: any;
    flow?: Array<Function>; //后续完成流程
    swaggerDoc: SwaggerDoc;
  }
}
