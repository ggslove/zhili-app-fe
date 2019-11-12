import {importClassesFromDirectories} from '../util/importClasses';
export const testArray=new Array<string>();

export function TestClassDecorator(name="haha"):ClassDecorator{
  return (target: Function) =>{
    console.log("-----//Start----");
      testArray.push(target.name);
      console.log(testArray.length);
      console.log("-----//End----");
  }
}

const bootstart=(dirPath:string)=>{
  importClassesFromDirectories([dirPath]);
  console.log(testArray);
}

bootstart(__dirname+"/test/*.ts")