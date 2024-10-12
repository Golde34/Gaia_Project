class InternalCache<T> {
    private cache: Map<string, { value: T, expiry: number }> = new Map();
    private maxSize: number;
    private ttl: number;

    constructor(maxSize: number, ttl: number) {
        this.maxSize = maxSize;
        this.ttl = ttl;
    }

    /**
     * Get the value from the cache
     * If the key is not found or the value has expired, return undefined
     * If the value is found, update the expiry time and return the value
     *  
     * @param key 
     * @returns 
     */
    public get(key: string): T | undefined {
        const cacheItem = this.cache.get(key);

        if (!cacheItem || Date.now() > cacheItem.expiry) {
            if (cacheItem) {
                this.cache.delete(key);
            }
            return undefined;
        }

        this.cache.delete(key);
        this.cache.set(key, cacheItem);
        return cacheItem.value;
    }

    /**
     * Set the value in the cache
     * If the cache is full, remove the oldest item
     * 
     * @param key 
     * @param value 
     */
    public set(key: string, value: T): void {
        if (this.cache.size >= this.maxSize) {
            const oldestKey = this.cache.keys().next().value;
            if (oldestKey !== undefined) {
                this.cache.delete(oldestKey);
            }
        }
        const expiry = Date.now() + this.ttl;
        this.cache.set(key, { value, expiry });
    }

    /**
     * Remove the value from the cache
     * 
     * @param key 
     */
    public clear(key: string): void {
        this.cache.delete(key);
    }
    
    /**
     * Clear the cache
     */
    public clearAll(): void {
        this.cache.clear();
    }
}