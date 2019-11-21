import 'reflect-metadata'
import {swagger2path} from './util'
import {pathToRegexp,Key} from 'path-to-regexp';

const findKeyNameValueInPath=(url:string,pathToken:string,keyName:string)=>{
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

console.log(findKeyNameValueInPath("/嘿嘿/哈哈","/:username/:password","username"));



// name 为username
//idex  序号