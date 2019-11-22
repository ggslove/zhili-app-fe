import { getCustomRepository } from "typeorm";
import { Service } from "@zhili/common/src/mvc/decorator/";
import { TagCfgDto } from "src/dto";
import TagCfgRepository from "../repository/TagCfg.repository";
import { AffectVo } from "src/vo/Affect.vo";
import { PageVo } from "src/vo/Page.vo";
import TagCfg from "src/entity/TagCfg.entity";

@Service()
export default class TagCfgService {
  // service controller 传入 service层
  private tagCfgRepository: TagCfgRepository;
  constructor() {
    this.tagCfgRepository = getCustomRepository(TagCfgRepository);
  }
  async save(tagCfgDto:TagCfgDto):Promise<AffectVo>{
    //TODO
    //   tagCfgDot=> new TagCfg();//相同属性拷贝
    try{
      return {affected:1}
    }catch (error){
      return error;
    }
  }

  async update(id:number,tagCfgDto:TagCfgDto):Promise<any>{
    //TODO 处理具体的搜索
    //tagCfgDot=> new TagCfg();//相同属性拷贝
    return "";
  }

  async remove(id:number):Promise<AffectVo>{
    const deleteResult=await this.tagCfgRepository.delete({id});
    return {affected:deleteResult.affected!}
  }

  async batchRemove(ids:Array<number>):Promise<any>{

  }
  // 返回的具体参数
  async page(dto:TagCfgDto):Promise<PageVo<TagCfg>>{
    //const meta=this.tagCfgRepository.metadata;
    return {count:10,pageNum:dto.pageNum,rows:[]}
  }

  async list(dto:TagCfgDto):Promise<any>{
   //TODO 处理具体的搜索

  }
}
