/**
 * swagger path 转成 path
 * /user/{name}=> /user/:name
 * @param swaggerPath 
 */
export const swagger2path = (swaggerPath:string) => {
  const re = new RegExp('{(.*?)}', 'g');
  return swaggerPath.replace(re, ':$1');
};

/**
 * 路径转成swagger path
 * @param path
 * /user/:name/:age/=>  /user/{name}/{age}/
  */
export const path2Swagger=(path:string)=>{
  const re = new RegExp('\:([a-zA-Z0-9]*)', 'g');
  return path.replace(re, '{$1}');
}

