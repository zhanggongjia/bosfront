import { mapGetters, mapActions } from 'vuex'
import _moment from 'moment'
export default {
  computed: {
    ...mapGetters({
      getpaylist: 'getpaylist'
    })
  },
  data () {
    return {
      ui: {
        loading: true,
        columns: [
          {
            title: '#',
            type: 'indexnumber'
          },
          {
            title: '公司名称',
            key: 'companyName',
            align: 'center'
          },
          {
            title: '三方编码',
            key: 'channelCode',
            align: 'center'
          },
          {
            title: '三方名称',
            key: 'channelName',
            align: 'center'
          },
          {
            title: '三方渠道号',
            key: 'channelNo',
            align: 'center'
          },
          {
            title: '三方商户号',
            key: 'merchantNo',
            align: 'center'
          },
          {
            title: '分配商户号',
            key: 'ruleMerchantNo',
            align: 'center'
          },
          {
            title: '费率（百分比）',
            key: 'fee',
            align: 'center'
          },
          {
            title: '状态',
            key: 'state',
            width: 100,
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
            width: 180,
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
                      marginRight: '5px',
                      width: '40px !important'
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
                        this.$router.push({
                          path: `/shop/pay_detail_page/${row.id}`
                        })
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
                        if (!row.state) {
                          this.enablepay(row.id)
                        } else {
                          this.disablepay(row.id)
                        }
                      }
                    }
                  },
                  row.state ? '停止' : '启用'
                )
              ])
            }
          }
        ],
        placeholder: '请选择角色',
        pageSizeOpts: [20, 40, 60]
      },
      param: {
        pageNum: 1,
        pageSize: 20,
        merchantNo: undefined,
        companyName: undefined // 公司名称
      },
      auth: {
        add: 'boss:shop:add',
        edit: 'boss:shop:edit'
      }
    }
  },
  methods: {
    ...mapActions([
      'getPayListAction',
      'enablepayAction',
      'disablepayAction'
    ]),
    getList () {
      this.ui.loading = true
      this.getPayListAction(this.param).then((res) => {
        this.ui.loading = false
        if (res.code !== '0') {
          this.$Message.error({
            content: res.message,
            duration: 1
          })
        }
      })
    },
    enablepay (id) {
      this.enablepayAction(id).then((res) => {
        if (res.code !== '0') {
          this.$Message.error({
            content: res.message,
            duration: 1
          })
        } else {
          this.$Message.success({
            content: '操作成功',
            duration: 1
          })
          this.getList()
        }
      })
    },
    disablepay (id) {
      this.disablepayAction(id).then((res) => {
        if (res.code !== '0') {
          this.$Message.error({
            content: res.message,
            duration: 1
          })
        } else {
          this.$Message.success({
            content: '操作成功',
            duration: 1
          })
          this.getList()
        }
      })
    },
    handlepage (page) {
      this.param.page = page
      this.getList()
    },
    handlepagesize (size) {
      this.param.page = 1
      this.param.pageSize = size
      this.getList()
    },
    handleSearch () {
      this.getList()
    },
    handleAddClick () {
      this.$router.push({
        path: `/shop/pay_detail_page/0`
      })
    }
  },
  mounted () {
    this.getList()
  }
}
