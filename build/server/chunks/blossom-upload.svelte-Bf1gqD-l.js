import 'clsx';

class BlossomUpload {
  blossom;
  #status = "idle";
  #progress = null;
  #result = null;
  #error = null;
  constructor(blossom) {
    this.blossom = blossom;
  }
  get status() {
    return this.#status;
  }
  get progress() {
    return this.#progress;
  }
  get result() {
    return this.#result;
  }
  get error() {
    return this.#error;
  }
  get state() {
    return {
      status: this.#status,
      progress: this.#progress,
      result: this.#result,
      error: this.#error
    };
  }
  async upload(file, options) {
    this.#status = "uploading";
    this.#progress = { loaded: 0, total: file.size, percentage: 0 };
    this.#result = null;
    this.#error = null;
    try {
      const mergedOptions = {
        ...options,
        onProgress: (progress) => {
          const percentage = Math.round(progress.loaded / progress.total * 100);
          this.#progress = { loaded: progress.loaded, total: progress.total, percentage };
          return "continue";
        }
      };
      const result = await this.blossom.upload(file, mergedOptions);
      this.#status = "success";
      this.#result = result;
      return result;
    } catch (error) {
      this.#status = "error";
      this.#error = error instanceof Error ? error : new Error(String(error));
      throw error;
    }
  }
  reset() {
    this.#status = "idle";
    this.#progress = null;
    this.#result = null;
    this.#error = null;
  }
}
function createBlossomUpload(blossom) {
  return new BlossomUpload(blossom);
}

export { createBlossomUpload as c };
//# sourceMappingURL=blossom-upload.svelte-Bf1gqD-l.js.map
