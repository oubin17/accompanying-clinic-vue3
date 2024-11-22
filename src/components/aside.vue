<template>
  <el-menu :style="{ width: '230px' }" active-text-color="#ffd04b" background-color="#545c64" class="aside-container"
    default-active="2" text-color="#fff" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <p class="logo-lg">DIDI陪诊</p>
    <TreeMenu :index="1" :menuData="menuData"></TreeMenu>

  </el-menu>
</template>

<script setup>
import TreeMenu from './treeMenu.vue'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { useMenuStore } from '@/stores/index.js'
const menuStore = useMenuStore()
const isCollapse = computed(() => menuStore.state.isCollapse)



const router = useRouter()
const menuData = ref(router.options.routes[0].children)
console.log(router)

const handleOpen = () => { }
const handleClose = () => { }
</script>

<style lang="less" scoped>
.aside-container {
  height: 100%;

  .logo-lg {
    font-size: 20px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: #fff
  }
}
</style>