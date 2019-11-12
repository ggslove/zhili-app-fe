import { Repository,EntityRepository} from 'typeorm';
import {TagCfg} from '@zhili/character-tag/src';

@EntityRepository(TagCfg)
export default class TagCfgRepository extends Repository<TagCfg>{
  pageByName(name:string){
    return this.findAndCount({name});
  }
}