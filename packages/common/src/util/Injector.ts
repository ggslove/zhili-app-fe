/// <reference path = "../types/CommonTypes.ts" /> 

/**
 * The Injector stores services and resolves requested instances.
 */
export const Injector = new (class {
  /**
   * Resolves instances by injecting required services
   * @param {Type<any>} target
   * @returns {T}
   */
  resolve<T>(target: CommonTypes.Type<any>): T {
    // tokens are required dependencies, while injections are resolved tokens from the Injector
    let tokens = Reflect.getMetadata("design:paramtypes", target) || [],
      injections = tokens.map((token: CommonTypes.Type<any>) =>
        Injector.resolve<any>(token)
      );
    return new target(...injections);
  }
  resolveObj(target: CommonTypes.Type<any>) {
    // tokens are required dependencies, while injections are resolved tokens from the Injector
    let tokens = Reflect.getMetadata("design:paramtypes", target) || [],
      injections = tokens.map((token: CommonTypes.Type<any>) =>
        Injector.resolve<any>(token)
      );
    return new target(...injections);
  }
})();
