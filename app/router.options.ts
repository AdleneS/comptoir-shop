export default {
  scrollBehavior(to, from, savedPosition) {
    return;
    return new Promise((resolve) => {
      setTimeout(() => {
        const el = document.querySelector("main");
        if (el) el.scrollTo({ top: 0 });
        resolve({ top: 0 });
      }, 50);
    });
  },
};
