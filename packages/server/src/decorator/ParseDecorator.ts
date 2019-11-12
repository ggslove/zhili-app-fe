export interface ParseType{
 type:Parse;
 index:number;
 name:string | symbol;
}
export type Parse = 'number' | 'string' | 'boolean';
export const parseList: ParseType[] = [];
export function Parse(type: Parse): ParameterDecorator {
  return (target: object, name: string | symbol, index: number) => {
    parseList.push({ type, index, name });
  };
}