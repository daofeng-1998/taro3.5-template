/**
 * 临时存取缓存数据，可用于页面跳转时传递大量数据，存入的数据仅可被读取一次，而后将会销毁
 */
class Cache {
    private cachePool: Map<string, any> = new Map<string, any>();

    /**
     * 存一个缓存数据，返回该数据在缓存池中对应的key
     * @param data
     */
    set(data): string {
        const key = `cache_${Math.random().toString().substring(2)}`;
        this.cachePool.set(key, data);
        return key;
    }

    /**
     * 从缓存中取出数据，成功取出后，缓存数据将被销毁
     * @param key
     */
    get<T,>(key: string): T | undefined {
        if (!this.cachePool.has(key))
            return undefined; // 如果缓存池中没有指定key的数据，则直接返回null

        const data: T = this.cachePool.get(key); // 如果有则取出
        this.cachePool.delete(key); // 然后删除该数据
        return data;
    }

    clear(): void {
        this.cachePool.clear();
    }
}

export default new Cache();
