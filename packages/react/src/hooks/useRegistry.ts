import { GlobalRegistry, IDesignerRegistry } from '@thevikalp/designable-core';
import { globalThisPolyfill } from '@thevikalp/designable-shared';

export const useRegistry = (): IDesignerRegistry => {
  return globalThisPolyfill['__DESIGNER_REGISTRY__'] || GlobalRegistry;
};
