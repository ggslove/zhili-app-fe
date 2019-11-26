// ioctx.module("user").sa
import ioctx, { IApiCfg, IFetch, IModuleCfg, Method } from './IoContext';
// IUser.saveUser.execute()
// IUser.saveUser.data("ahah").execute();

interface IPlaceCfg extends IModuleCfg {
  getPlaces: IApiCfg;
}
const mock = false;

const Place:IPlaceCfg = {
  getPlaces:{
    mock,
    method:Method.GET,
    mockUrl:"/aaa",
    url:"/api/api-v1/maplayer/all",
  },
};

ioctx.create("place",Place);
export default ioctx.modules("place") as IFetch<IPlaceCfg>;


// const  user = await UserIo.saveUser().param("id",1).param("sortOrder","hahaha").execute();