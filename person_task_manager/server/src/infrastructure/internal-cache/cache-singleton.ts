class CacheSingleTon {
    static instance = null;

    constructor () {
        if (!CacheSingleTon.instance) {
            this.cache = new InternalCache(100, 600);

        }
    }
}