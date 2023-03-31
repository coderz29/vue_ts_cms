enum CacheType {
  Local,
  Session
}

class Cache {
  stroage: Storage

  constructor(type: CacheType) {
    this.stroage = type === CacheType.Local ? localStorage : sessionStorage
  }
  setCache(key: string, value: any) {
    if (value) {
      this.stroage.setItem(key, JSON.stringify(value))
    }
  }
  getCache(key: string) {
    const value = this.stroage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  removeCache(key: string) {
    this.stroage.removeItem(key)
  }
  clear() {
    this.stroage.clear()
  }
}

const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)

export { localCache, sessionCache }
