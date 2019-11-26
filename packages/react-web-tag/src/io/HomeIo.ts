// ioctx.module("user").sa
import ioctx,{IApiCfg,IModuleCfg,IFetch,Method} from './IoContext';
// IUser.saveUser.execute()
// IUser.saveUser.data("ahah").execute();

interface IHomeCfg extends IModuleCfg {
  getMacLatest: IApiCfg;
  getApLatest: IApiCfg;
}
const mock = false;
const Home:IHomeCfg={
  getMacLatest:{
    mock,
    method:Method.GET,
    mockUrl:"/aaa",
    url:"/api/api-v1/jobdata/latest/mac"
  },
  getApLatest:{
    mock,
    method:Method.GET,
    mockUrl:"/aaa",
    url:"/api/api-v1/jobdata/latest/ap"
  }
};

ioctx.create("home", Home);
export default ioctx.modules("home") as IFetch<IHomeCfg>;


// const  user = await UserIo.saveUser().param("id",1).param("sortOrder","hahaha").execute();