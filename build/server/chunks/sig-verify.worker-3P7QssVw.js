function WorkerWrapper(options) {
  return new Worker(
    "/_app/immutable/workers/sig-verify.worker-CgBAHr0O.js",
    {
      type: "module",
      name: options?.name
    }
  );
}

export { WorkerWrapper as default };
//# sourceMappingURL=sig-verify.worker-3P7QssVw.js.map
