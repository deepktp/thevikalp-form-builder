import { ICustomEvent } from '@thevikalp/designable-shared';
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';

export class CloneNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'clone:node';
}
