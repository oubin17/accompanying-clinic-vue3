<template>
  <el-button plain @click="dialogFormVisable = true">
    打开
  </el-button>
  <el-dialog v-model="dialogFormVisable" :before-close="beforeClose" title="添加权限" width="500px">

    <el-form ref="formRef" label-width="100px" laber-position="left" :model="formData" :rules="rules">
      <el-form-item label="角色id" v-show="false" prop="id">
        <el-input v-model="formData.id" />
      </el-form-item>

      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="formData.roleName" placeholder="请填写角色名称" />
      </el-form-item>

      <el-form-item label="角色码" prop="roleCode">
        <el-input v-model="formData.roleCode" placeholder="请填写角色码" />
      </el-form-item>

      <el-form-item label="权限" prop="permissions">
        <el-tree ref="treeRef" style="max-width: 600px;" :data="permissionData" node-key="id" show-checkbox
          :props="defaultProps" :default-checked-keys="defaultKeys">

        </el-tree>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="confirm(formRef)">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { permissionList, addRole, allRole } from '../../../api'
import { da } from 'element-plus/es/locales.mjs';

//弹窗的显示隐藏
const dialogFormVisable = ref(false)

//请求列表参数

const pageData = reactive({
  pageNum: 0,
  pageSize: 10
})

//请求列表数据
const getListData = () => {
  allRole(pageData).then(({ data }) => {
    console.log(data)
  })
}

const formRef = ref()
//form数据
const formData = reactive({
  id: '',
  roleName: '',
  roleCode: '',
  permissions: '',
  permissionName: '',
  permissionCode: ''
})

//树形菜单权限数据
const permissionData = ref([])

const defaultProps = {
  children: 'children',
  label: 'permissionName',
}

//关闭弹窗回调
const beforeClose = () => {
  dialogFormVisable.value = false
}

//选中权限
const defaultKeys = [4, 5]
const treeRef = ref({})

//表单校验
const rules = reactive({
  roleName: [{ required: true, trigger: 'blur', message: '请输入角色名称' }],
  roleCode: [{ required: true, trigger: 'blur', message: '请输入角色码' }]
})

//表单提交
const confirm = async (formEl) => {
  if (!formEl) return
  //手动触发表单校验

  await formEl.validate((valid, fields) => {
    if (valid) {
      //获取到选择的checkbox数据
      addRole({ roleId: formData.id, roleCode: formData.roleCode, roleName: formData.roleName, permissionIds: treeRef.value.getCheckedKeys() }).then(({ data }) => {
        console.log(data)
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

onMounted(() => {
  //菜单数据
  permissionList().then(({ data }) => {
    permissionData.value = data.data
  })

  getListData()
})
</script>

<style lang="less" scoped></style>