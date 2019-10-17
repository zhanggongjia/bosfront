import { mapGetters, mapActions } from 'vuex'
import config from '@/config'
export default {
  components: {

  },
  computed: {
    ...mapGetters({
      getsubdicbussinesslist: 'getsubdicbussinesslist',
      getbusinesslist: 'getbusinesslist',
      getbusstypelist: 'getbusstypelist',
      getdicbussinesslist: 'getdicbussinesslist'
    })
  },
  data () {
    return {
      ui: {
        actionurl: '',
        loading: true,
        companycreate: false, // 添加窗口
        privilegescreate: false,
        columns: [
          {
            title: '#',
            type: 'index',
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
            title: '所属业务',
            key: 'typeName',
            align: 'center'

          },
          {
            title: '业务类别',
            key: 'businessName',
            align: 'center'

          },
          {
            title: '状态',
            key: 'available',
            render: (h, params) => {
              return h('div', [
                h(
                  'Tag', {
                    props: {
                      color: params.row.state ? 'green' : 'warning'

                    }
                  },

                  params.row.state ? '正常' : '禁用'
                )
              ])
            }
          },
          {
            title: '创建时间',
            key: 'createDate',
            align: 'center'

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
                        this.handleCompanyedit(row)
                      }
                    }
                  },
                  '编辑'
                ),
                h(
                  'Button',
                  {
                    props: {
                      type: row.state ? 'error' : 'success',
                      size: 'small',
                      ghost: true
                    },
                    style: {
                      marginRight: '5px'
                    },

                    on: {
                      click: () => {
                        if (row.state) {
                          this.handledisable(row.id)
                        } else {
                          this.handleenable(row.id)
                        }
                      }
                    }
                  },
                  row.state ? '停止业务' : '启用业务'
                )
              ])
            }
          }
        ],
        placeholder: '请选择角色',
        pageSizeOpts: [20, 40, 60],
        iconimgurl: '', // 图标图片
        pageimgurl: '', // 详情页图片
        headers: {
          Token: ''
        }
      },
      model: {
        param: {
          pageNum: 1,
          pageSize: 20,
          businessClass: '' // 业务大类
        },
        fromdata: {
          id: undefined,
          businessName: '',
          businessType: ''
        }
      },
      ruleValidate: {
        businessName: [{ required: true, message: '请填写业务名称', trigger: 'blur' }],
        businessType: [{ required: true, message: '请选择所属业务' }]
      },
      auth: {
        add: 'boss:shop:add',
        edit: 'boss:shop:edit'
      }
    }
  },
  methods: {
    ...mapActions([
      'busstypesAction',
      'getsubbussdictlistAction',
      'getbussdictlistAction',
      'getBusinessListAction',
      'subbussenableAction',
      'subbussdisableAction',
      'addsubbussAction',
      'putsubbussAction'
    ]),
    // 搜索
    handleSearch () {
      this.model.pageNum = 1
      this.initList(this.model.param)
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
      this.ui.companycreate = true
    },
    // 保存业务
    handleBussAdd () {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          if (this.model.fromdata.id === undefined) {
            this.addsubbussAction(this.model.fromdata).then(res => {
              if (res.code === '0') {
                this.$Message.success({
                  content: '业务创建成功',
                  duration: 1
                })
                this.initList(this.model.param)
                this.ui.companycreate = false
              } else {
                console.log(res)
                this.$Message.error({
                  content: res.message,
                  duration: 1
                })
              }
            })
          } else {
            this.putsubbussAction(this.model.fromdata).then(res => {
              if (res.code === '0') {
                this.$Message.success({
                  content: '业务编辑成功',
                  duration: 1
                })
                this.initList(this.model.param)
                this.model.fromdata.id = undefined
                this.ui.companycreate = false
              } else {
                this.$Message.error({
                  content: res.message,
                  duration: 1
                })
              }
            })
          }
        }
      })
    },
    // 编辑商户获取信息
    handleCompanyedit (row) {
      this.model.fromdata.id = row.id
      this.model.fromdata.businessName = row.businessName
      this.model.fromdata.businessType = row.typeId
      this.ui.companycreate = true
    },

    // 取消
    handleCanle () {
      this.ui.companycreate = false
      this.ui.privilegescreate = false
    },
    // 禁用
    handledisable (id) {
      let _this = this
      _this.$Modal.confirm({
        title: '操作提示',
        content: '确定要停止当前业务吗?',
        onOk: () => {
          _this.subbussdisableAction(id).then(res => {
            if (res.code === '0') {
              this.initList()
              this.$Message.success('停止业务成功')
            } else {
              this.$Message.success(res.message)
            }
          })
        },
        onCancel: () => {

        }
      })
    },
    handleenable (id) {
      let _this = this
      _this.$Modal.confirm({
        title: '操作提示',
        content: '确定要启用当前业务吗?',
        onOk: () => {
          _this.subbussenableAction(id).then(res => {
            if (res.code === '0') {
              this.initList()
              this.$Message.success('启用业务成功')
            } else {
              this.$Message.success(res.message)
            }
          })
        },
        onCancel: () => {

        }
      })
    },
    // 关闭触发
    visiblechange (e) {
      if (!e) {
        this.model.fromdata.id = undefined
        this.$refs['formValidate'].resetFields()
        this.model.fromdata.businessName = ''
        this.model.fromdata.businessType = ''
      }
    },
    // 初始化加载
    initList () {
      this.getsubbussdictlistAction(this.model.param).then(res => {
        console.log('..res', res)
        this.ui.loading = false
      })
    },
    dictlist () {
      this.getBusinessListAction()
      this.getbussdictlistAction()
      this.busstypesAction()
    }
  },
  mounted () {
    this.initList()
    this.dictlist()
  },
  created () {
    const _baseUrl =
    process.env.NODE_ENV === 'development'
      ? config.baseUrl.dev
      : config.baseUrl.pro
    this.ui.actionurl = `${_baseUrl}func/upload`
  }
}
