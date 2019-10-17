import { mapGetters, mapActions } from 'vuex'
import config from '@/config'
export default {
  computed: {
    ...mapGetters({
      getlist: 'getlist',
      getalltemplatelist: 'getalltemplatelist'
    })
  },
  data () {
    return {
      ui: {
        actionurl: '',
        loading: true,
        privilegescreate: false,
        fltree: false,
        selectedleafItem: false,
        columns: [
          {
            title: '#',
            type: 'index',
            width: 170,
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
            title: '公司名称',
            key: 'companyName',
            align: 'center'

          },
          {
            title: '操作',
            key: 'id',

            render: (h, { row, index }) => {
              return h('div', [

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
                        this.model.areaId = row.areaId
                        this.handleprivileges(row.companyId, row.companyName)
                      }
                    }
                  },
                  '业务配置'
                )
              ])
            }
          }
        ],
        pageSizeOpts: [20, 40, 60],
        title: '',
        privilegesList: [],
        headers: {
          Token: ''
        },
        iconimgurl: '',
        pageimgurl: ''
      },
      model: {
        param: {
          pageNum: 1,
          pageSize: 20,
          companyName: '' // 公司名称,
        },
        params: {
          businesses: [],
          companyId: ''
        },
        fromdata: {
          companyId: '',
          business: '',
          detailPage: '',
          icon: '',
          businessTemplateId: ''
        },
        areaId: 0
      },
      auth: {
        add: 'boss:shop:add',
        edit: 'boss:shop:edit'
      }

    }
  },
  methods: {
    ...mapActions([
      'getListAction',
      'getbusinessByidAction',
      'addbusinessAction',
      'bussinesscfAction',
      'subbussinesscfAction',
      'getbussinesscfAction',
      'getsubbussinesscfAction',
      'allTemplateListAction'
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
    // 取消
    handleCanle () {
      this.ui.privilegescreate = false
    },
    handleCanlefltree () {
      this.ui.fltree = false
      this.ui.selectedleafItem = null
    },
    // 关闭触发
    visiblechange (e) {
      if (!e) {
        this.model.fromdata.companyId = ''
        this.model.fromdata.business = ''
        this.ui.iconimgurl = ''
        this.ui.pageimgurl = ''
      }
    },
    visiblechanges (e) {
      if (!e) {
        // this.model.fromdata.companyId = ''
        this.model.fromdata.business = ''
        this.ui.iconimgurl = ''
        this.ui.pageimgurl = ''
      }
    },
    loop (data) {
      return data.map((item) => {
        const newItem = {
          title: item.name,
          id: item.id,
          level: item.level,
          checked: item.checked,
          bussinessTypeId: item.bussinessTypeId
        }
        if (item.business) {
          newItem.children = this.loop(item.business)
        }
        return newItem
      })
    },
    // 打开权限配置
    handleprivileges (companyId, title) {
      this.ui.privilegesList = []
      this.model.params.companyId = companyId
      this.model.fromdata.companyId = companyId
      this.ui.title = title + '-业务配置'
      this.getbusinessByidAction(companyId).then(res => {
        this.ui.privilegesList = this.loop(res.info.business)
        this.ui.privilegescreate = true
      })
    },
    // 权限配置
    handleSubmitPrivilegs () {
      this.model.params.businesses = []
      const checkedNodes = this.$refs.roleprivilegeslist.getCheckedNodes()
      this.model.params.businesses = checkedNodes.filter(node => node.level === 2).map(node => node.id)
      this.model.params.subBusinesses = checkedNodes.filter(node => node.level === 3).map(node => node.id)
      if (this.model.params.businesses.length === 0 && this.model.params.subBusinesses.length === 0) {
        this.$Message.warning('请先选择权限')
      } else {
        this.addbusinessAction(this.model.params).then(res => {
          if (res.code === '0') {
            this.ui.privilegescreate = false
            this.$Message.success('业务配置成功')
          } else {
            this.$Message.error(res.message)
          }
        })
      }
    },
    handleselectchange (e) {
      console.log('handleselectchange', e)
      this.model.fromdata.business = e[0].id
      if (e[0].level === 1) return
      if (e[0].level === 2) {
        this.getbussinesscfAction(this.model.fromdata).then(res => {
          this.ui.iconimgurl = res.info.iconUrl
          this.ui.pageimgurl = res.info.detailPageUrl
          this.model.fromdata.icon = res.info.icon
          this.model.fromdata.detailPage = res.info.detailPage
          this.model.fromdata.businessTemplateId = undefined
        })
      }
      if (e[0].level === 3) {
        this.getsubbussinesscfAction({
          companyId: this.model.fromdata.companyId,
          business: this.model.fromdata.business
        }).then(res => {
          this.model.fromdata.businessTemplateId = res.info ? res.info : ''
        })
        this.allTemplateListAction({ businessType: e[0].bussinessTypeId, areaId: this.model.areaId })
      }
      this.ui.fltree = true
      this.ui.selectedleafItem = e[0]
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
    // 详情页上传成功
    handlepagesuccess (res) {
      this.ui.pageimgurl = res.info.url
      this.model.fromdata.detailPage = res.info.path
    },
    // 保存图标
    handleBussAdd () {
      if (this.ui.selectedleafItem.level === 2) {
        if (this.model.fromdata.icon === '') {
          this.$Message.warning('请选择上传的icon')
        } else if (this.model.fromdata.detailPage === '') {
          this.$Message.warning('请选择上传的详情页图')
        } else {
          this.bussinesscfAction(this.model.fromdata).then(res => {
            if (res.code === '0') {
              this.ui.fltree = false
              this.ui.selectedleafItem = null
              this.$Message.success('保存成功')
            } else {
              this.$Message.error(res.message)
            }
          })
        }
      }
      if (this.ui.selectedleafItem.level === 3) {
        if (this.model.fromdata.businessTemplateId === '') {
          this.$Message.warning('请选择模板')
        } else {
          // subbussinesscfAction
          this.subbussinesscfAction(this.model.fromdata).then(res => {
            if (res.code === '0') {
              this.ui.fltree = false
              this.ui.selectedleafItem = null
              this.$Message.success('保存成功')
            } else {
              this.$Message.error(res.message)
            }
          })
        }
      }
    },
    initList () {
      this.getListAction(this.model.param).then(res => {
        this.ui.loading = false
      })
    }
  },
  mounted () {
    this.initList()
  },
  created () {
    const _baseUrl =
    process.env.NODE_ENV === 'development'
      ? config.baseUrl.dev
      : config.baseUrl.pro
    this.ui.actionurl = `${_baseUrl}func/upload`
  }
}
