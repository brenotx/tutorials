/*jshint esversion: 6 */
import {createStore} from 'redux';
import reducer from './reducer';

/**
* A Reduz Store is initialized with a reducer function
*/
export default function makeStore() {
  return createStore(reducer);
}
