import 'clsx';

class ToastStore {
  messages = [];
  generateId() {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  show(message, type, duration = 3e3) {
    const id = this.generateId();
    const toast2 = { id, message, type, duration };
    this.messages = [...this.messages, toast2];
    if (duration > 0) {
      setTimeout(
        () => {
          this.dismiss(id);
        },
        duration
      );
    }
    return id;
  }
  success(message, duration) {
    return this.show(message, "success", duration);
  }
  error(message, duration) {
    return this.show(message, "error", duration);
  }
  info(message, duration) {
    return this.show(message, "info", duration);
  }
  dismiss(id) {
    this.messages = this.messages.filter((t) => t.id !== id);
  }
}
const toast = new ToastStore();

export { toast as t };
//# sourceMappingURL=toast.svelte-BEvONWAz.js.map
