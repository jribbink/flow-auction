import * as fcl from '@onflow/fcl';
import environment from '../environment/environment';
import axios from 'axios';

export default async function bootstrap() {
  // Configure fcl
  fcl.config(environment.fcl);

  // Configure axios
  axios.defaults.baseURL = environment.apiUrl;

  // Bind tcl to window for debugging
  if (environment.evenironment !== 'production') (window as any).fcl = fcl;
}
