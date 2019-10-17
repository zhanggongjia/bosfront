
<template>
  <Layout class="layout fade-in-left" id="shopcell">
    <div>
      <Row :gutter="16">
        <Col span="2">
          <Button type="success"
                  ghost
                  v-has="auth.add"
                  icon="ios-add"
                  @click.native="handleAddClick">新增</Button>
        </Col>
        <Col span="5" class='item' push="10">
          <Input placeholder="请输入公司名称"
              @keyup.enter.native='handleSearch()'
              v-model="param.companyName"/>
        </Col>
        <Col span="5" class='item' push="10">
          <Input placeholder="请输入三方商户号"
              @keyup.enter.native='handleSearch()'
              v-model="param.merchantNo"/>
        </Col>
        <Col span="1"
              style="margin-right:40px" push="10">
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
             :data="getpaylist.content"></Table>
      <div style="margin: 10px;">
        <div style="float: right;">
          <Page :total="getpaylist.totalElements"
                transfer
                show-sizer
                show-total
                v-if="getpaylist.totalElements > param.pageSize"
                :current="param.pageNum"
                :page-size="param.pageSize"
                :page-size-opts="ui.pageSizeOpts"
                @on-change='handlepage'
                @on-page-size-change='handlepagesize' />
        </div>
      </div>
    </div>
  </Layout>
</template>
<script src='./index.js' type="text/javascript"></script>

<style lang="less" src='./index.less'></style>
