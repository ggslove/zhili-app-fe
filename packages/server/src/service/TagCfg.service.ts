import { getCustomRepository } from "typeorm";
import TagCfgRepository from "../repository/TagCfg.repository";
import { Service } from "../decorator/ServiceDecorator";

@Service()
export default class TagCfgService {
  // service controller 传入 service层
  private tagCfgRepository: TagCfgRepository;
  constructor() {
    this.tagCfgRepository = getCustomRepository(TagCfgRepository);
  }
  pageByName(name: string) {
    return { test: name };
    //return this.tagCfgRepository.pageByName(name);
  }
}
