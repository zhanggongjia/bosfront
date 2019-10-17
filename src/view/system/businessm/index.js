import { mapGetters, mapActions } from 'vuex'
import _moment from 'moment'
import config from '@/config'
export default {
  components: {

  },
  computed: {
    ...mapGetters({
      getdicbussinesslist: 'getdicbussinesslist',
      getbusstypelist: 'getbusstypelist'

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
            title: '业务大类',
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
                        this.handleCompanyedit(row.id)
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
          id: '',
          businessName: '',
          businessType: '',
          detailPage: '',
          icon: ''
        }

      },
      ruleValidate: {
        businessName: [{ required: true, message: '请填写业务名称', trigger: 'blur' }],
        businessType: [{ required: true, message: '请选择业务大类' }]
      },
      auth: {
        add: 'boss:shop:add',
        edit: 'boss:shop:edit'
      }
    }
  },
  methods: {
    ...mapActions([
      'getbussdictlistAction',
      'busstypesAction',
      'bussenableAction',
      'bussdisableAction',
      'getbussinessbyIdAction',
      'addbussAction',
      'funfileAction',
      'getbussbyidAction',
      'putbussAction'
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
          this.model.fromdata.expireTime = _moment(this.model.fromdata.expireTime).format('YYYY-MM-DD')
          if (this.model.fromdata.id === '') {
            this.addbussAction(this.model.fromdata).then(res => {
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
            this.putbussAction(this.model.fromdata).then(res => {
              if (res.code === '0') {
                this.$Message.success({
                  content: '业务编辑成功',
                  duration: 1
                })
                this.initList(this.model.param)
                this.model.fromdata.id = ''
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
    handleCompanyedit (id) {
      this.model.fromdata.id = id
      this.getbussinessbyIdAction(id).then(res => {
        console.log(res)
        this.model.fromdata.businessName = res.info.businessName

        this.model.fromdata.businessType = res.info.typeId
        this.model.fromdata.detailPage = res.info.detailPagePath
        this.model.fromdata.icon = res.info.iconPath
        this.ui.pageimgurl = res.info.detailPageUrl
        this.ui.iconimgurl = res.info.iconUrl
        // this.model.fromdata.companyId = res.info.companyId
        // this.model.fromdata.adminEmail = res.info.adminEmail
        // this.model.fromdata.adminName = res.info.adminName
        // this.model.fromdata.adminPhone = res.info.adminPhone
        // this.model.fromdata.companyName = res.info.companyName
        this.ui.companycreate = true
      })
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
          _this.bussdisableAction(id).then(res => {
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
          _this.bussenableAction(id).then(res => {
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
    // 上传之前获取token
    handlebeforeupload () {
      this.ui.headers.Token = this.$store.state.user.token
    },
    // icon 上传成功
    handleiconsuccess (res) {
      this.ui.iconimgurl = res.info.url
      this.model.fromdata.icon = res.info.path
    },
    // 详情图上传成功
    handlepagesuccess (res) {
      this.ui.pageimgurl = res.info.url
      this.model.fromdata.detailPage = res.info.path
    },
    // 关闭触发
    visiblechange (e) {
      if (!e) {
        this.model.fromdata.id = ''
        this.$refs['formValidate'].resetFields()
        this.model.fromdata.businessName = ''
        this.model.fromdata.businessType = ''
        this.model.fromdata.detailPage = ''
        this.model.fromdata.icon = ''
        this.ui.pageimgurl = ''
        this.ui.iconimgurl = ''
      }
    },
    // 初始化加载
    initList () {
      this.getbussdictlistAction(this.model.param).then(res => {
        this.ui.loading = false
      })
    },
    dictlist () {
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
