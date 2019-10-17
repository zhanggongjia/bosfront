
<template>
  <Layout class="layout fade-in-left"
          id="shopcell">
    <div>
      <Row :gutter="16">
        <Col span="3"
             class='item'>
        <Input placeholder="公司名称"
               @keyup.enter.native='handleSearch()'
               v-model="model.param.companyName" />
        </Col>

        <Col span="1"
             style="margin-right:40px">
        <Button type="primary"
                ghost
                icon="ios-search"
                @click='handleSearch()'>搜索</Button>

        </Col>
      </Row>
    </div>
    <div class='widget-body'>
      <Table height="730"
             id="shopcelltable"
             :loading="ui.loading"
             :columns="ui.columns"
             :data="getshoplist.content"></Table>
      <div style="margin: 10px;">
        <div style="float: right;">
          <Page :total="getshoplist.totalElements"
                transfer
                show-sizer
                show-total
                :current="model.param.pageNum"
                :page-size="model.param.pageSize"
                :page-size-opts="ui.pageSizeOpts"
                @on-change='handlepage'
                @on-page-size-change='handlepagesize' />
        </div>
      </div>
      <Divider type="vertical" />
      <Modal v-model="ui.wxlist"
             title="微信配置"
             width="900"
             footer-hide
             :mask-closable="false">
        <Row style="margin-bottom:10px">
          <Col span="12">
          <Button type="success"
                  icon="ios-add"
                  ghost
                  @click="handlecreate()">新增微信配置</Button>
          </Col>
        </Row>
        <Table :columns="ui.bannercloumns"
               :data="getweichatalllist.content"
               height="400"></Table>
        <div style="margin: 10px;">
          <div style="float: right;">
            <Page :total="getweichatalllist.totalElements"
                  transfer
                  show-sizer
                  show-total
                  :current="model.detaillist.page"
                  :page-size="model.detaillist.size"
                  @on-change='handledetailpage' />
          </div>
          <Divider type="vertical" />
        </div>
      </Modal>
      <Modal v-model="ui.wxcifg"
             :title="model.formdata.id!=''?'编辑配置':'新增配置'"
             width="600"
             footer-hide
             @on-visible-change="visiblepic"
             :mask-closable="false">
        <Form :label-width="12">

          <FormItem prop="appId">
            <Input v-model="model.formdata.appId" placeholder="微信appId"></Input>
          </FormItem>
             <FormItem prop="appSecret">
            <Input v-model="model.formdata.appSecret" placeholder="微信appSecret"></Input>
          </FormItem>
                       <FormItem prop="wxType">
          <Select v-model="model.formdata.wxType">
            <Option v-for="(item,index) in ui.wxtypes" :value="item" :key="index">{{item}}</Option>
          </Select>
          </FormItem>
          <FormItem>
            <Row type="flex"
                 align="bottom">
              <Col :span=4>
              <Button type="warning"
                      shape="circle"
                      ghost
                      icon="ios-add-circle-outline"
                      @click="handlesubmit">保存</Button></Col>

            </Row>
          </FormItem>
        </Form>
      </Modal>
    </div>
  </Layout>
</template>
<script src='./index.js' type="text/javascript">

</script>

<style lang="less" src='./index.less'>
</style>
