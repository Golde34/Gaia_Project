from collections import OrderedDict
import time

class LRUAndTTLCache:
    def __init__(self, max_size: int, ttl: int):
        self.cache = OrderedDict()
        self.max_size = max_size
        self.ttl = ttl  # TTL in seconds

    def get(self, key):
        if key in self.cache:
            value, expiry = self.cache.pop(key)
            # Kiểm tra TTL
            if time.time() > expiry:
                return None  # Trả về None nếu hết hạn
            # Di chuyển key lên đầu
            self.cache[key] = (value, expiry)
            return value
        return None

    def set(self, key, value):
        # Xóa mục ít được sử dụng nhất khi vượt quá max_size
        if len(self.cache) >= self.max_size:
            self.cache.popitem(last=False)
        expiry = time.time() + self.ttl
        self.cache[key] = (value, expiry)

    def clear(self):
        self.cache.clear()

    def clear_key(self, key):
        if key in self.cache:
            del self.cache[key]

# Sử dụng LRUAndTTLCache trong Python
cache = LRUAndTTLCache(max_size=3, ttl=1)

# Lưu và truy xuất giá trị
cache.set('key1', 10)
print(cache.get('key1'))  # Output: 10

# Đợi hơn 1 giây để TTL hết hạn
time.sleep(1.1)
print(cache.get('key1'))  # Output: None