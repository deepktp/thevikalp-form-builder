import { ICustomEvent } from '@thevikalp/designable-shared';
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';

export class DragNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'drag:node';
}
