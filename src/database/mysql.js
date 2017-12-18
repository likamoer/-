/**
 * Created by xufengchao on 16/9/11.
 * Mysql Config
 */

import mysql from 'mysql'
import config from '../config'

export default mysql.createPool(config.db.mysql)
