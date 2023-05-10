import * as fcl from '@onflow/fcl';
import environment from '../environment/environment';

export default async function bootstrap() {
  fcl.config(environment.fcl);
}
