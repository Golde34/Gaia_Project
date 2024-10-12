import { InternalCacheConstants } from "../../core/domain/constants/constants";

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
        const internalKey = InternalCacheConstants.CACHE_PREFIX + key + InternalCacheConstants.CACHE_POSTFIX;        
        const cacheItem = this.cache.get(internalKey);

        if (!cacheItem || Date.now() > cacheItem.expiry) {
            if (cacheItem) {
                this.cache.delete(internalKey);
            }
            return undefined;
        }

        this.cache.delete(internalKey);
        this.cache.set(internalKey, cacheItem);
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
        this.cache.set(this.generateInternalCacheKey(key), { value, expiry });
    }

    /**
     * Remove the value from the cache
     * 
     * @param key 
     */
    public clear(key: string): void {
        const internalKey = InternalCacheConstants.CACHE_PREFIX + key + InternalCacheConstants.CACHE_POSTFIX;
        this.cache.delete(internalKey);
    }
    
    /**
     * Clear the cache
     */
    public clearAll(): void {
        this.cache.clear();
    }

    /**
     * Generate internal cache key
     * 
     * @param key
     * @returns
     */
    public generateInternalCacheKey(key: string): string {
        return `${InternalCacheConstants.CACHE_PREFIX}${key}${InternalCacheConstants.CACHE_POSTFIX}`;
    }
}

export default InternalCache;