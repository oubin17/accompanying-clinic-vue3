import { defineStore } from 'pinia'
import { reactive } from 'vue';

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useMenuStore = defineStore('menu', () => {
  const state = reactive({
    isCollapse: false,
    selectMenu: []
  });
  const collapseMenu = () => {

    state.isCollapse = !state.isCollapse

  };

  const addMenu = (payload) => {
    //对数据去重
    if (state.selectMenu.findIndex(item => item.path === payload.path) === -1) {
      state.selectMenu.push(payload)
    }

  }

  const closeMenu = (payload) => {
    //找到点击数据的索引
    const index = state.selectMenu.findIndex(val => val.name === payload.name)
    //通过索引删除数组指定元素
    state.selectMenu.splice(index, 1)
  }

  return { state, collapseMenu, addMenu, closeMenu }
})