export const config = require('../package.json')

export const upName = config.name.replace(/(^\w|-\w)/g, m => m.replace('-', '').toUpperCase())
