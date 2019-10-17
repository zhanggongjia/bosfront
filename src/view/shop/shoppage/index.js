import { mapGetters, mapActions } from 'vuex'
import _moment from 'moment'
export default {
  computed: {
    ...mapGetters({
      getshoplist: 'getshoplist',
      getprovincelist: 'getprovincelist',
      getcitylist: 'getcitylist',
      getarealist: 'getarealist'
    })
  },
  data () {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请填写手机号码'))
      } else if (!/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(value)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    }
    const validateuserPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请填写密码'))
      } else if (value.length < 6) {
        callback(new Error('密码长度小于6位'))
      } else {
        callback()
      }
    }
    return {
      ui: {
        loading: true,
        companycreate: false, // 添加窗口
        companyedit: true, // 编辑模板网站信息显示
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
            title: '管理员名字',
            key: 'adminName',
            align: 'center'
          },
          {
            title: '管理员邮箱',
            key: 'adminEmail',
            align: 'center'
          },
          {
            title: '手机号',
            key: 'adminPhone',
            align: 'center'
          },
          {
            title: '公司名称',
            key: 'companyName',
            align: 'center'
          },
          {
            title: '状态',
            key: 'available',
            render: (h, params) => {
              return h('div', [
                h('Tag', {
                  props: {
                    color: params.row.available ? 'green' : 'warning'
                  }
                }, params.row.available ? '正常' : '禁用'
                )
              ])
            }
          },
          {
            title: '创建时间',
            key: 'createTime',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h(
                  'span',
                  {},
                  _moment(params.row.createTime).utcOffset(480).format('YYYY-MM-DD HH:mm:ss')
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
                        this.handleCompanyedit(row.companyId)
                      }
                    }
                  },
                  '编辑'
                ),
                h(
                  'Button',
                  {
                    props: {
                      type: 'warning',
                      size: 'small',
                      ghost: true
                    },
                    style: {
                      marginRight: '5px'
                    },

                    on: {
                      click: () => {
                        this.handleprivileges(row.companyId)
                      }
                    }
                  },
                  '权限配置'
                ),
                h(
                  'Button',
                  {
                    props: {
                      type: row.available ? 'error' : 'success',
                      size: 'small',
                      ghost: true
                    },
                    style: {
                      marginRight: '5px'
                    },

                    on: {
                      click: () => {
                        if (row.available) {
                          this.handleCompanydel(row.companyId)
                        } else {
                          this.handleenable(row.companyId)
                        }
                      }
                    }
                  },
                  row.available ? '停止合作' : '启用合作'
                  // '停止合作'
                )
              ])
            }
          }
        ],
        placeholder: '请选择角色',
        pageSizeOpts: [20, 40, 60],
        privilegesList: []
      },
      model: {
        param: {
          pageNum: 1,
          pageSize: 20,
          companyName: '' // 公司名称
        },
        fromdata: {
          companyId: '',
          adminEmail: '',
          adminName: '',
          adminPassword: '',
          adminPhone: '',
          watersNum: '',
          topAreaId: '',
          companyName: '',
          areaId: '',
          expireTime: ''
        },
        fromp: {
          privileges: [],
          companyId: ''
        }
      },
      ruleValidate: {
        adminName: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
        companyName: [{ required: true, message: '请填写公司名称', trigger: 'blur' }],
        adminPassword: [{ required: true, validator: validateuserPass, trigger: 'blur' }],
        roleId: [{ required: true, message: '请选择角色' }],
        adminEmail: [
          { required: true, message: '请填写邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        adminPhone: [{ required: true, validator: validatePhone, trigger: 'blur' }]
      },
      auth: {
        add: 'boss:shop:add',
        edit: 'boss:shop:edit'
      }
    }
  },
  methods: {
    ...mapActions([
      'getShopListAction',
      'shopAddAction',
      'shopdelAction',
      'shopDetailAction',
      'shopEditAction',
      'shopAddPrivilegesAction',
      'shopPrivilegesTreeAction',
      'getprovinceAction',
      'getcityAction',
      'getareaAction',
      'enableshopAction'
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
    // 保存商户
    handleCompanyAdd () {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          this.model.fromdata.expireTime = _moment(this.model.fromdata.expireTime).format('YYYY-MM-DD')
          if (this.model.fromdata.companyId === '') {
            this.shopAddAction(this.model.fromdata).then(res => {
              if (res.code === '0') {
                this.$Message.success({
                  content: '商户创建成功',
                  duration: 1
                })
                this.initList(this.model.param)
                this.ui.companycreate = false
              } else {
                this.$Message.error({
                  content: res.message,
                  duration: 1
                })
              }
            })
          } else {
            this.shopEditAction(this.model.fromdata).then(res => {
              if (res.code === '0') {
                this.$Message.success({
                  content: '商户编辑成功',
                  duration: 1
                })
                this.initList(this.model.param)
                this.model.fromdata.companyId = ''
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
    handleCompanyedit (CompanyId) {
      this.shopDetailAction(CompanyId).then(res => {
        this.model.fromdata.companyId = res.info.companyId
        this.model.fromdata.adminEmail = res.info.adminEmail
        this.model.fromdata.adminName = res.info.adminName
        this.model.fromdata.adminPhone = res.info.adminPhone
        this.model.fromdata.companyName = res.info.companyName
        this.model.fromdata.expireTime = res.info.expireTime
        this.model.fromdata.watersNum = res.info.watersNum
        this.model.fromdata.areaId = res.info.areaId
        this.model.fromdata.topAreaId = res.info.topAreaId
        this.ui.companycreate = true
      })
    },

    // 取消
    handleCanle () {
      this.ui.companycreate = false
      this.ui.privilegescreate = false
    },
    // 禁用
    handleCompanydel (id) {
      let _this = this
      _this.$Modal.confirm({
        title: '操作提示',
        content: '确定要停止合作吗?',
        onOk: () => {
          _this.shopdelAction(id).then(res => {
            if (res.code === '0') {
              this.initList()
              this.$Message.success('停止合作成功')
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
        content: '确定要启用合作吗?',
        onOk: () => {
          _this.enableshopAction(id).then(res => {
            if (res.code === '0') {
              this.initList()
              this.$Message.success('启用合作成功')
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
        this.model.fromdata.companyId = ''
        this.$refs['formValidate'].resetFields()
      }
    },
    // 打开权限配置
    handleprivileges (companyId) {
      this.model.fromp.companyId = companyId
      this.shopPrivilegesTreeAction(companyId).then(res => {
        this.ui.privilegesList = res.info
      })
      this.ui.privilegescreate = true
    },
    // 权限配置
    handleSubmitPrivilegs () {
      this.model.fromp.privileges = []
      let access = this.$refs.roleprivilegeslist.getCheckedAndIndeterminateNodes()
      if (access.length === 0) {
        this.$Message.warning('请先选择权限')
      } else {
        access.map(item => {
          this.model.fromp.privileges.push(item.id)
        })
        this.shopAddPrivilegesAction(this.model.fromp).then(res => {
          if (res.code === '0') {
            this.ui.privilegescreate = false
            this.model.fromp.companyId = ''
            this.$Message.success('权限保存成功')
          } else {
            this.$Message.error(res.message)
          }
        })
      }
    },
    // 省
    handleprovince (e) {
      this.getcityAction(e)
    },
    // 市
    handlecity (e) {
      this.getareaAction(e)
    },
    // 初始化加载
    initList () {
      this.getShopListAction(this.model.param).then(res => {
        this.ui.loading = false
      })
      this.getprovinceAction()
    }
  },
  mounted () {
    this.initList()
  }
}
