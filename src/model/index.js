/**
 * Created by xufengchao on 16/9/11.
 * Models
 */

import DB from '../database/seq'
import Session from './Session'
import config from '../config'

// demo
import Person from './PersonTest'

config.db.sequelize && DB.authenticate()
  .then(function () {
    // Create Model Relationship
    // ...
    // Flush DB or Flush Your Model
    return DB.sync()
  })
  .then(function () {
    // Your Table Force Sync
    // force: true
  })
  .catch(function () {
    throw new Error('连接数据库失败')
  })

export { Session, Person }
