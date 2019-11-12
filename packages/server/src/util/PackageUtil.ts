import path from 'path';
import jsonata from 'jsonata';
import LogUtil from './LogUtil';
const logger=LogUtil.getLogger("PackageUtil");
const projectPath = path.resolve('.');
const package_json=path.join(projectPath,"package.json");
export interface PackageUtil{
  doExpr:(expr:string)=>any;
}

export const PackageUtil:Promise<PackageUtil>= (async function (){
  const doAsync=async ()=>{
    const packageData=await import(package_json).catch((error)=>{logger.error(error);return new Object()});
    return { 
      doExpr:(expr:string)=>jsonata(expr).evaluate(packageData),
    };
  }
  return doAsync().catch(error=>{return {
    doExpr:(expr:string)=> {throw new Error(error);}
  }});
}
)()





