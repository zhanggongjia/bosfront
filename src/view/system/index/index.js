import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      gettemplatelist: 'gettemplatelist',
      getbusinesstree: 'getbusinesstree',
      getbusinesslist: 'getbusinesslist',
      getprovincelist: 'getprovincelist',
      getcitylist: 'getcitylist',
      getarealist: 'getarealist',
      getfieldlist: 'getfieldlist',
      getcontentlist: 'getcontentlist'

    })
  },
  data () {
    return {
      index: 1,
      stepslist: [],
      formDynamic: {
        items: [
          // {
          //   defaultValue: '', // 默认值
          //   group: '', // 组名
          //   fieldLabel: '', // 字段显示名称
          //   fieldType: '', // 字段类型
          //   necessary: false, // 是否必填
          //   selectContent: '', // 下拉元素
          //   index: 1,
          //   status: 1
          // }
        ]
      },
      ui: {
        loading: false,
        companycreate: false, // 添加窗口
        title: '',
        columns: [
          {
            title: '#',
            type: 'index',
            width: '60px',
            indexMethod: row => {
              return (
                row._index +
                1 +
                this.model.param.pageSize * this.model.param.pageNum -
                this.model.param.pageSize
              )
            }
          },
          {
            title: '模板名称',
            key: 'templateName',
            align: 'center'
          },
          {
            title: '地区',
            key: 'areaName',
            align: 'center'
          },
          {
            title: '业务名称',
            key: 'businessTypeName',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h(
                  'Tag', {
                    props: {
                      color: 'red'

                    }
                  },

                  params.row.businessTypeName
                )
              ])
            }
          },
          {
            title: '子业务名称',
            key: 'subBusinessTypeName',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h(
                  'Tag', {
                    props: {
                      color: 'red'
                    }
                  },
                  params.row.subBusinessTypeName
                )
              ])
            }
          },
          {
            title: '步骤数目',
            key: 'stepSize',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h(
                  'Tag', {
                    props: {
                      color: 'volcano'

                    }
                  },

                  params.row.stepSize
                )
              ])
            }
          },
          {
            title: '操作',
            key: 'id',
            width: 310,
            render: (h, { row, index }) => {
              return h('div', [
                h(
                  'Button',
                  {
                    props: {
                      type: 'primary',
                      size: 'small',
                      ghost: true
                    },
                    style: {
                      marginRight: '5px'
                    },
                    directives: [
                      {
                        name: 'has',
                        value: this.auth.edit,
                        expression: this.auth.edit,
                        modifiers: {}
                      }
                    ],
                    on: {
                      click: () => {
                        this.handleshowcopy(row)
                      }
                    }
                  },
                  '复制'
                ),
                h(
                  'Button',
                  {
                    props: {
                      type: 'primary',
                      size: 'small',
                      ghost: true
                    },
                    style: {
                      marginRight: '5px'
                    },
                    directives: [
                      {
                        name: 'has',
                        value: this.auth.edit,
                        expression: this.auth.edit,
                        modifiers: {}
                      }
                    ],
                    on: {
                      click: () => {
                        this.handletempledit(row.templateId)
                      }
                    }
                  },
                  '编辑'
                ),

                h(
                  'Button',
                  {
                    props: {
                      type: 'error',
                      size: 'small',
                      ghost: true
                    },
                    style: {
                      marginRight: '5px'
                    },

                    on: {
                      click: () => {
                        this.handleCompanydel(row.templateId)
                      }
                    }
                  },
                  '删除'
                )
              ])
            }
          }
        ],
        pageSizeOpts: [20, 40, 60],
        tabs: 0,
        bzs: [{
          index: 0,
          stempname: '步骤名称',
          stepId: '',
          custDetails: '',
          staffDetails: ''
        }],
        tabindex: 0,
        spinShow: false,
        addloading: false
      },
      model: {
        param: {
          areaId: '',
          businessType: [],
          pageNum: 1,
          pageSize: 20,
          templateName: ''
        },
        formparams: {
          areaId: '10000',
          topAreaId: '',
          businessType: [],
          templateName: '',
          templateId: '',
          step: {
            // stepId: '',
            fields: [],
            stepName: ''
          }
        },
        copy: {
          show: false,
          title: '',
          data: {
            areaId: '',
            topAreaId: '',
            businessType: [],
            templateId: '',
            templateName: ''
          }
        }
      },
      auth: {
        add: 'boss:template:add',
        edit: 'boss:template:edit',
        del: 'boss:template:del'
      }
    }
  },
  methods: {
    ...mapActions([
      'templateListAction',
      'getBusinessTreeAction',
      'getBusinessListAction',
      'getprovinceAction',
      'getcityAction',
      'getareaAction',
      'getFieldTypeListAction',
      'getSelectContentAction',
      'templateAddAction',
      'gettemplateAction',
      'templateEditAction',
      'deltemplateAction',
      'delstepIdbyIdAction',
      'templateCopyAction'
    ]),
    // 搜索
    handleSearch () {
      if (!this.model.param.businessType.length) {
        this.$Message.warning('请选择业务类型')
      } else {
        this.initList(this.model.param)
      }
    },
    // 分页
    handlepage (num) {
      this.model.param.pageNum = num
      this.initList(this.model.param)
    },
    // 显示数量
    handlepagesize (size) {
      this.model.param.pageSize = size
      this.initList(this.model.param)
    },
    // 打开创建弹窗
    handlecreatecompany () {
      this.ui.title = '新建模板'
      this.ui.companycreate = true
    },
    // 保存业务模板
    handleCompanytmpl (index) {
      let formdynamic = []
      if (this.model.formparams.templateName === '') {
        this.$Message.error('请输入模板名称')
      } else if (this.ui.bzs[index].stepName === '') {
        this.$Message.error('请输入步骤名称')
      } else if (!this.model.formparams.businessType.length) {
        this.$Message.error('请选择业务类型')
      } else {
        this.ui.addloading = true
        this.formDynamic.items.map(item => {
          if (item.tab === index) {
            formdynamic.push(item)
          }
        })
        this.model.formparams.step.fields = formdynamic
        this.model.formparams.step.stepName = this.ui.bzs[index].stempname
        this.model.formparams.step.stepId = this.ui.bzs[index].stepId
        this.model.formparams.step.custDetails = this.ui.bzs[index].custDetails
        this.model.formparams.step.staffDetails = this.ui.bzs[index].staffDetails
        if (this.model.formparams.templateId === '') {
          this.templateAddAction(JSON.parse(JSON.stringify(this.model.formparams))).then(res => {
            this.model.formparams.templateId = ''
            if (res.code === '0') {
              this.ui.addloading = false
              this.ui.companycreate = false
              this.$Message.success('保存成功')

              this.initList()
            } else {
              this.ui.addloading = false
              this.$Message.error(res.message)
            }
          })
        } else {
          this.ui.addloading = true
          this.templateEditAction(JSON.parse(JSON.stringify(this.model.formparams))).then(res => {
            if (res.code === '0') {
              this.ui.addloading = false
              this.ui.companycreate = false
              this.$Message.success('编辑成功')

              this.initList()
            } else {
              this.ui.addloading = false
              this.$Message.error('编辑失败')
            }
          })
        }
      }
    },
    // 编辑商户获取信息
    handletempledit (templateId) {
      this.ui.bzs = []
      this.model.formparams.templateId = templateId
      this.gettemplateAction(templateId).then(res => {
        this.model.formparams.templateName = res.info.templateName
        this.model.formparams.areaId = res.info.areaId
        this.model.formparams.businessType = [res.info.businessTypeId, res.info.subBusinessTypeId]
        this.model.formparams.topAreaId = res.info.topAreaId
        this.getcityAction(res.info.topAreaId)
        res.info.steps.map((step, index) => {
          this.ui.bzs.push({
            index: index,
            stempname: step.stepName,
            stepId: step.stepId,
            staffDetails: step.staffDetails ? step.staffDetails : '',
            custDetails: step.custDetails ? step.custDetails : ''
          })

          step.fields.map(item => {
            item.index = 1
            item.status = 1
            item.tab = index
            this.formDynamic.items.push(item)
          })
        })
        this.ui.title = '编辑模板'
        this.ui.companycreate = true
      })
    },
    handleshowcopy (row) {
      console.log('...handlecopy', row.templateId)
      this.model.copy = {
        show: true,
        title: row.templateName,
        data: {
          areaId: '',
          topAreaId: '',
          businessType: [row.businessTypeId, row.subBusinessTypeId],
          templateId: row.templateId,
          templateName: ''
        }
      }
    },
    handleCopy (row) {
      console.log('...handleCopy')
      if (this.model.copy.data.templateName === '') {
        this.$Message.error('请输入模板名称')
      } else if (!this.model.copy.data.businessType.length) {
        this.$Message.error('请选择业务类型')
      } else {
        this.templateCopyAction(JSON.parse(JSON.stringify(this.model.copy.data))).then((res) => {
          if (res.code === '0') {
            this.model.copy.show = false
            this.$Message.success('复制成功')
            this.initList()
          } else {
            this.model.copy.show = true
            this.$Message.error(res.message)
          }
        })
      }
    },
    handleCancelCopy (row) {
      console.log('...handleCancelCopy')
      this.model.copy = {
        show: false,
        title: '',
        data: {
          areaId: '',
          topAreaId: '',
          businessType: [],
          templateId: '',
          templateName: ''
        }
      }
    },
    // 取消
    handleCanle () {
      this.ui.companycreate = false
      this.ui.privilegescreate = false
    },
    // 删除
    handleCompanydel (id) {
      let _this = this
      _this.$Modal.confirm({
        title: '操作提示',
        content: '确定要删除此模板吗?',
        onOk: () => {
          _this.deltemplateAction(id).then(res => {
            if (res.code === '0') {
              this.initList()
              this.$Message.success('删除成功')
            } else {
              this.$Message.success('删除失败')
            }
          })
        },
        onCancel: () => {}
      })
    },
    // 关闭触发
    visiblechange (e) {
      if (!e) {
        this.$refs['formDynamic'].resetFields()
        this.model.formparams.templateId = ''
        this.model.formparams.areaId = '10000'
        this.model.formparams.topAreaId = ''
        this.model.formparams.businessType = []
        this.model.formparams.step.stepId = ''
        this.model.formparams.step.stepName = ''
        this.model.formparams.templateName = ''
        this.model.formparams.step.fields = []
        this.formDynamic.items = []
        this.ui.bzs = [{
          index: 0,
          stempname: '步骤名称',
          stepId: '',
          custDetails: '',
          staffDetails: ''
        }]
      }
    },
    // 初始化加载
    initList () {
      this.ui.loading = true
      this.templateListAction(this.model.param).then(res => {
        this.ui.loading = false
      })
    },
    // 加载列表
    initDict () {
      this.getBusinessTreeAction()
      this.getBusinessListAction()
      this.getprovinceAction()
      this.getFieldTypeListAction()
      this.getSelectContentAction()
    },
    handleAdd () {
      console.log(this.ui.bzs)
      this.index++
      this.formDynamic.items.push({
        defaultValue: '', // 默认值
        group: '', // 组名
        fieldLabel: '', // 字段显示名称
        fieldType: '', // 字段类型
        necessary: false, // 是否必填
        selectContent: '', // 下拉元素
        index: 1,
        status: 1,
        value: '',
        subType: '',
        dataBind: '',
        tab: this.ui.tabindex
      })
    },
    // 删除字段名称
    handleRemove (index) {
      this.formDynamic.items.splice(index, 1)
    },
    // 省
    handleprovince (e) {
      if (e !== undefined) {
        this.getcityAction(e)
      }
    },
    // 市
    handlecity (e) {
      if (e !== undefined) {
        this.getareaAction(e)
      }
    },

    // 添加步骤
    handleTabsAdd (e) {
      this.ui.tabs++
      this.ui.bzs.push({
        index: this.ui.tabs,
        stempname: '步骤名称',
        custDetails: '',
        staffDetails: ''
      })
    },
    handletabs (e) {
      this.ui.tabindex = e
    },
    beforeRemove (e) {
      if (this.ui.bzs[e].stepId !== undefined) {
        let params = {
          templateId: this.model.formparams.templateId,
          stepId: this.ui.bzs[e].stepId
        }
        this.delstepIdbyIdAction(params).then(res => {
          if (res.code === '0') {
            this.$Message.success('步骤移除成功')
            this.initList()
            this.ui.companycreate = false
          }
        })
      }
      // return new Promise(function (resolve, reject) {
      //   // eslint-disable-next-line prefer-promise-reject-errors
      //   reject('1')
      // })
    },
    handleUp (index) {
      const theOne = this.formDynamic.items.splice(index, 1)[0]
      return this.formDynamic.items.splice(index - 1, 0, theOne)
    },
    handleDown (index) {
      const theOne = this.formDynamic.items.splice(index, 1)[0]
      return this.formDynamic.items.splice(index + 1, 0, theOne)
    }
  },
  mounted () {
    this.initList()
    this.initDict()
  }
}
