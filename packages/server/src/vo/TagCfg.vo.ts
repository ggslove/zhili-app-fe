import {SwgClass,SwgProperty} from '@zhili/common/src/swagger/decorator';

@SwgClass()
export class TagCfgVo {
 @SwgProperty({type:"string"}) name:string;
}