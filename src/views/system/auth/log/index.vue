<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.trace_id" placeholder="trace_id" style="width: 200px;" class="filter-item"
        @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.name" placeholder="名称" style="width: 200px;" class="filter-item"
        @keyup.enter.native="handleFilter" />
        <el-input v-model="listQuery.user_id" placeholder="user_id" style="width: 200px;" class="filter-item"
        @keyup.enter.native="handleFilter" />
        <el-input v-model="listQuery.username" placeholder="username" style="width: 200px;" class="filter-item"
        @keyup.enter.native="handleFilter" />
        <el-input v-model="listQuery.role" placeholder="角色" style="width: 200px;" class="filter-item"
        @keyup.enter.native="handleFilter" />
        <el-input v-model="listQuery.ip" placeholder="ip" style="width: 200px;" class="filter-item"
        @keyup.enter.native="handleFilter" />
        <el-input v-model="listQuery.operation" placeholder="operation" style="width: 200px;" class="filter-item"
        @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>

    </div>

    <el-table v-loading="listLoading" :data="list" border style="width: 100%;">
      <el-table-column label="ID" prop="id" align="center">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="id" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="trace_id" prop="id" align="center">
        <template slot-scope="{row}">
          <span>{{ row.trace_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="user_id" prop="id" align="center">
        <template slot-scope="{row}">
          <span>{{ row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="username" prop="id" align="center">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" prop="id" align="center">
        <template slot-scope="{row}">
          <span>{{ row.role }}</span>
        </template>
      </el-table-column>
      <el-table-column label="请求方式" prop="id" align="center">
        <template slot-scope="{row}">
          <span>{{ row.method }}</span>
        </template>
      </el-table-column>
      <el-table-column label="kratos路径" prop="id" align="center">
        <template slot-scope="{row}">
          <span>{{ row.operation }}</span>
        </template>
      </el-table-column>
      <el-table-column label="请求path" prop="id" align="center">
        <template slot-scope="{row}">
          <span>{{ row.path }}</span>
        </template>
      </el-table-column>
      <el-table-column label="请求参数" prop="id" align="center">
        <template slot-scope="{row}">
          <span class="spanStyle" :title="row.request">{{ row.request }}</span>
          <el-button type="text" icon="el-icon-view" @click="showRequestDialog(row.request)"></el-button>
          <el-dialog title="请求内容" :visible.sync="dialogVisible">
            <span class="dialogContent">{{ dialogContent }}</span>
            <div class="copyButtonContainer">
        <el-button type="primary" icon="el-icon-document-copy" @click="copyDialogContent">复制</el-button>
      </div>
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column label="返回code" prop="id" align="center">
        <template slot-scope="{row}">
          <span>{{ row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="返回reason" prop="id" align="center">
        <template slot-scope="{row}">
          <span>{{ row.reason }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ip" prop="id" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="响应时长" prop="id" align="center">
        <template slot-scope="{row}">
          <span>{{ row.latency }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createdAt" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createdAt }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize"
      @pagination="getList" />
  </div>
</template>

<script>
import { listLog } from '@/api/auth/log'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import VueClipboard from 'vue-clipboard2';

export default {
  name: 'log',
  components: { Pagination, VueClipboard },
  directives: { waves },
  filters: {
  },
  data() {
    return {
      dialogVisible: false, // 控制弹出框的显示和隐藏
      dialogContent: '', // 存储请求内容
      isDisabled: false,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 20,
        name: undefined,
        trace_id: undefined,
        user_id: undefined,
        username: undefined,
        role: undefined,
        operation: undefined,
        ip: undefined
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      listLog(this.listQuery).then(response => {
        this.list = response.list
        this.total = parseInt(response.total)
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },

    resetTemp() {
      this.isDisabled = false;
      this.temp = {
        id: undefined,
        name: undefined,
        group: undefined,
        path: undefined,
        method: undefined,
      }
    },
    showRequestDialog(content) {
      this.dialogContent = content; // 设置请求内容
      this.dialogVisible = true; // 显示弹出框
    },
    copyDialogContent() {
      const textarea = document.createElement('textarea');
      textarea.value = this.dialogContent;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.$message.success('已复制到剪贴板');
    },
  }
}
</script>

<style>
.spanStyle {
  display: inline-block;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.copyButtonContainer {
  text-align: center;
  margin-top: 10px;
}
</style>