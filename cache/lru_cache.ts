export class LRUCache<T> {
  #maxSize: number;
  #size = 0;
  #cache: Record<string, T | undefined> = Object.create(null);
  #cache2: Record<string, T | undefined> = Object.create(null);

  constructor(maxSize: number) {
    this.#maxSize = maxSize;
  }

  get maxSize() {
    return this.#maxSize;
  }

  get size() {
    return this.#size;
  }

  #update(key: string, value: T) {
    this.#cache[key] = value;
    this.#size++;
    if (this.#size >= this.#maxSize) {
      this.#size = 0;
      this.#cache2 = this.#cache;
      this.#cache = Object.create(null);
    }
  }

  get(key: string): T | undefined {
    const v = this.#cache[key];
    if (v !== undefined) return v;

    const v2 = this.#cache2[key];
    if (v2 === undefined) return;

    this.#update(key, v2);
    return v2;
  }

  set(key: string, value: T) {
    if (this.#cache[key] !== undefined) {
      this.#cache[key] = value;
    } else {
      this.#update(key, value);
    }
  }

  peek(key: string): T | undefined {
    let v = this.#cache[key];
    if (v !== undefined) return v;
    if ((v = this.#cache2[key]) !== undefined) {
      return v;
    }
  }

  delete(key: string) {
    if (this.#cache[key] !== undefined) {
      this.#cache[key] = undefined;
      this.#size--;
    }
    if (this.#cache2[key] !== undefined) {
      this.#cache2[key] = undefined;
    }
  }

  clear() {
    this.#size = 0;
    this.#cache = Object.create(null);
    this.#cache2 = Object.create(null);
  }
}
