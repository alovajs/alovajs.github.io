---
title: 服务端L2存储实践
sidebar_position: 80
---

## 文件存储适配器

每个文件为一个缓存项，文件名为缓存的 key。

```ts
import { promises as fs } from 'fs';
import * as path from 'path';
import { AlovaGlobalCacheAdapter } from 'alova';

class FileStorageAdapter implements AlovaGlobalCacheAdapter {
  private directory: string;

  constructor(directory: string) {
    this.directory = directory;
  }

  private getFilePath(key: string) {
    return path.join(this.directory, `${key}.json`);
  }

  async set(key: string, value: any) {
    const filePath = this.getFilePath(key);
    const data = JSON.stringify(value);
    await fs.mkdir(this.directory, { recursive: true });
    await fs.writeFile(filePath, data, 'utf8');
  }

  async get<T>(key: string): Promise<T | undefined> {
    const filePath = this.getFilePath(key);
    try {
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data) as T;
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        return undefined;
      }
      throw error;
    }
  }

  async remove(key: string) {
    const filePath = this.getFilePath(key);
    try {
      await fs.unlink(filePath);
    } catch (error: any) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
  }

  async clear() {
    const files = await fs.readdir(this.directory);
    const unlinkPromises = files.map(file => fs.unlink(path.join(this.directory, file)));
    await Promise.all(unlinkPromises);
  }
}
```

用法

```ts
const alovaInstance = createAlova({
  // ...
  l2Cache: new FileStorageAdapter('tmp_cache')
});
```

## Redis 适配器

```ts
import Redis from 'ioredis';
import { AlovaGlobalCacheAdapter } from 'alova';

class RedisStorageAdapter implements AlovaGlobalCacheAdapter {
  private client: Redis;
  private cachePrefix: string;

  constructor(options: Redis.RedisOptions, cachePrefix = 'alova:') {
    this.client = new Redis(options);
    this.cachePrefix = cachePrefix;
  }

  // Save or update cache
  async set(key: string, value: [any, number]) {
    const [data, expireTs] = value;
    const now = Date.now();
    const dataToStore = JSON.stringify(data);

    // Calculate the TTL in milliseconds
    const ttl = expireTs - now;
    if (ttl > 0) {
      await this.client.set(this.cachePrefix + key, dataToStore, 'PX', ttl);
    }
  }

  // Get value by key
  async get<T>(key: string): Promise<T | undefined> {
    const data = await this.client.get(this.cachePrefix + key);
    if (!data) {
      return undefined;
    }
    return JSON.parse(data);
  }

  // Remove item
  async remove(key: string) {
    await this.client.del(this.cachePrefix + key);
  }

  // Clear all cache
  async clear() {
    console.log('redis cache clear is not allowed');
  }
}
```

用法

```ts
const alovaInstance = createAlova({
  // ...
  l2Cache: new RedisStorageAdapter(
    {
      host: 'localhost',
      port: 6379,
      password: 'yourpassword',
      db: 0
    },
    'myprefix:'
  )
});
```
