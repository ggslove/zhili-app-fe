// ioctx.module("user").sa
import ioctx,{IApiCfg,IModuleCfg,IFetch,Method} from './IoContext';
// IUser.saveUser.execute()
// IUser.saveUser.data("ahah").execute();

interface IUserCfg extends IModuleCfg {
  checkLogin: IApiCfg;
}

const User:IUserCfg={
  checkLogin:{
    mock: false,
    method: Method.GET,
    mockUrl: "/aaa",
    url: "/api/login"
  } 
};

ioctx.create("user",User);
export default ioctx.modules("user") as IFetch<IUserCfg>;


// const  user = await UserIo.saveUser().param("id",1).param("sortOrder","hahaha").execute();