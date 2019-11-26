// ioctx.module("user").sa
import ioctx, { IApiCfg, IFetch, IModuleCfg, Method } from './IoContext';
// IUser.saveUser.execute()
// IUser.saveUser.data("ahah").execute();

interface IMapCfg extends IModuleCfg {
  getEquipments: IApiCfg;
  getAllEquipments: IApiCfg;
  getAllAreas: IApiCfg;
  getMacByEquips: IApiCfg;
  getApByEquips: IApiCfg;
  getTrailByMac: IApiCfg;
  getNodesByMarker: IApiCfg;
  compareTimerPlace: IApiCfg;
  addCompareTask: IApiCfg;
  getCompareTaskPage: IApiCfg;
  getCompareResultById: IApiCfg;
}
const mock = false;

const Map:IMapCfg={
  getEquipments:{
    mock,
    method:Method.POST,
    mockUrl:"/aaa",
    url:"/api/api-v1/point/macPoint",
  },
  getAllEquipments:{
    mock,
    method:Method.GET,
    mockUrl:"/aaa",
    url:"/api/api-v1/point/macPoint",
  },
  getMacByEquips:{
    mock,
    method: Method.POST,
    mockUrl:"/aaa",
    url:"/api/api-v1/point/es/aroud/mac",
  },
  getApByEquips:{
    mock,
    method: Method.POST,
    mockUrl:"/aaa",
    url:"/api/api-v1/point/es/aroud/ap",
  },
  getTrailByMac:{
    mock,
    method: Method.POST,
    mockUrl:"/aaa",
    url:"/api/api-v1/point/es/get/mac",
  },
  getNodesByMarker: {
    mock,
    method: Method.POST,
    mockUrl:"/aaa",
    url:"/api/api-v1/proxy/search",
  },
  compareTimerPlace: {
    mock,
    method: Method.POST,
    mockUrl: "/aaa",
    url: "/api/api-v1/point/es/mac/compare",
  },
  addCompareTask: {
    mock,
    method: Method.POST,
    mockUrl: "/aaa",
    url: "/api/api-v1/mapJob/add",
  },
  getCompareTaskPage: {
    mock,
    method: Method.GET,
    mockUrl: "/aaa",
    url: "/api/api-v1/mapJob/page",
  },
  getCompareResultById: {
    mock,
    method: Method.GET,
    mockUrl: "/aaa",
    url: "/api/api-v1/mapJob/details/:mapJobId",
  },
  getAllAreas: {
    mock,
    method: Method.GET,
    mockUrl: "/aaa",
    url: "/api/api-v1/point/mapArea",
  }
};

ioctx.create("map",Map);
export default ioctx.modules("map") as IFetch<IMapCfg>;


// const  user = await UserIo.saveUser().param("id",1).param("sortOrder","hahaha").execute();