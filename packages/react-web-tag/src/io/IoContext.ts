import axios, { AxiosResponse } from 'axios';
import  pathToRegexp,{PathFunction} from 'path-to-regexp-es';
// import { loginUrl } from "../constants/app";

export interface IModuleCfg {
  [k: string]: IApiCfg
}
export type IFetch<T> = { [k in keyof T]:()=> IApi };

export enum Method {
  GET, POST, DELETE, PATCH,
}
export interface IApiCfg {
  mock: boolean;
  mockUrl: string;
  url: string;
  method: Method;
}


interface IApi {
  param: (key: string, value: string | number) => this;
  body: (body: any) => this;
  execute: () => Promise<any>
  query: (key: string, value: string | number) => this;
}

class ApiImpl implements IApi {
  private paramMap: {[key: string]: string | number};
  private queryMap:{[key:string]:string|number};
  private data: any;
  private cfg: IApiCfg;
  private toPath:PathFunction;
  public constructor(cfg: IApiCfg) {
    this.cfg = cfg;
    this.paramMap = {};
    this.queryMap={};
    this.toPath=pathToRegexp.compile(this.getCfgUrl())
  }

  param(key: string, value: string | number) {
    this.paramMap[key] =  value;
    return this;
  }

  query(key:string,value:string|number){
    this.queryMap[key] =  value;
    return this;
  }

  body(data: any) {
    this.data = data;
    return this;
  };
  private getCfgUrl(){
   return this.cfg.mock ? this.cfg.mockUrl : this.cfg.url;
  }

  private getUrl() {
    return this.toPath(this.paramMap);
  }

  async execute() {
    let result: AxiosResponse<any>;
    let url: string  = this.getUrl();
    const token = localStorage.getItem('token');
    const headers = token ? { headers: { Authorization: `Bearer ${token}` }} : '';
    // try {
      switch (this.cfg.method) {
        case Method.GET: result = await axios.get(this.getUrl(),{ ...headers, params:this.queryMap }); break;
        case Method.POST: result = await axios.post(url, this.data, { ...headers }); break;
        case Method.DELETE: result = await axios.delete(url, { ...this.data, ...headers } ); break;
        case Method.PATCH: result = await axios.patch(url, this.data, { ...headers }); break;
        default: throw new Error("ajax execute error")
      }
      return result;
    // } catch(error){
    //   window.location.href = loginUrl;
    //   const { response } = error;
    //   doError(response);
    // }
  }
}

interface IIOContext {
  create: (module: string, iModuleCfg: IModuleCfg) => void
  modules: (module: string) => IFetch<IModuleCfg> | undefined;

}

class IOContext implements IIOContext {
  private contextMap: Map<string, IFetch<IModuleCfg>> = new Map();
  create(module: string, cfg: IModuleCfg) {
    const moduleFetch: IFetch<IModuleCfg> = {};
    for (let key in cfg) {
      moduleFetch[key] = ()=> new ApiImpl(cfg[key]);
    }
    this.contextMap.set(module, moduleFetch);
  }
  //=> IConfigDo<IConfig>;
  modules(module: string): IFetch<IModuleCfg> | undefined {
    return this.contextMap.get(module);
  }
}
const ioctx = new IOContext();

export default ioctx;

