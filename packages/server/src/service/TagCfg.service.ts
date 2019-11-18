import { getCustomRepository } from "typeorm";
import { Service } from "@zhili/common/src/mvc/decorator/";
import TagCfgRepository from "../repository/TagCfg.repository";

@Service()
export default class TagCfgService {
  // service controller 传入 service层
  private tagCfgRepository: TagCfgRepository;
  constructor() {
    this.tagCfgRepository = getCustomRepository(TagCfgRepository);
  }

  // 返回的具体参数

  pageByName(name: string) {
    return { test: name };
    //return this.tagCfgRepository.pageByName(name);
  }
}
