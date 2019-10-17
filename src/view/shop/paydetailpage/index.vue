
<template>
  <Layout class="layout fade-in-left" id="shopcell">
  <Form ref="form" :model="ui.formData" label-position="top">
    <Row :gutter="32" type="flex" justify="space-between">
    <Col span="12">
      <FormItem label="公司名称" :rules="ui.rules.selectString" prop="companyId">
        <Select v-model="ui.formData.companyId" :disabled="!!Number(ui.formData.id)">
        <Option v-for="item in getallcompanys" :key="item.companyId" :value="item.companyId">{{ item.companyName }}</Option>
        </Select>
      </FormItem>
      <FormItem label="三方名称" :rules="ui.rules.selectString" prop="channelCode">
        <Select v-model="ui.formData.channelCode" @on-change="handleChange" :label-in-value="true">
          <Option value="nanjing">南京</Option>
        </Select>
        <Input placeholder="请输入内容" v-model="ui.formData.channelName" style="display: none;"></Input>
      </FormItem>
      <FormItem label="收款姓名" :rules="ui.rules.stringItem">
        <Input placeholder="请输入内容" v-model="ui.formData.realName"></Input>
      </FormItem>
      <FormItem label="收款卡号" :rules="ui.rules.stringItem">
        <Input placeholder="请输入内容" v-model="ui.formData.bankCardNo"></Input>
      </FormItem>
      <FormItem label="三方渠道号" :rules="ui.rules.stringItem" prop="channelNo">
        <Input placeholder="请输入内容" v-model="ui.formData.channelNo"></Input>
      </FormItem>
      <FormItem label="三方商户号" :rules="ui.rules.stringItem" prop="merchantNo">
        <Input placeholder="请输入内容" v-model="ui.formData.merchantNo"></Input>
      </FormItem>
      <FormItem label="费率（百分比）" :rules="ui.rules.numberItem" prop="fee">
        <InputNumber placeholder="请输入内容" v-model="ui.formData.fee"></InputNumber>%
      </FormItem>
      <FormItem label="appId" :rules="ui.rules.stringItem">
        <Input placeholder="请输入内容" v-model="ui.formData.subAppId"></Input>
      </FormItem>
      <FormItem label="分配商户号" :rules="ui.rules.stringItem">
        <Input placeholder="请输入内容" v-model="ui.formData.ruleMerchantNo"></Input>
      </FormItem>
    </Col>
    <Col span="12">
      <FormItem label="三方请求地址" :rules="ui.rules.stringItem" prop="reqUrl">
        <Input placeholder="请输入内容" v-model="ui.formData.reqUrl"></Input>
      </FormItem>
      <FormItem label="三方商户私钥" :rules="ui.rules.stringItem">
        <Input type="textarea" :rows="4" placeholder="请输入内容" v-model="ui.formData.privateKey"></Input>
      </FormItem>
      <FormItem label="三方私钥密码" :rules="ui.rules.stringItem">
        <Input placeholder="请输入内容" v-model="ui.formData.private_pass"></Input>
      </FormItem>
      <FormItem label="三方商户公钥" :rules="ui.rules.stringItem">
        <Input type="textarea" :rows="4" placeholder="请输入内容" v-model="ui.formData.publicKey"></Input>
      </FormItem>
      <FormItem label="备注" :rules="ui.rules.stringItem">
        <Input type="textarea" :rows="4" placeholder="请输入内容" v-model="ui.formData.remark"></Input>
      </FormItem>
      <FormItem label="签名" :rules="ui.rules.stringItem">
        <Input type="textarea" :rows="4" placeholder="请输入内容" v-model="ui.formData.signKey"></Input>
      </FormItem>
      <FormItem label="扩展" :rules="ui.rules.stringItem">
        <Input placeholder="请输入内容" v-model="ui.formData.ext"></Input>
      </FormItem>
    </Col>
    </Row>
  </Form>
  <Row
    type="flex"
    justify="end"
    class="privilegesmenu">
    <Col span="2">
      <Button type="primary" @click="handleSubmit">保存</Button>
    </Col>
    <Col span="2">
      <Button type="default" @click="handleCancel">取消</Button>
    </Col>
  </Row>
  </Layout>
</template>
<script src='./index.js' type="text/javascript"></script>

<style lang="less" src='./index.less'></style>
