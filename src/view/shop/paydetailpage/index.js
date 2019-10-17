import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      getallcompanys: 'getallcompanys'
    })
  },
  data () {
    return {
      ui: {
        loading: true,
        formData: {
          companyId: '',
          id: '',
          subAppId: '',
          bankCardNo: '',
          channelCode: '',
          channelName: '',
          channelNo: '',
          ext: '',
          fee: null,
          merchantNo: '',
          platformId: '',
          privateKey: '',
          private_pass: '',
          publicKey: '',
          realName: '',
          remark: '',
          reqUrl: '',
          ruleMerchantNo: '',
          signKey: ''
        },
        rules: {
          selectString: { required: true, message: '请选择内容', trigger: 'change' },
          stringItem: { required: true, message: '请输入内容', trigger: 'change' },
          numberItem: { type: 'number', required: true, message: '请输入内容', trigger: 'change' }
        }
      },
      auth: {
        add: 'boss:shop:add',
        edit: 'boss:shop:edit'
      }
    }
  },
  methods: {
    ...mapActions([
      'getAllCompanysAction',
      'payEditAction',
      'payAddAction',
      'payDetailAction'
    ]),
    getCompanyList () {
      this.getAllCompanysAction()
    },
    handleSubmit () {
      const form = this.$refs.form
      form.validate((valid) => {
        if (valid) {
          if (Number(this.ui.formData.id)) {
            this.handleEdit()
          } else {
            this.handleAdd()
          }
        }
      })
    },
    handleEdit () {
      this.payEditAction(this.ui.formData).then((res) => {
        if (res.code !== '0') {
          this.$Message.error({
            content: res.message,
            duration: 1
          })
        } else {
          this.$Message.success({
            content: '保存成功',
            duration: 1
          })
          this.handleRefresh()
          this.toList()
        }
      })
    },
    handleAdd () {
      this.payAddAction(this.ui.formData).then((res) => {
        if (res.code !== '0') {
          this.$Message.error({
            content: res.message,
            duration: 1
          })
        } else {
          this.$Message.success({
            content: '保存成功',
            duration: 1
          })
          this.handleRefresh()
          this.toList()
        }
      })
    },
    handleRefresh () {
      this.ui = {
        loading: true,
        formData: {
          companyId: '',
          Id: '',
          subAppId: '',
          bankCardNo: '',
          channelCode: '',
          channelName: '',
          channelNo: '',
          ext: '',
          fee: null,
          merchantNo: '',
          platformId: '',
          privateKey: '',
          private_pass: '',
          publicKey: '',
          realName: '',
          remark: '',
          reqUrl: '',
          ruleMerchantNo: '',
          signKey: ''
        },
        rules: {
          companyId: { required: true, message: '请选择公司名称', trigger: 'change' },
          stringItem: { required: true, message: '请输入内容', trigger: 'change' }
        }
      }
    },
    handleCancel () {
      this.handleRefresh()
      this.toList()
    },
    handleChange (val) {
      console.log('...val', val)
      this.ui.formData.channelName = val.label
    },
    toList () {
      this.$router.push({ name: 'pay_page' })
    }
  },
  mounted () {
    this.getCompanyList()
    this.ui.formData.id = this.$route.params.id
    if (Number(this.ui.formData.id)) {
      this.payDetailAction(this.$route.params.id).then((res) => {
        for (let key in this.ui.formData) {
          if (res.info[key]) this.ui.formData[key] = res.info[key]
        }
        if (this.ui.formData.fee) this.ui.formData.fee = Number(this.ui.formData.fee)
      })
    }
  }
}
