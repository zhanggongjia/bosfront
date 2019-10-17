
<template>
  <Layout class="layout fade-in-left"
          id="shopcell">
    <div>
      <Row :gutter="16">
        <Col span="2"
             class='item'>
        <Select placeholder="省"
                @on-change="handleprovince"
                clearable>
          <Option v-for="(item,index) in getprovincelist"
                  :value="item.id"
                  :key="index">{{item.name}}</Option>
        </Select>
        </Col>
        <Col span="2"
             class='item'>
        <Select placeholder="市"
                @on-change="handlecity"
                v-model="model.param.areaId"
                clearable>
          <Option v-for="(item,index) in getcitylist"
                  :value="item.id"
                  :key="index">{{item.name}}</Option>
        </Select>
        </Col>

        <Col span="3"
             class='item'>
        <Select placeholder="请选择业务类型"
                v-model="model.param.businessType"
                clearable>
          <Option v-for="(item,index) in getbusinesslist"
                  :value="item.id"
                  :key="index">{{item.name}}</Option>
        </Select>
        </Col>
        <Col span="3"
             class='item'>
        <Input v-model="model.param.templateName"
               placeholder="模板名称"></Input>
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
                @click='handlecreatecompany()'>新增模板</Button></Col>
      </Row>
    </div>
    <div class='widget-body'
         v-if="gettemplatelist!==null">
      <Table height="730"
             id="shopcelltable"
             :loading="ui.loading"
             :columns="ui.columns"
             :data="gettemplatelist.content"></Table>
      <div style="margin: 10px;">
        <div style="float: right;">
          <Page :total="gettemplatelist.totalElements"
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
      <!--新建模板-->
      <Modal v-model="ui.companycreate"
             :mask-closable="false"
             @on-visible-change="visiblechange"
             :title='ui.title'
             width="960"
             footer-hide>
        <Form :label-width="92"
              ref="formDynamic"
              :model="formDynamic">
          <FormItem label="模板名称">
            <Input placeholder="请输入模板名称"
                   :disabled="this.model.formparams.templateId!==''?true:false"
                   v-model="model.formparams.templateName"></Input>
          </FormItem>
          <FormItem label="业务类型">
          <Cascader
          placeholder="请选择业务类型"
          :data="getbusinesstree"
          v-model="model.formparams.businessType"
          :disabled="this.model.formparams.templateId!==''?true:false"></Cascader>
          </FormItem>
          <FormItem label="地区选择">
            <Row :gutter="8">
              <Col span="6">
              <Select placeholder="--"
                      clearable
                      :disabled="this.model.formparams.templateId!==''?true:false"
                      ref="province"
                      @on-change="handleprovince"
                      v-model="model.formparams.topAreaId">
                <Option v-for="(item,index) in getprovincelist"
                        :value="item.id"
                        :key="index">{{item.name}}</Option>
              </Select>
              </Col>
              <Col span="6">
              <Select placeholder="--"
                      clearable
                      @on-change="handlecity"
                      ref="area"
                      :disabled="this.model.formparams.templateId!==''?true:false"
                      v-model="model.formparams.areaId">
                <Option v-for="(item,index) in getcitylist"
                        :value="item.id"
                        :key="index">{{item.name}}</Option>
              </Select>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Tabs type="card"
                  @on-click="handletabs"
                  style="overflow: unset;"
                  :before-remove='beforeRemove'>
              <TabPane v-for="(tab,index) in ui.bzs"
                       :key="index"
                       :closable="true"
                       :animated="false"
                       :label="tab.stempname">
                <Form :label-width="92"
                      ref="formDynamics">
                  <FormItem>
                    <Row style="margin-bottom:10px">
                      <Col span="2">
                      步骤名称
                      </Col>
                      <Col span="6">
                      <Input placeholder=""
                             v-model="tab.stempname"></Input>
                      </Col>
                    </Row>
                    <Row :gutter="8"
                         v-for="(item, index) in formDynamic.items"
                         :key="index"
                         :label="'字段名称'"
                         :prop="'items.' + index + '.fieldLabel'"
                         :rules="{required: true, message: '新增字段 '  +' 不能为空', trigger: 'blur'}"
                         v-if='item.status&&item.tab==ui.tabindex'
                         style="margin-bottom:10px">
                      <Col span="4">
                      <Input type="text"
                             v-model="item.fieldLabel"
                             placeholder="字段名称"></Input>
                      </Col>
                      <Col span="4">
                      <Select placeholder="字段类型"
                              v-model="item.fieldType"
                              placement="top-start"
                              clearable>
                        <Option v-for="item in getfieldlist"
                                :value="item.id"
                                :key="item.id">{{item.name}}</Option>
                      </Select>
                      </Col>
                      <Col span="4"
                           v-if="item.fieldType==='SELECT'">
                      <Select placeholder="下拉类型"
                              v-model="item.selectContent"
                              placement="top"
                              clearable>
                        <Option v-for="item in getcontentlist"
                                :value="item.id"
                                :key="item.id">{{item.name}}</Option>
                      </Select>
                      </Col>
                      <Col span="4"
                           v-if="item.fieldType==='FORM'">
                      <Select placeholder="字段类型"
                              v-model="item.subType"
                              placement="top-start"
                              clearable>
                        <Option v-for="item in getfieldlist"
                                :value="item.id"
                                :key="item.id">{{item.name}}</Option>
                      </Select>
                      </Col>
                      <Col span="4">
                      <Input placeholder="组名"
                             v-model="item.group"></Input>
                      </Col>
                      <Col span="6"
                           offset="1">
                      <Button @click="handleRemove(index)">删除</Button>
                      <Button style="margin-left: 10px;" icon="md-arrow-round-up" @click="handleUp(index)" v-if="index !==0"></Button>
                      <Button style="margin-left: 10px;" icon="md-arrow-round-down" @click="handleDown(index)" v-if="index !== formDynamic.items.length-1"></Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="12">
                      <Button type="dashed"
                              long
                              @click="handleAdd"
                              icon="md-add">添加字段</Button>
                      </Col>
                    </Row>
                  </FormItem>
                  <FormItem label="员工步骤描述">
                    <Input type="textarea" v-model="tab.staffDetails"></Input>
                  </FormItem>
                  <FormItem label="客户步骤描述">
                    <Input type="textarea" v-model="tab.custDetails"></Input>
                  </FormItem>
                  <FormItem>
                    <Row type="flex"
                         justify="center"
                         align="bottom"
                         style="margin-top:15px">
                      <Col :span=4>
                      <Button type="primary"
                              icon="ios-add"
                              :loading="ui.addloading"
                              @click="handleCompanytmpl(tab.index)">保存</Button></Col>
                      <Col :span="4"> <Button @click="handleCanle"
                              icon="ios-close-circle-outline">取消</Button></Col>
                    </Row>
                  </FormItem>
                </Form>
              </TabPane>
              <Button @click="handleTabsAdd"
                      size="small"
                      slot="extra">增加</Button>
            </Tabs>
          </FormItem>
        </Form>
      </Modal>

      <!--新建copy-->
      <Modal v-model="model.copy.show"
             :mask-closable="false"
             @on-visible-change="visiblechange"
             :title='`复制模板-${model.copy.title}`'
             width="960"
             footer-hide>
        <Form :label-width="92"
              ref="copyForm"
              :model="model.copy">
          <FormItem label="模板名称">
            <Input placeholder="请输入模板名称"
                   v-model="model.copy.data.templateName"></Input>
          </FormItem>
          <FormItem label="业务类型">
            <Cascader
              placeholder="请选择业务类型"
              :data="getbusinesstree"
              v-model="model.copy.data.businessType"></Cascader>
          </FormItem>
          <FormItem label="地区选择">
            <Row :gutter="8">
              <Col span="6">
              <Select placeholder="--"
                      clearable
                      ref="province"
                      @on-change="handleprovince"
                      v-model="model.copy.data.topAreaId">
                <Option v-for="(item,index) in getprovincelist"
                        :value="item.id"
                        :key="index">{{item.name}}</Option>
              </Select>
              </Col>
              <Col span="6">
              <Select placeholder="--"
                      clearable
                      @on-change="handlecity"
                      ref="area"
                      v-model="model.copy.data.areaId">
                <Option v-for="(item,index) in getcitylist"
                        :value="item.id"
                        :key="index">{{item.name}}</Option>
              </Select>
              </Col>
            </Row>
          </FormItem>
        </Form>
        <Row type="flex"
              justify="center"
              align="bottom">
          <Col :span=4>
          <Button type="primary"
                  icon="ios-add"
                  @click="handleCopy">保存</Button></Col>
          <Col :span="4"><Button @click="handleCancelCopy"
                  icon="ios-close-circle-outline">取消</Button></Col>
        </Row>
      </Modal>
      <Spin fix v-if="ui.spinShow">
        <Icon type="ios-loading"
              size=18
              class="demo-spin-icon-load" ></Icon>
        <div>拉取模板中...</div>
      </Spin>
    </div>
  </Layout>
</template>
<script src='./index.js' type="text/javascript">

</script>

<style lang="less" src='./index.less'>
</style>
