<template>
  <div class="returntask">
    <header>
      <div class="clearfix">
        <Input v-model="param.workOrderNo" style="ipt"><span slot="prepend">工作号</span></Input>
        <Input v-model="param.name" style="ipt"><span slot="prepend">客户姓名</span></Input>
        <Input v-model="param.phoneNo" style="ipt"><span slot="prepend">客户电话</span></Input>
        <Input v-model="param.businessType" class="select">
        <span slot="prepend">业务类型</span>
        <Select v-model="param.businessType" slot="append" style="width: 164px">
          <Option :value="item.id" v-for="(item, index) in businessTypelist" :key="index">{{item.name}}</Option>
        </Select>
        </Input>
      </div>
      <div class="search clearfix">
        <Input v-model="param.companyId" class="select">
        <span slot="prepend">公司名称</span>
        <Select v-model="param.companyId" slot="append" style="width: 164px">
          <Option :value="item.id" v-for="(item, index) in companyIdlist" :key="index">{{item.name}}</Option>
        </Select>
        </Input>
        <Input v-model="param.userId" class="select">
        <span slot="prepend">负责员工</span>
        <Select v-model="param.userId" slot="append" style="width: 164px">
          <Option :value="item.id" v-for="(item, index) in userIdlist" :key="index">{{item.name}}</Option>
        </Select>
        </Input>
        <Button type="primary" ghost icon="md-search" @click='handleSearch'>搜索</Button>
        <Button type="info" ghost icon="md-add" @click='shownewtask=true'>新建</Button>
        <Button type="warning" ghost icon="md-refresh" @click='handlerest'>重置</Button>
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
    <Modal v-model="shownewtask" :footer-hide="true" title="新建" @on-visible-change="visibleModal" @on-ok="ok" className="rtask" :styles="{top: '80px',width: '680px'}">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="88" style="height: 180px;">
        <FormItem label="公司名称" prop="companyId" class="float">
          <Select v-model="formValidate.companyId" style="width:200px">
            <!-- <Option v-for="item in businessTypelist" :value="item.id" :key="item.id">{{ item.name }}</Option> -->
            <Option :value="item.id" v-for="(item, index) in companyIdlist" :key="index">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="负责员工" prop="userId" class="float">
          <Select v-model="formValidate.userId" style="width:200px">
            <!-- <Option v-for="item in businessTypelist" :value="item.id" :key="item.id">{{ item.name }}</Option> -->
            <Option :value="item.id" v-for="(item, index) in userIdlist" :key="index">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="业务类型" prop="businessType" class="float">
          <Select v-model="formValidate.businessType" style="width:200px">
            <!-- <Option v-for="item in businessTypelist" :value="item.id" :key="item.id">{{ item.name }}</Option> -->
            <Option :value="item.id" v-for="(item, index) in businessTypelist" :key="index">{{item.name}}</Option>
          </Select>
        </FormItem>

        <FormItem label="回访时间" class="float" prop="returnVisitDate">
          <DatePicker type="date" placeholder="" v-model="formValidate.returnVisitDate" style="width: 200px"></DatePicker>
        </FormItem>
        <!-- <FormItem label="人均数量">
          <Input v-model="formValidate.perCapitaNum" placeholder="" style="width: 230px"></Input>
        </FormItem> -->

        <div class="selectdata float" style="padding-top: 10px;">
          <span style="margin-left:20px; margin-right: 20px;">选择数据方式</span>
          <RadioGroup v-model="genderisTwo" class="Radiodata">
            <Radio label="true" style=" margin-right: 20px;">是</Radio>
            <Radio label="false">否</Radio>
          </RadioGroup>
        </div>
      </Form>
      <div style="padding-left: 20px;height: 20px;">
        <Button style="margin-right: 10px;float: right;" @click="shownewtask=false">取消</Button>
        <Button style="margin-right: 10px;float: right;" type="primary" @click="handleSubmit('formValidate')" class="submit">提交</Button>
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
    const validatecompanyId = (rule, value, callback) => {
      if (value === '' || value.length === 0) {
        callback(new Error('请选择公司'))
      } else {
        callback()
      }
    }
    const validateretime = (rule, value, callback) => {
      if (value === '' || value.length === 0) {
        callback(new Error('请选择时间'))
      } else {
        callback()
      }
    }
    const validateuserId = (rule, value, callback) => {
      if (value === '' || value.length === 0) {
        callback(new Error('请选择员工'))
      } else {
        callback()
      }
    }
    const validatebusinessType = (rule, value, callback) => {
      if (value === '' || value.length === 0) {
        callback(new Error('请选择业务类型'))
      } else {
        callback()
      }
    }
    return {
      shownewtask: false,
      genderisTwo: 'true',
      formValidate: {
        companyId: '',
        businessType: '',
        isTwo: true,
        returnVisitDate: this.formatDateTime(new Date()),
        userId: ''
      },
      ruleValidate: {

        companyId: [
          { required: true, validator: validatecompanyId, trigger: 'change' }
        ],
        userId: [
          { required: true, validator: validateuserId, trigger: 'change' }
        ],
        returnVisitDate: [
          { required: true, validator: validateretime, trigger: 'change' }
        ],
        businessType: [
          { required: true, validator: validatebusinessType, trigger: 'change' }
        ]
      },
      companyIdlist: [], // 公司字典
      userIdlist: [], // 所有员工
      businessTypelist: [], // 业务类型
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
          title: '工单号',
          key: 'workOrderNo',
          align: 'center'
        },
        {
          title: '客户姓名',
          key: 'name',
          align: 'center'
        },

        {
          title: '客户电话',
          key: 'phoneNo',
          align: 'center'
        },
        {
          title: '公司名称',
          key: 'companyName',
          align: 'center'
        },

        {
          title: '业务类型',
          key: 'businessTypeName',
          align: 'center'
        },
        {
          title: '回访时间',
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
        // {
        //   title: '创建时间',
        //   key: 'createDate',
        //   align: 'center',
        //   render: (h, params) => {
        //     return h('div', [
        //       h(
        //         'span',
        //         {},
        //         _moment(params.row.createDate).format('YYYY-MM-DD ')
        //       )
        //     ])
        //   }
        // },
        {
          title: '负责员工',
          key: 'userName',
          align: 'center'
        },
        // {
        //   title: '是否二次合作',
        //   key: 'state',
        //   width: 220,
        //   align: 'center',
        //   render: (h, params) => {
        //     var isTwo = params.row.isTwo + ''
        //     console.log(isTwo)
        //     return h('RadioGroup', {
        //       props: {
        //         value: params.row.isTwo + ''
        //       },
        //       on: {
        //         'on-change': (status) => {
        //           console.log(status)
        //         }
        //       }
        //     }, [
        //       h('Radio', {
        //         style: {
        //           marginRight: '20px'
        //         },
        //         props: {
        //           label: 'true',
        //           disabled: true,
        //         }
        //       }, '是'),
        //       h('Radio', {
        //         props: {
        //           label: 'false',
        //           disabled: true,
        //         }
        //       }, '否')
        //     ]
        //     )
        //   }
        // },
        {
          title: '是否二次合作',
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
    visibleModal (visible) {
      this.$refs['formValidate'].resetFields()
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.genderisTwo === 'true' ? this.formValidate.isTwo = true : this.formValidate.isTwo = false
          this.formValidate.returnVisitDate = this.formatDateTime(this.formValidate.returnVisitDate)
          console.log(this.formValidate)
          this.getaddReturnVisitTask(this.formValidate).then(res => {
            console.log(res)
            if (res.code === '0') {
              this.shownewtask = false
              this.$Message.success('success')
              this.serarchList()
            } else {
              this.$Message.error(res.message)
            }
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
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
.returntask {
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
.returntask .ivu-input-group-prepend {
  width: 65px;
}
.returntask .ivu-input-group {
  width: 230px;
  float: left;
  margin-right: 20px;
}
.returntask .select .ivu-input {
  padding: 0;
  border-left: none;
}
.returntask .select .ivu-input-group-append {
  background-color: #fff;
}
.returntask .CustomerPage > div {
  float: right;
  margin-right: 30px;
}
.returntask .CustomerPage .ivu-page {
  display: inline-block;
  vertical-align: middle;
}
.returntask .ivu-select-item {
  padding: 6px;
}
.rtask .ivu-modal .ivu-form .float {
  width: 288px;
  float: left;
}
.rtask .ivu-modal-body {
  padding: 35px 45px;
}
</style>
