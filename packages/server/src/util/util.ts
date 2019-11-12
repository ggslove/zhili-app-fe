// Custom promisify
export function promisify(fn:Function) {
  /**
   * @param {...Any} params The params to pass into *fn*
   * @return {Promise<Any|Any[]>}
   */
  return function promisified(...params:any|any[]) {
    return new Promise<any|any[]>((resolve, reject) => fn(...params.concat([(err:Error, ...args:any[]) => err ? reject(err) : resolve( args.length < 2 ? args[0] : args )])))
  }
}






