import { Block } from '../';
import { store, StoreEvents } from '../../store';

export function connect(Component: typeof Block) {
  return class extends Component {
    constructor(props: {} | undefined) {
      super({ ...props, ...store.getState() });

      store.on(StoreEvents.Updated, () => {
        this.setProps({ ...store.getState() });
      });
    }
  };
}
