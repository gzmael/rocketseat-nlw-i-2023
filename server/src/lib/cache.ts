import NodeCache from 'node-cache'

export const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 })

export const invalidateAllKeys = () => {
  const keysCache = myCache.keys()
  myCache.del(keysCache)
}
