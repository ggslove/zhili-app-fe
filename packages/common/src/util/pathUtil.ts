import {pathToRegexp,Key} from 'path-to-regexp';

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


export const findKeyNameValueInPath=(url:string,pathToken:string,keyName:string)=>{
  const keys:Array<Key>=[];
  const re= pathToRegexp(swagger2path(pathToken), keys);
  console.log(keys)
  var result=re.exec(url);
  function findKeyIndex(keyName:string){
    return keys.findIndex(it=> it.name===keyName)
  }
  const keyIndx=findKeyIndex(keyName);
  if(result&&result.length>keyIndx+1){
    return result[keyIndx+1];
  }else{
    return undefined;
  }
}
