import axios from 'axios';
import  pathToRegexp,{PathFunction} from 'path-to-regexp-es';
const swagger2path = require('swagger-path');

const basePath="/api";
interface fetchData{
  url:string;
  data?:any;
  method:"get"|"post"|"delete"|"patch"|"options"|"put";

  [key:string]:any;
}
//TODO: 正则表达式 处理
const pontFetch=async(fd:fetchData)=>{
    const {param,url,data,method}=fd;
    const toPath=pathToRegexp.compile(swagger2path(url));
    const fullUrl=`${basePath}${toPath(param)}`;
    return await axios[method](fullUrl,{data});
}
export default pontFetch;