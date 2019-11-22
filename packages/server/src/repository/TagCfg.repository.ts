import { Repository, EntityRepository } from "typeorm";
import TagCfg from "src/entity/TagCfg.entity";
@EntityRepository(TagCfg)
export default class TagCfgRepository extends Repository<TagCfg> {
  pageByName(name: string) {
    return this.findAndCount({ name });
  }
}
