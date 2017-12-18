import path from 'path'

let opts = {
  pro: process.env.NODE_ENV === 'production',
  path: {
    base: __dirname,
    logs: '../logs',
    public: '../public',
    views: '../public',
    favicon: '../resource/favicon.png',
    get logsAbs () {
      return path.resolve(this.base, this.logs)
    },
    get publicAbs () {
      return path.resolve(this.base, this.public)
    },
    get viewsAbs () {
      return path.resolve(this.base, this.views)
    },
    get faviconAbs () {
      return path.resolve(this.base, this.favicon)
    }
  },
  // 服务类型
  secheme: 'http',
  port: 5071,
  host: '127.0.0.1',
  // 请求字节限制
  limit: '50mb',
  // session
  session: {
    status: 'off', // 开启 on, 关闭 off
    secret: '~Yoursecret~',
    checkExpirationInterval: 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    expiration: 3 * 60 * 1000 // The maximum age (in milliseconds) of a valid session.
  },
  // 存储
  db: {
    mysql: null,
    // mysql: {
    //   host: '127.0.0.1',
    //   user: 'root',
    //   password: 'zxcvbnm',
    //   database: 'train',
    //   connectionLimit: 10,      // 连接池上限
    //   multipleStatements: true  // 多语句组合
    // },
    sequelize: null
    // sequelize: {
    //   dialect: 'mysql',         // 数据库类型
    //   host: '101.199.126.121',
    //   port: '3306',
    //   username: 'root',
    //   password: 'wrk#%%^lsf',
    //   database: 'train'
    // }
  },
  time: {
    formatStr: 'YYYY-MM-DD HH:mm:ss'
  },
  app: {
    title: 'Your App Title'
  }
}

opts.port = process.env.PORT || opts.port
opts.host = process.env.HOST || opts.host

// check config
if (opts.session.status === 'on' && opts.db.sequelize === null) {
  throw new Error('配置异常, 启用Session时必须配置db.sequelize')
}

export default opts
