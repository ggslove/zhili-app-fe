import { RouterStore } from 'mobx-react-router';
import User from './user';
import System from './system';
import App from './app';
import Operation from './operation';
import Build from './build';
import Sql from './sql';
import Task from './task';
const routerStore =  new RouterStore();

export const rootStore = {
  app: new App(),
  system: new System(),
  user: new User(),
  operation: new Operation(),
  build: new Build(),
  sql: new Sql(),
  task: new Task(),
  router: routerStore,
};

export { User, System, App, Operation, Build, Sql, Task }
