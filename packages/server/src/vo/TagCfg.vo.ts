import {SwgClass,SwgProperty} from '@zhili/common/src/swagger/decorator';
import { swagger2path } from '@zhili/common/src/util';

@SwgClass()
export class TagCfgVo {
 @SwgProperty({type:"string"}) name:string;
 @SwgProperty({type:"integer"}) pageNum:number;
 
}