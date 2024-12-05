<template>
  <div class="header-container">
    <div class="header-left flex-box">
      <el-icon class="icon" size="25" @click="collapseMenu">
        <Fold />
      </el-icon>
      <ul class="flex-box">
        <li v-for="(item, index) in selectMenu" :key="item.path" :class="{ selected: route.path === item.path }"
          class="tab flex-box">
          <el-icon size="12">
            <component :is="item.icon" />
          </el-icon>
          <router-link class="text flex-box" :to="{ path: item.path }"> {{ item.name }} </router-link>

          <el-icon class="close" size="12" @click="closeTab(item, index)">
            <Close />
          </el-icon>
        </li>
      </ul>
    </div>
    <div class="header-right">
      <el-dropdown @command="handleClick">
        <div class="el-dropdown-link flex-box">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <p class="user-name">{{ userInfo.userName }}</p>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="cancel">退出</el-dropdown-item>

          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

</template>

<script setup>
import { useMenuStore } from '@/stores/index.js'
import { computed } from 'vue';

import { useRoute, useRouter } from 'vue-router'

//拿到store实例
const menuStore = useMenuStore()
const { state, collapseMenu, closeMenu } = menuStore;

const selectMenu = computed(() => state.selectMenu)

const userInfo = JSON.parse(localStorage.getItem('userInfo'))


//当前路由对象
const route = useRoute()
const router = useRouter()

//点击关闭tab
const closeTab = (item, index) => {
  closeMenu(item)
  //删除非当前页tag
  if (route.path !== item.path) {
    return
  }
  const selectMenuDate = selectMenu.value
  if (index === selectMenuDate.length) {
    //如果tag只有一个
    if (!selectMenuDate.length) {
      router.push('/')
    } else {
      router.push({
        path: selectMenuDate[index - 1].path
      })
    }
  } else {
    //如果删除的是中间位置
    console.log("删除中间位置")
    router.push({
      path: selectMenuDate[index].path
    })
  }
}

const handleClick = (command) => {

  if (command === 'cancel') {
    localStorage.removeItem('odk-token')
    localStorage.removeItem('userInfo')

    window.location.href = window.location.origin
  }
}

</script>

<style lang="less" scoped>
.flex-box {
  display: flex;
  align-items: center;
  height: 100%;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background-color: #fff;
  padding-right: 25px;

  .header-left {
    height: 100%;

    .icon {
      width: 45px;
      height: 100%;
    }

    .icon:hover {
      background-color: #f5f5f5;
      cursor: pointer;
    }

    .tab {
      padding: 0 10px;
      height: 100%;

      .text {
        margin: 0 5px;
      }

      .close {
        visibility: hidden;
      }

      &.selected {
        a {
          color: #409eff;
        }

        i {
          color: #409eff;
        }

        background-color: #f5f5f5;
      }
    }

    .tab:hover {
      background-color: #f5f5f5;

      .close {
        visibility: inherit;
        cursor: pointer;
        color: #000;
      }
    }
  }

  .header-right {
    .user-name {
      margin-left: 10px;
    }
  }

  a {
    height: 100%;
    color: #333;
    font-size: 15px;
  }
}
</style>