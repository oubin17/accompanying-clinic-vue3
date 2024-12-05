<template>
  <panel-head />
  <div class="btns">
    <el-button :icon="Plus" type="primary" @click="open(null)" size="small">
      新增
    </el-button>
  </div>

  <el-table :data="tableData.list" style="width: 100%;">
    <el-table-column prop="id" label="id" />
    <el-table-column prop="roleCode" label="角色码" />
    <el-table-column prop="roleName" label="角色名称" />
    <el-table-column prop="status" label="角色状态" />
    <el-table-column prop="permissions" label="权限集合" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" @click="open(scope.row)">编辑</el-button>
      </template>

    </el-table-column>
  </el-table>

  <div class="pagination-info">
    <el-pagination v-model:current-page="pageData.pageNo" :page-size="pageData.pageSize" :size="size"
      :background="false" layout="total, prev, pager, next" :total="tableData.total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>



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
import { ref, reactive, onMounted, nextTick } from 'vue'
import { permissionList, addRole, roleList } from '../../../api'
import { Plus } from '@element-plus/icons-vue'

//弹窗的显示隐藏
const dialogFormVisable = ref(false)

//请求列表参数

const pageData = reactive({
  pageNo: 1,
  pageSize: 2
})

const handleSizeChange = () => {

}

const handleCurrentChange = (val) => {
  pageData.pageNo = val
  getListData()
}

//请求列表数据
const getListData = () => {
  roleList(pageData).then(({ data }) => {
    const { roles, totalCount } = data.data
    tableData.list = roles
    tableData.total = totalCount
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
  //重置表单
  formRef.value.resetFields()
  treeRef.value.setCheckedKeys(defaultKeys)
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
        dialogFormVisable.value = false
        getListData()
      })

    } else {
      console.log('error submit!', fields)
    }
  })
}

const open = (rowData = {}) => {
  dialogFormVisable.value = true
  //form弹窗打开，form生成是异步的
  nextTick(() => {
    if (rowData) {
      Object.assign(formData, { id: rowData.id, roleCode: rowData.roleCode, roleName: rowData.roleName })
      treeRef.value.setCheckedKeys(rowData.permissions)
    }
  })
}

//列表数据
const tableData = reactive({
  list: [],
  total: 0
})
onMounted(() => {
  //菜单数据
  permissionList().then(({ data }) => {
    permissionData.value = data.data
  })

  getListData()
})
</script>

<style lang="less" scoped>
.pagination-info {
  display: flex;
  justify-content: flex-end;
}

.btns {
  padding: 10px 0 10px 10px;
  background-color: #fff;
}
</style>