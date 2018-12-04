/* global window */
import request from './request';
import worker from './task';
import WebWorker from './WebWorker';

const webWork = new WebWorker(worker);
export {
  request,
  webWork
}
