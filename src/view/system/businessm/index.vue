
<template>
  <Layout class="layout fade-in-left"
          id="shopcell">
    <div>
      <Row :gutter="16">
        <Col span="5"
             class='item'>
        <Select v-model="model.param.businessClass"
                placeholder="请选择业务大类"
                filterable
                clearable>
          <Option v-for="(item,index) in getbusstypelist"
                  :value="item.id"
                  :key="index">{{item.name}}</Option>
        </Select>
        </Col>

        <Col span="1"
             style="margin-right:40px">
        <Button type="primary"
                ghost
                icon="ios-search"
                @click='handleSearch()'>搜索</Button>

        </Col>
        <Col span="2">
        <Button type="success"
                ghost
                v-has="auth.add"
                icon="ios-add"
                @click='handlecreatecompany()'>新增</Button></Col>
      </Row>
    </div>
    <div class='widget-body'>
      <Table height="730"
             id="shopcelltable"
             :loading="ui.loading"
             :columns="ui.columns"
             :data="getdicbussinesslist.content"></Table>
      <div style="margin: 10px;">
        <div style="float: right;">
          <Page :total="getdicbussinesslist.totalElements"
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
      <!--新建客户公司-->
      <Modal v-model="ui.companycreate"
             :mask-closable="false"
             @on-visible-change="visiblechange"
             title="业务管理"
             width="990"
             footer-hide>
        <Form :label-width="92"
              ref="formValidate"
              :model="model.fromdata"
              :rules="ruleValidate">
          <FormItem label="业务名称"
                    prop="businessName">
            <Input placeholder="请输入业务名称"
                   v-model="model.fromdata.businessName"></Input>
          </FormItem>

          <FormItem label="业务大类"
                    prop="businessType">
            <Select v-model="model.fromdata.businessType"
                    placeholder="请选择业务大类"
                    filterable
                    clearable>
              <Option v-for="(item,index) in getbusstypelist"
                      :value="item.id"
                      :key="index">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="图标"
                    prop="icon">
              <img
                     style="width:92px;height:92px;border:1px dashed #e8e8e8" :src="ui.iconimgurl">
                <div style="display: none;">{{ui.iconimgurl}}</div>
                <Upload :action="ui.actionurl"
                        :headers="ui.headers"
                        :show-upload-list="false"
                        :before-upload="handlebeforeupload"
                        :on-success="handleiconsuccess"
                        :format="['jpg','jpeg','png']"
                        accept="file"
                        :multiple="true"
                        name="file">
                  <div style="margin-top:15px">
                    <Button icon="ios-cloud-upload-outline"

                            type="info">上传icon</Button>
                  </div>
                </Upload>
          </FormItem>
          <FormItem label="详情页"
                    prop="detailPage">
                <img
                     style="width:100px;height:100px;border:1px dashed #e8e8e8" :src="ui.pageimgurl">
                <div style="display: none;">{{ui.pageimgurl}}</div>
                <Upload :action="ui.actionurl"
                        :headers="ui.headers"
                        :show-upload-list="false"
                        :before-upload="handlebeforeupload"
                        :on-success="handlepagesuccess"
                        :format="['jpg','jpeg','png']"
                        accept="file"
                        :multiple="true"
                        name="file">
                  <div style="margin-top:15px">
                    <Button icon="ios-cloud-upload-outline"
                            type="info">详情图</Button>
                  </div>
                </Upload>
          </FormItem>

          <FormItem>
            <Row type="flex"
                 justify="center"
                 align="bottom">
              <Col :span=4>
              <Button type="primary"
                      icon="ios-add"
                      @click="handleBussAdd">保存</Button></Col>
              <Col :span="4"> <Button @click="handleCanle"
                      icon="ios-close-circle-outline">取消</Button></Col>
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
