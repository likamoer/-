/**
 * Created by xufengchao on 16/9/18.
 */
import Sequelize from 'sequelize'
import DB from '../database/seq'
import config from '../config'

let Session = config.session.status === 'off' ? null : DB.define(
  'Session', {
    sid: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    expires: Sequelize.DATE,
    data: Sequelize.STRING(20000)
  }, {
    tableName: 'Session',
    timestamps: false
  }
)

export default Session
