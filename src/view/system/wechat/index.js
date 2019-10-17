import { mapGetters, mapActions } from 'vuex'
import _moment from 'moment'
export default {
  computed: {
    ...mapGetters({
      getshoplist: 'getshoplist',
      getweichatalllist: 'getweichatalllist'

    })
  },
  data () {
    return {
      ui: {
        loading: true,
        wxlist: false, // 管理图片
        wxcifg: false, // 管理图片
        headers: {
          Token: ''
        },
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
            title: '公司名称',
            key: 'companyName',
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
                      color: params.row.available ? 'green' : 'warning'

                    }
                  },

                  params.row.available ? '正常' : '禁用'
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
                      type: 'warning',
                      size: 'small',
                      ghost: true
                    },
                    style: {
                      marginRight: '5px'
                    },
                    directives: [
                      {

                      }
                    ],
                    on: {
                      click: () => {
                        console.log(row.companyId)
                        this.handleinitpic(row.companyId)
                      }
                    }
                  },
                  '配置微信'
                )
              ])
            }
          }
        ],
        pageSizeOpts: [20, 40, 60],
        wxtypes: ['WX_MP', 'WX_LITE'],
        bannercloumns: [
          {
            title: '#',
            type: 'index',
            width: 60,
            indexMethod: row => {
              return (
                row._index +
                1 +
                this.model.detaillist.size * this.model.detaillist.page -
                this.model.detaillist.size
              )
            }
          },
          {
            title: '微信appId',
            key: 'appId',
            align: 'center'
          },

          {
            title: '微信appSecret',
            key: 'appSecret',
            align: 'center'
          },
          {
            title: '配置类型',
            key: 'wxType',
            align: 'center'
          },
          {
            title: '创建时间',
            key: 'createTime',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h(
                  'div', {

                  },
                  _moment(params.row.createTime).format('YYYY-MM-DD HH:mm:ss')
                )
              ])
            }
          },
          {
            title: '操作',
            key: 'id',
            align: 'center',
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

                      }
                    ],
                    on: {
                      click: () => {
                        this.handleeditpic(row)
                      }
                    }
                  },
                  '编辑配置'
                )
              ])
            }
          }
        ]
      },
      model: {
        param: {
          pageNum: 1,
          pageSize: 20,
          companyName: '' // 公司名称
        },
        detaillist: {
          page: 1,
          size: 20,
          companyId: ''
        },
        formdata: {
          appId: '',
          appSecret: '',
          companyId: '',
          id: '',
          wxType: ''
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'getShopListAction',
      'getwechatallAction',
      'addwechatAction',
      'putwechatAction'
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
    handledetailpage (num) {
      this.model.detaillist.page = num
      this.initpicall()
    },
    // 取消
    handleCanle () {
      this.ui.wxlist = false
      this.ui.wxcifg = false
    },
    // 关闭触发
    visiblechange (e) {
      if (!e) {
        this.model.formdata.companyId = ''
        this.model.detaillist.companyId = ''
      }
    },
    visiblepic (e) {
      if (!e) {
        this.model.formdata.appId = ''
        this.model.formdata.appSecret = ''
        this.model.formdata.companyId = ''
        this.model.formdata.id = ''
        this.model.formdata.wxType = ''
      }
    },
    // 打开管理图片
    handleinitpic (companyId) {
      this.ui.wxlist = true
      this.model.detaillist.companyId = companyId
      this.model.formdata.companyId = companyId
      this.initpicall()
    },
    // 新增图片
    handlecreate () {
      this.ui.wxcifg = true
    },
    // 编辑图片
    handleeditpic (item) {
      // this.model.formdata.id = item.id
      // this.model.formdata.bannerPageUrl = item.bannerPageUrl
      this.model.formdata.appId = item.appId
      this.model.formdata.appSecret = item.appSecret
      this.model.formdata.wxType = item.wxType
      this.ui.wxcifg = true
    },

    // 保存图
    handlesubmit () {
      if (this.model.formdata.appId === '') {
        this.$Message.error('请填写appId')
      } else if (this.model.formdata.appSecret === '') {
        this.$Message.error('请填写appSecret')
      } else if (this.model.formdata.wxType === '') {
        this.$Message.error('请选择类型')
      } else {
        if (this.model.formdata.id !== '') {
          this.putwechatAction(this.model.formdata).then(res => {
            if (res.code === '0000') {
              this.$Message.success('编辑成功')
              this.initpicall()
              this.ui.wxcifg = false
            }
          })
        } else {
          this.addwechatAction(this.model.formdata).then(res => {
            if (res.code === '0000') {
              this.$Message.success('保存成功')
              this.initpicall()
              this.ui.wxcifg = false
            }
          })
        }
      }
    },
    // 查询当前公司下的banner图
    initpicall () {
      this.getwechatallAction(this.model.detaillist)
    },
    // 初始化加载
    initList () {
      this.getShopListAction(this.model.param).then(res => {
        this.ui.loading = false
      })
    }
  },
  mounted () {
    this.initList()
  }
}
