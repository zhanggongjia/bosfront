import { mapGetters, mapActions } from 'vuex'
import _moment from 'moment'
import config from '@/config'
export default {
  computed: {
    ...mapGetters({
      getshoplist: 'getshoplist',
      getbannerlist: 'getbannerlist'

    })
  },
  data () {
    return {
      ui: {
        actionurl: '',
        loading: true,
        banner: false, // 管理图片
        picadd: false, // 管理图片
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
                        console.log(row.companyId)
                        this.handleinitpic(row.companyId)
                      }
                    }
                  },
                  '管理图片'
                )
              ])
            }
          }
        ],
        pageSizeOpts: [20, 40, 60],
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
            title: '图片类型',
            key: 'bannerType',
            align: 'center'
          },
          {
            title: '图片地址',
            key: 'bannerType',
            render: (h, params) => {
              return h('div', [
                h(
                  'Tooltip', {
                    props: {
                      content: params.row.bannerPageUrl,
                      placement: 'left',
                      maxWidth: '280'
                    },
                    style: {
                      'width': '300px',
                      'overflow': 'hidden',
                      'text-overflow': 'ellipsis',
                      'white-space': 'nowrap'
                    }
                  },
                  '...' + params.row.bannerPageUrl
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
                  'Tooltip', {
                    props: {
                      content: params.row.bannerPageUrl,
                      placement: 'left',
                      maxWidth: '280'
                    },
                    style: {
                      'width': '300px',
                      'overflow': 'hidden',
                      'text-overflow': 'ellipsis',
                      'white-space': 'nowrap'
                    }
                  },
                  _moment(params.row.createTime).format('YYYY-MM-DD hh:mm:ss')
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
                  '编辑图片'
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
          bannerPageUrl: '',
          companyId: '',
          id: ''
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'getShopListAction',
      'getbannerallAction',
      'addbannerAction',
      'putbannerAction'
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
      this.ui.banner = false
      this.ui.picadd = false
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
        this.model.formdata.companyId = ''
        this.model.formdata.bannerPageUrl = ''
        this.model.formdata.companyId = ''
        this.model.formdata.id = ''
      }
    },
    // 打开管理图片
    handleinitpic (companyId) {
      this.ui.banner = true
      this.model.detaillist.companyId = companyId
      this.model.formdata.companyId = companyId
      this.initpicall()
    },
    // 新增图片
    handlecreate () {
      this.ui.picadd = true
    },
    // 编辑图片
    handleeditpic (item) {
      this.model.formdata.id = item.id
      this.model.formdata.bannerPageUrl = item.bannerPageUrl
      this.ui.picadd = true
    },
    // 上传之前获取token
    handlebeforeupload () {
      this.ui.headers.Token = this.$store.state.user.token
    },
    // 上传成功
    handleadduccess (res) {
      this.model.formdata.bannerPageUrl = res.info.url
    },
    // 保存图
    handlesubmit () {
      if (this.model.formdata.bannerPageUrl === '') {
        this.$Message.error('请上传图片')
      } else {
        if (this.model.formdata.id !== '') {
          this.putbannerAction(this.model.formdata).then(res => {
            if (res.code === '0000') {
              this.$Message.success('编辑成功')
              this.initpicall()
              this.ui.picadd = false
            }
          })
        } else {
          this.addbannerAction(this.model.formdata).then(res => {
            if (res.code === '0000') {
              this.$Message.success('保存成功')
              this.initpicall()
              this.ui.picadd = false
            }
          })
        }
      }
    },
    // 查询当前公司下的banner图
    initpicall () {
      this.getbannerallAction(this.model.detaillist)
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
  },
  created () {
    const _baseUrl =
    process.env.NODE_ENV === 'development'
      ? config.baseUrl.dev
      : config.baseUrl.pro
    this.ui.actionurl = `${_baseUrl}func/upload`
  }
}
