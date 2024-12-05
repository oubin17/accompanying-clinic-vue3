<template>
  auth admin
</template>

<script setup>

import { userPermission } from '../../../api'
import { onMounted, reactive } from 'vue'

const pageData = reactive({
  pageNo: 1,
  pageSize: 10
})

onMounted(() => {

  const tokenExceptionCode = ['020', '021', '022']

  console.log(tokenExceptionCode.includes('022'))
  userPermission(pageData).then(({ data }) => {
    console.log(data)
  })
})
</script>

<style lang="less" scoped></style>