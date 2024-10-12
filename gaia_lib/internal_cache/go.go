package main

import (
	"fmt"
	"time"
)

type CacheItem struct {
	value  interface{}
	expiry time.Time
}

type LRUAndTTLCache struct {
	cache   map[string]CacheItem
	order   []string
	maxSize int
	ttl     time.Duration
}

func NewLRUAndTTLCache(maxSize int, ttl time.Duration) *LRUAndTTLCache {
	return &LRUAndTTLCache{
		cache:   make(map[string]CacheItem),
		order:   make([]string, 0, maxSize),
		maxSize: maxSize,
		ttl:     ttl,
	}
}

func (c *LRUAndTTLCache) Get(key string) interface{} {
	if item, found := c.cache[key]; found {
		// Kiểm tra TTL
		if time.Now().After(item.expiry) {
			// Nếu hết hạn, xóa key khỏi cache
			c.Delete(key)
			return nil
		}
		// Di chuyển key lên đầu (recent)
		c.updateOrder(key)
		return item.value
	}
	return nil
}

func (c *LRUAndTTLCache) Set(key string, value interface{}) {
	// Xóa phần tử cũ nếu cache đã đầy
	if len(c.cache) >= c.maxSize {
		oldestKey := c.order[0]
		c.Delete(oldestKey)
	}

	// Thêm phần tử mới vào cache và order
	expiry := time.Now().Add(c.ttl)
	c.cache[key] = CacheItem{value: value, expiry: expiry}
	c.updateOrder(key)
}

func (c *LRUAndTTLCache) updateOrder(key string) {
	// Xóa key cũ nếu đã tồn tại trong order
	for i, k := range c.order {
		if k == key {
			c.order = append(c.order[:i], c.order[i+1:]...)
			break
		}
	}
	// Thêm key vào cuối order
	c.order = append(c.order, key)
}

func (c *LRUAndTTLCache) Delete(key string) {
	delete(c.cache, key)
	// Xóa key khỏi order
	for i, k := range c.order {
		if k == key {
			c.order = append(c.order[:i], c.order[i+1:]...)
			break
		}
	}
}

func (c *LRUAndTTLCache) Clear() {
	c.cache = make(map[string]CacheItem)
	c.order = make([]string, 0, c.maxSize)
}

func main() {
	// Sử dụng LRUAndTTLCache trong Go
	cache := NewLRUAndTTLCache(3, 1*time.Second)

	// Lưu và truy xuất giá trị
	cache.Set("key1", 10)
	fmt.Println(cache.Get("key1")) // Output: 10

	// Đợi hơn 1 giây để TTL hết hạn
	time.Sleep(1 * time.Second)
	fmt.Println(cache.Get("key1")) // Output: <nil>
}