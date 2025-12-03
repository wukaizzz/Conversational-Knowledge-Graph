/**
 * 全局节流工具函数（Vue 专用，无 NodeJS 依赖）
 * @param fn 要节流的目标函数
 * @param delay 节流时间间隔（毫秒），默认 300ms
 * @param options 节流配置（可选）
 * - leading: 是否在节流开始时立即执行一次（默认 true）
 * - trailing: 是否在节流结束后补充执行一次（默认 true）
 * @returns 节流后的函数 + cancel 取消方法
 */
function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300,
  options: { leading?: boolean; trailing?: boolean } = {}
): ((...args: Parameters<T>) => ReturnType<T> | undefined) & { cancel: () => void } {
  const { leading = true, trailing = true } = options;

  let lastExecuteTime = 0;
  // 关键修改：用 number 类型（浏览器环境 setTimeout 返回 number）
  let timerId: number | undefined = undefined;
  let lastArgs: Parameters<T> | null = null;

  const throttled = (...args: Parameters<T>): ReturnType<T> | undefined => {
    const currentTime = Date.now();
    lastArgs = args;

    const remainingTime = delay - (currentTime - lastExecuteTime);

    // leading 逻辑
    if (remainingTime <= 0 && leading) {
      if (timerId !== undefined) {
        clearTimeout(timerId);
        timerId = undefined;
      }
      lastExecuteTime = currentTime;
      return fn(...args);
    }

    // trailing 逻辑
    if (trailing && timerId === undefined) {
      timerId = window.setTimeout(() => { // 显式用 window.setTimeout，增强浏览器兼容性
        lastExecuteTime = leading ? Date.now() : 0;
        timerId = undefined;
        if (lastArgs) {
          fn(...lastArgs);
          lastArgs = null;
        }
      }, remainingTime);
    }

    return undefined;
  };

  // 取消方法
  throttled.cancel = () => {
    if (timerId !== undefined) {
      clearTimeout(timerId);
      timerId = undefined;
    }
    lastExecuteTime = 0;
    lastArgs = null;
  };

  return throttled;
}

export default throttle;