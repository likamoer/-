/**
 * Created by xufengchao on 16/9/11.
 * Sequelize Config
 */

import Sequelize from 'sequelize'
import config from '../config'

export default new Sequelize(
  config.db.sequelize || {}
)
