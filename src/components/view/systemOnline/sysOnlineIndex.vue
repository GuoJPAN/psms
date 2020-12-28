<template>
  <div class="sysOnline">
    <div style="margin: 40px 0 5px 0">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="drawer = true"
        size="mini"
        >新建需求</el-button
      >
      <el-input
        placeholder="请输入搜索关键词"
        v-model="input3"
        class="input-with-select"
        style="float: right; width: 50%"
        size="mini"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          type="primary"
        ></el-button>
      </el-input>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%"
      border
      size="mini"
      @cell-click="handleRow"
      :cell-class-name="getCellIndex"
      :cell-style="setCellStyle"
    >
      <el-table-column prop="id" label="操作" width="50" align="center">
        <template slot-scope="scope">
          <i class="el-icon-delete handleData" @click="onSubmit"></i>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="modular"
        label="模块"
        width="160"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="assembly"
        label="组件名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="codeUrl"
        label="代码仓地址"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="EnvironmentalAddress"
        label="环境地址"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="需求状态"
        width="100"
        align="center"
        sortable
      >
        <template slot-scope="scope">
          <span style="color: orange">{{ scope.row.status }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="tabListPage" style="float: right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </div>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
      size="45%"
    >
      <!-- :before-close="handleClose" -->
      <div id="needDrawer" style="">
        <div style="margin: 20px"></div>
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          :model="formLabelAlign"
        >
          <el-form-item label="名称">
            <el-select
              v-model="formLabelAlign.slected"
              placeholder="请选择模块"
              size="mini"
            >
              <el-option label="员服" value="shanghai"></el-option>
              <el-option label="印章" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="组件">
            <el-select
              v-model="formLabelAlign.slected"
              placeholder="请选择组件"
              size="mini"
            >
              <el-option label="员服" value="shanghai"></el-option>
              <el-option label="印章" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="版本库地址" size="mini">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="分支" size="mini">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="测试环境">
            <el-radio-group v-model="formLabelAlign.resource">
              <el-radio label="内部云"></el-radio>
              <el-radio label="平安云"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="互联网访问">
            <el-radio-group v-model="formLabelAlign.resource">
              <el-radio label="是"></el-radio>
              <el-radio label="否（平安内网可访问）"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="测试环境地址" size="mini">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="账号密码" size="mini">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <div
            style="
              text-align: center;
              position: absolute;
              bottom: 30px;
              right: 40px;
            "
          >
            <el-button-group>
              <el-button type="primary" style="width: 100px" @click="onSubmit"
                >保存</el-button
              >
              <el-button type="primary" style="width: 100px" @click="onSubmit"
                >提交</el-button
              >
            </el-button-group>
          </div>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      drawer: false,
      // 总数据
      tableData: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [10, 20, 30, 40],
      // 默认每页显示的条数（可修改）
      PageSize: 1,
      labelPosition: 'left',
      formLabelAlign: {
        name: '',
        region: '',
        type: '',
        slected: '',
        resource: ""
      }
    }
  },
  methods: {
    // 将页码，及每页显示的条数以参数传递提交给后台
    getData (n1, n2) {
      // 这里使用axios，使用时请提前引入
      this.http.getDemandList().then(res => {
        console.log(res.data.data.tableData.length)
        this.tableData = res.data.data.tableData
        this.totalCount = res.data.data.totalCount
        this.currentPage = res.data.data.currentPage
        // console.log(this._data)
      }).catch(console.log)
    },
    // 分页
    // 每页显示的条数
    handleSizeChange (val) {
      // 改变每页显示的条数
      this.PageSize = val
      // 点击每页显示的条数时，显示第一页
      this.getData(val, 1)
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
    },
    // 显示第几页
    handleCurrentChange (val) {
      // 改变默认的页数
      this.currentPage = val
      // 切换页码时，要获取每页显示的条数
      this.getData(this.PageSize, (val) * (this.pageSize))
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    onSubmit () {
      this.$message({
        message: '恭喜发财',
        type: 'success'
      })
    },
    handleRow (row, column, cell, event) {
      console.log(row, column.index, cell, event)
      if (column.index === 2) {
        this.drawer = true
      }
    },
    getCellIndex: function ({ row, column, rowIndex, columnIndex }) {
      row.index = rowIndex
      column.index = columnIndex
    },
    setCellStyle: function ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === this.rowIndex && columnIndex === this.columnIndex) {
        return { "background-color": "#009221" }
      }
      if (columnIndex === 2) {
        return { "color": "blue", "cursor": "pointer" }
      }
    }
  },
  created: function () {
    this.getData(this.PageSize, this.currentPage)
  },
  mounted: function () {
    // this.getData(this.PageSize, this.currentPage)
  }

}
</script>

<style scoped>
.sysOnline {
  margin: 5px;
}
#needDrawer {
  padding: 8px;
}
.handleData {
  cursor: pointer;
  transition: all 0.1s;
  color: rgb(102, 177, 255);
}
.handleData:hover {
  transform: scale(1.2);
}
</style>
