
<template>
  <Layout class="layout fade-in-left"
          id="business">
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
             :data="getlist.content"></Table>
      <div style="margin: 10px;">
        <div style="float: right;">
          <Page :total="getlist.totalElements"
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

      <!--权限-->
      <Modal v-model="ui.privilegescreate"
             :mask-closable="false"
             @on-visible-change="visiblechange"
             :title="ui.title"
             width="800"
             footer-hide>
        <Row type="flex">
          <Col span="24">
          <Card>
            <Tree :data="ui.privilegesList"
                  ref="roleprivilegeslist"
                  :multiple="false"
                  @on-select-change="handleselectchange"
                  show-checkbox></Tree>
          </Card>
          </Col>
        </Row>
        <Row type="flex"
             justify="center"
             class="privilegesmenu">
          <Col span="4">
          <Button type="primary"
                  @click="handleSubmitPrivilegs">保存</Button>
          </Col>
          <Col span="4">
          <Button type="default"
                  @click="handleCanle">取消</Button>
          </Col>
        </Row>
      </Modal>
      <Modal v-model="ui.fltree"
             title="详情维护"
             width="660px"
            footer-hide
           @on-visible-change="visiblechanges"
             >
        <Row>
          <Col span="24" v-if="ui.selectedleafItem && ui.selectedleafItem.level === 2">
            <img style="width:92px;height:92px;border:1px dashed #e8e8e8" :src="ui.iconimgurl"/>
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
          </Col>
          <Col span="24" style="margin-top:10px" v-if="ui.selectedleafItem && ui.selectedleafItem.level === 2">
            <img :src="ui.pageimgurl"
                style="width:200px;height:200px;border:1px dashed #e8e8e8">
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
          </Col>
          <Col span="24" style="margin-top:10px; margin-bottom:20px" v-if="ui.selectedleafItem && ui.selectedleafItem.level === 3">
            <Select v-model="model.fromdata.businessTemplateId">
              <Option :value="item.templateId" v-for="item in getalltemplatelist" :key="item.templateId">{{ item.templateName }}</Option>
            </Select>
          </Col>
        </Row>
         <Row type="flex"
                 justify="center"
                 align="bottom">
              <Col :span=4>
              <Button type="primary"
                      icon="ios-add"
                      @click="handleBussAdd">保存</Button></Col>
              <Col :span="4"> <Button @click="handleCanlefltree"
                      icon="ios-close-circle-outline">取消</Button></Col>
            </Row>
      </Modal>
    </div>
  </Layout>
</template>
<script src='./index.js' type="text/javascript"></script>

<style lang="less" src='./index.less'></style>
