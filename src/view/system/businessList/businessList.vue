<template>
  <div class="businessList">
    <header>
      <div class="clearfix">
        <Input v-model="param.workOrderNo" style="ipt"><span slot="prepend">公司名称</span></Input>
        <Input v-model="param.name" style="ipt"><span slot="prepend">公司网址</span></Input>
        <Input v-model="param.phoneNo" style="ipt"><span slot="prepend">所在城市</span></Input>
      </div>
      <div class="search clearfix">
        <Input v-model="param.phoneNo" style="ipt"><span slot="prepend">联系人</span></Input>
        <Input v-model="param.phoneNo" style="ipt"><span slot="prepend">联系电话</span></Input>
        <Button type="warning" ghost icon="md-refresh">重置</Button>
        <Button type="primary" ghost icon="md-search">搜索</Button>
      </div>
      <div style="margin-top: 20px">
        <Button type="success" style="margin-right: 28px;" ghost icon="ios-add">新增新闻</Button>
        <Button type="success" ghost icon="ios-add">发布新闻</Button>
      </div>
    </header>
    <div class="conent">
      <Table class="CustomerTable" :columns="Customerhead" :data="Customerlist"></Table>
      <div class="CustomerPage">
        <div>
          <span style="vertical-align: middle;margin-right: 15px;">共 {{totalElements}} 条</span>
          <Page @on-change="changePage" @on-page-size-change="changePageSize" :total="totalElements" size="small" show-elevator show-sizer />
        </div>
      </div>
    </div>
    <Modal v-model="shownewtask" :footer-hide="true" title="新建" @on-ok="ok" className="rtask" :styles="{top: '80px',width: '680px'}">
      <div style="padding-left: 20px;height: 20px;">
        <Button style="margin-right: 10px;float: right;" @click="shownewtask=false">取消</Button>
        <Button style="margin-right: 10px;float: right;" type="primary" class="submit">提交</Button>
      </div>
    </Modal>

  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import _moment from 'moment'
export default {
  computed: {
    ...mapGetters({})
  },
  data () {
    return {
      shownewtask: false,
      genderisTwo: 'true',
      companyIdlist: [],
      userIdlist: [],
      businessTypelist: [],
      param: {
        workOrderNo: '',
        name: '',
        phoneNo: '',
        businessType: '',
        companyId: '',
        userId: '',
        pageNum: 1,
        pageSize: 10
      },
      totalElements: 10,
      name: '',
      value12: '',
      select1: 'com',
      select2: 'com',
      Customerhead: [
        {
          title: '#',
          type: 'index',
          align: 'center',
          width: 50,
          indexMethod: row => {
            return (
              row._index +
              1 +
              this.param.pageSize * this.param.pageNum -
              this.param.pageSize
            )
          }
        },
        {
          title: '公司名称',
          key: 'workOrderNo',
          align: 'center'
        },
        {
          title: '城市',
          key: 'name',
          align: 'center'
        },

        {
          title: '公司地址',
          key: 'phoneNo',
          align: 'center'
        },
        {
          title: '公司名称',
          key: 'companyName',
          align: 'center'
        },
        {
          title: '联系人',
          key: 'companyName',
          align: 'center'
        },

        {
          title: '联想电话',
          key: 'businessTypeName',
          align: 'center'
        },
        {
          title: '公司网址',
          key: 'returnVisitDate',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {},
                _moment(params.row.returnVisitDate).format('YYYY-MM-DD ')
              )
            ])
          }
        },
        {
          title: '操作',
          key: 'state',
          width: 220,
          align: 'center',
          render: (h, params) => {
            return h('Radio', {
              style: {
                marginRight: '20px'
              },
              props: {
                value: true
              }
            }, params.row.isTwo ? '是' : '否')
          }
        }
      ],
      Customerlist: []
    }
  },
  methods: {
    ...mapActions([
      // 'getroleListAction',
      // 'getuserListAction',
      // 'getbusinesstypeList',
      // 'getcstcompanyList',
      // 'getaddReturnVisitTask',
      // 'getvisitlist'
    ]),
    changePage (page) {
      this.param.pageNum = page
      this.serarchList()
    },
    changePageSize (pageSize) {
      this.param.pageNum = 1
      this.param.pageSize = pageSize
      this.serarchList()
    },

    formatDateTime (timestamp) {
      var date = new Date(timestamp.length === 10 ? timestamp * 1000 : timestamp)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      return Y + M + D
    },
    ok () {
      this.$Message.info('Clicked ok')
    },
    // 初始化加载
    initList () {
      // // 公司字典
      // this.getcstcompanyList().then(res => {
      //   if (res.message === 'SUCCESS') {
      //     this.companyIdlist = res.info
      //   }
      // })
      // // 业务类型
      // this.getbusinesstypeList().then(res => {
      //   console.log(res)
      //   if (res.message === 'SUCCESS') {
      //     this.businessTypelist = res.info
      //   }
      // })
      // // 所有员工
      // this.getuserListAction().then(res => {
      //   if (res.message === 'SUCCESS') {
      //     this.userIdlist = res.info
      //   }
      // })
    },
    // 列表数据
    serarchList () {
      // this.getvisitlist(this.param).then(res => {
      //   console.log(res)
      //   if (res.message === 'SUCCESS') {
      //     this.Customerlist = res.info.content
      //     this.totalElements = res.info.totalElements
      //   }
      // })
    },
    show (index) {
      // this.$Modal.info({
      //     title: 'User Info',
      //     content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
      // })
    },
    remove (index) {
      // this.data6.splice(index, 1);
    },
    handleSearch () {
      this.param.pageNum = 1
      this.serarchList()
    },
    handlecreateRole () {

    },
    handlerest () {
      this.param = {
        workOrderNo: '',
        name: '',
        phoneNo: '',
        businessType: '',
        companyId: '',
        userId: '',
        pageNum: 1,
        pageSize: 10
      }
      this.serarchList()
    }
  },
  mounted () {
    // this.initList()
    // this.serarchList()
  }
}
</script>
<style scoped>
.businessList {
  min-height: 750px;
}
header {
  padding: 0 30px;
}
.clearfix:after {
  content: "";
  height: 0;
  line-height: 0;
  display: block;
  visibility: hidden;
  clear: both;
}
.search {
  padding-top: 20px;
}
.search button {
  float: left;
  margin-right: 20px;
}
.conent {
  padding: 35px 30px;
}
.CustomerPage {
  height: 50px;
  margin-top: 25px;
}
</style>
<style>
.businessList .ivu-input-group-prepend {
  width: 65px;
}
.businessList .ivu-input-group {
  width: 230px;
  float: left;
  margin-right: 50px;
}
.businessList .select .ivu-input {
  padding: 0;
  border-left: none;
}
.businessList .select .ivu-input-group-append {
  background-color: #fff;
}
.businessList .CustomerPage > div {
  float: right;
  margin-right: 30px;
}
.businessList .CustomerPage .ivu-page {
  display: inline-block;
  vertical-align: middle;
}
.businessList .ivu-select-item {
  padding: 6px;
}
</style>
