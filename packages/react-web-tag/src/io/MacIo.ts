import ioctx, { IApiCfg, IFetch, IModuleCfg, Method } from './IoContext';

interface IMacCfg extends IModuleCfg {
  getMacTrail: IApiCfg;
  getMacInfo: IApiCfg;
  getMacByPlace: IApiCfg;
  getMacByHour: IApiCfg;
  getMacAggAp: IApiCfg;
  getMacApDetails: IApiCfg;
  getApInfo: IApiCfg;
  getApAggMac: IApiCfg;
  getApByPlace: IApiCfg;
  getApByHour: IApiCfg;
  getApMacByHour: IApiCfg;
  getMacSearch: IApiCfg;
  getMacPhone: IApiCfg;
  getMacPerson: IApiCfg;
  getMacAp: IApiCfg;
  getMacNeo4j: IApiCfg;
  getTimerByMacEquip: IApiCfg;
}
const mock = false;

const Mac:IMacCfg={
  getMacTrail:{
    mock,
    method:Method.POST,
    mockUrl:"/aaa",
    url:"/api/api-v1/point/es/trail/mac",
  },
  getApTrail:{
    mock,
    method:Method.POST,
    mockUrl:"/aaa",
    url:"/api/api-v1/point/es/trail/ap",
  },
  getMacInfo:{
    mock,
    method:Method.POST,
    mockUrl:"/aaa",
    url:"/api/api-v1/point/es/info/mac",
  },
  getMacByPlace:{
    mock,
    method:Method.POST,
    mockUrl:"/aaa",
    url:"/api/api-v1/point/es/info/mac/agg_location",
  },
  getMacByHour:{
    mock,
    method:Method.POST,
    mockUrl:"/aaa",
    url:"/api/api-v1/point/es/info/mac/agg_hour",
  },
  getMacAggAp:{
    mock,
    method:Method.POST,
    mockUrl:"/aaa",
    url:"/api/api-v1/point/es/info/mac/agg_ap",
  },
  getMacApDetails:{
    mock,
    method:Method.POST,
    mockUrl:"/aaa",
    url:"/api/api-v1/point/es/info/mac/apConnectDetail",
  },
  getApInfo:{
    mock,
    method:Method.POST,
    mockUrl:"/aaa",
    url:"/api/api-v1/point/es/info/ap",
  },
  getApAggMac:{
    mock,
    method:Method.POST,
    mockUrl:"/aaa",
    url:"/api/api-v1/point/es/info/ap/agg_mac",
  },
  getApByPlace: {
    mock,
    method:Method.POST,
    mockUrl:"/aaa",
    url:"/api/api-v1/point/es/info/ap/agg_equip",
  },
  getApByHour: {
    mock,
    method:Method.POST,
    mockUrl:"/aaa",
    url:"/api/api-v1/point/es/info/ap/agg_time",
  },
  getApMacByHour: {
    mock,
    method:Method.POST,
    mockUrl:"/aaa",
    url:"/api/api-v1/point/es/info/ap/agg_mac_time",
  },
  getMacSearch: {
    mock,
    method:Method.POST,
    mockUrl:"/aaa",
    url:"/api/api-v1/point/es/search/mac",
  },
  getMacPhone: {
    mock,
    method:Method.GET,
    mockUrl:"/aaa",
    url:"/api/api-v1/neo4j/mac_agg_phone/:mac",
  },
  getMacPerson: {
    mock,
    method:Method.GET,
    mockUrl:"/aaa",
    url:"/api/api-v1/neo4j/mac_agg_person/:mac",
  },
  getMacAp: {
    mock,
    method:Method.GET,
    mockUrl:"/aaa",
    url:"/api/api-v1/neo4j/mac_agg_ap/:mac",
  },
  getMacNeo4j: {
    mock,
    method:Method.GET,
    mockUrl:"/aaa",
    url:"/api/api-v1/neo4j/mac_agg/:mac",
  },
  getTimerByMacEquip: {
    mock,
    method:Method.POST,
    mockUrl:"/aaa",
    url:"/api/api-v1/point/es/info/mac/agg_location_time",
  }
};

ioctx.create("pgis.scss", Mac);
export default ioctx.modules("pgis.scss") as IFetch<IMacCfg>;


// const  user = await UserIo.saveUser().param("id",1).param("sortOrder","hahaha").execute();