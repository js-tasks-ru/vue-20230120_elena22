import { createApp, inject } from 'vue';
import TheTopProgressBar from './TheTopProgressBar.vue';
// Используйте эту константу в качестве ключа provide/inject
export const PROGRESS_KEY = Symbol('PROGRESS_KEY');
// Функция для удобного внедрения с Composition API
export function useProgress() {
  return inject(PROGRESS_KEY);
}

export function createProgress({ container, router } = {}) {
  // Решение
  const addDefaultContainer = () => document.body.appendChild(document.createElement('div'));
  const progressInstance = createApp(TheTopProgressBar, router).mount(container ?? addDefaultContainer());

  const progress = {
    start(...args) {
      progressInstance.start(...args);
    },
    finish(...args) {
      progressInstance.finish(...args);
    },
    fail: progressInstance.fail,
    install(app) {
      app.provide(PROGRESS_KEY, progress);
    },
  };
  if (router) {
    router.beforeEach((to, from, next) => {
      progress.start()
      next()
    });
    router.afterEach((to, from) => {
      progress.finish()
    })
    router.onError(error => {
      progress.fail()
    });
  }
  return progress;
}
