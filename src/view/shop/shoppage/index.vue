
<template>
  <Layout class="layout fade-in-left" id="shopcell">
    <div>
      <Row :gutter="16">
        <Col span="3" style="margin-right:15px;" class='item'><Input placeholder="公司名称" @keyup.enter.native='handleSearch()' v-model="model.param.companyName" /></Col>
        <Button style="margin-right:25px;" type="primary" ghost icon="ios-search" @click='handleSearch()'>搜索</Button>
        <Button style="margin-right:25px;" type="success" ghost v-has="auth.add" icon="ios-add" @click='handlecreatecompany()'>新增</Button>
        <Button style="margin-right:25px;" type="success" ghost v-has="auth.add" @click='ui.companyedit = true'>编辑模板网站信息</Button>
      </Row>
    </div>
    <div class='widget-body'>
      <Table height="730" id="shopcelltable" :loading="ui.loading" :columns="ui.columns" :data="getshoplist.content"></Table>
      <div style="margin: 10px;">
        <div style="float: right;">
          <Page :total="getshoplist.totalElements" transfer show-sizer show-total :current="model.param.pageNum" :page-size="model.param.pageSize" :page-size-opts="ui.pageSizeOpts" @on-change='handlepage' @on-page-size-change='handlepagesize' />
        </div>
      </div>
      <Divider type="vertical" />
      <!--新建客户公司-->
      <Modal v-model="ui.companycreate" :mask-closable="false" @on-visible-change="visiblechange" title="新建商户" width="800" footer-hide>
        <Form :label-width="92" ref="formValidate" :model="model.fromdata" :rules="ruleValidate">
          <FormItem label="联系人名称" prop="adminName">
            <Input placeholder="请输入联系人" v-model="model.fromdata.adminName"></Input>
          </FormItem>

          <FormItem label="商户邮箱" prop="adminEmail">
            <Input placeholder="请输入商户邮箱" v-model="model.fromdata.adminEmail"></Input>
          </FormItem>
          <FormItem label="商户密码" prop="adminPassword">
            <Input placeholder="请输入商户密码" type="password" v-model="model.fromdata.adminPassword"></Input>
          </FormItem>
          <FormItem label="商户手机号" prop="adminPhone">
            <Input placeholder="请输入商户手机号" v-model="model.fromdata.adminPhone"></Input>
          </FormItem>

          <FormItem label="公司名称" prop="companyName">
            <Input placeholder="请输入公司名称" v-model="model.fromdata.companyName"></Input>
          </FormItem>
          <FormItem label="总条数" prop="watersNum">
            <Input v-model="model.fromdata.watersNum"></Input>
          </FormItem>
          <FormItem label="有效期" prop="expireTime">
            <Date-picker type="date" placeholder="选择日期和时间" v-model="model.fromdata.expireTime"></Date-picker>
          </FormItem>
          <FormItem label="区域">
            <row :gutter="8">
              <Col span="6">
              <Select placeholder="--" clearable ref="province" v-model="model.fromdata.topAreaId">
                @on-change="handleprovince">
                <Option v-for="(item,index) in getprovincelist" :value="item.id" :key="index">{{item.name}}</Option>
              </Select>
              </Col>
              <Col span="6">
              <Select placeholder="--" clearable @on-change="handlecity" ref="area" v-model="model.fromdata.areaId">
                <Option v-for="(item,index) in getcitylist" :value="item.id" :key="index">{{item.name}}</Option>
              </Select>
              </Col>
            </row>
          </FormItem>
          <FormItem>
            <Row type="flex" justify="center" align="bottom">
              <Col :span=4>
              <Button type="primary" icon="ios-add" @click="handleCompanyAdd">保存</Button></Col>
              <Col :span="4"> <Button @click="handleCanle" icon="ios-close-circle-outline">取消</Button></Col>
            </Row>
          </FormItem>
        </Form>
      </Modal>
      <!--权限-->
      <Modal v-model="ui.privilegescreate" :mask-closable="false" @on-visible-change="visiblechange" title="权限配置" width="800" footer-hide>
        <Row type="flex">
          <Col span="24">
          <Card>

            <Tree :data="ui.privilegesList" ref="roleprivilegeslist" multiple :check-strictly="true" show-checkbox></Tree>

          </Card>
          </Col>
        </Row>
        <Row type="flex" justify="center" class="privilegesmenu">
          <Col span="4">
          <Button type="primary" @click="handleSubmitPrivilegs">保存</Button>
          </Col>
          <Col span="4">
          <Button type="default" @click="handleCanle">取消</Button>
          </Col>
        </Row>
      </Modal>

      <!--编辑模板网站信息-->
      <Modal v-model="ui.companyedit" class="edittemplate" :mask-closable="false" @on-visible-change="visiblechange" title="编辑模板网站信息" width="1200" footer-hide>
        <div class="tips">
          <div class="addpicture">
            <div class="headers">网站配图 |</div>
            <div class="picticture-content">
              <row :gutter="8">
                <Col span="7">
                <div class="top">公司LOGO（建议尺寸：XXXXXX）</div>
                <div class="content">
                  <img src="../../../assets/images/login-bg.jpg" alt="">
                  <Upload action="//jsonplaceholder.typicode.com/posts/">
                    <Button icon="ios-cloud-upload-outline">选择图片</Button>
                  </Upload>
                </div>
                </Col>
                <Col span="7">
                <div class="top">公司LOGO（建议尺寸：XXXXXX）</div>
                <div class="content">
                  <img src="../../../assets/images/login-bg.jpg" alt="">
                  <Upload action="//jsonplaceholder.typicode.com/posts/">
                    <Button icon="ios-cloud-upload-outline">选择图片</Button>
                  </Upload>
                </div>
                </Col>
                <Col span="7">
                <div class="top">公司LOGO（建议尺寸：XXXXXX）</div>
                <div class="content">
                  <img src="../../../assets/images/login-bg.jpg" alt="">
                  <Upload action="//jsonplaceholder.typicode.com/posts/">
                    <Button icon="ios-cloud-upload-outline">选择图片</Button>
                  </Upload>
                </div>
                </Col>
              </row>
              <row :gutter="8">
                <Col span="7">
                <div class="top">公司LOGO（建议尺寸：XXXXXX）</div>
                <div class="content">
                  <img src="../../../assets/images/login-bg.jpg" alt="">
                  <Upload action="//jsonplaceholder.typicode.com/posts/">
                    <Button icon="ios-cloud-upload-outline">选择图片</Button>
                  </Upload>
                </div>
                </Col>
                <Col span="7">
                <div class="top">公司LOGO（建议尺寸：XXXXXX）</div>
                <div class="content">
                  <img src="../../../assets/images/login-bg.jpg" alt="">
                  <Upload action="//jsonplaceholder.typicode.com/posts/">
                    <Button icon="ios-cloud-upload-outline">选择图片</Button>
                  </Upload>
                </div>
                </Col>
                <Col span="7">
                <div class="top">公司LOGO（建议尺寸：XXXXXX）</div>
                <div class="content">
                  <img src="../../../assets/images/login-bg.jpg" alt="">
                  <Upload action="//jsonplaceholder.typicode.com/posts/">
                    <Button icon="ios-cloud-upload-outline">选择图片</Button>
                  </Upload>
                </div>
                </Col>
              </row>
              <div>
                <div class="top">公司LOGO（建议尺寸：XXXXXX）</div>
                <div class="content">
                  <img src="../../../assets/images/login-bg.jpg" alt="">
                  <img src="../../../assets/images/login-bg.jpg" alt="">
                  <img src="../../../assets/images/login-bg.jpg" alt="">
                  <Upload action="//jsonplaceholder.typicode.com/posts/">
                    <Button icon="ios-cloud-upload-outline">选择图片</Button>
                  </Upload>
                </div>
              </div>
            </div>
          </div>
          <div class="addpicture">
            <div class="headers">关于我们 |</div>
            <div class="picticture-content">
              <Form :label-width="60" ref="formValidate" :model="model.fromdata" :rules="ruleValidate">
                <FormItem label="公司地址">
                  <Input placeholder="" v-model="model.fromdata.adminName"></Input>
                </FormItem>
                <FormItem label="底部电话">
                  <Input placeholder="" v-model="model.fromdata.adminName"></Input>
                </FormItem>
                <FormItem label="ICP备案">
                  <Input placeholder="" v-model="model.fromdata.adminName"></Input>
                </FormItem>
              </Form>
              <row :gutter="8">
                <Col span="7">
                <div class="top">微信二维码（建议尺寸：XXXXXX）</div>
                <div class="content">
                  <img src="../../../assets/images/login-bg.jpg" alt="">
                  <Upload action="//jsonplaceholder.typicode.com/posts/">
                    <Button icon="ios-cloud-upload-outline">选择图片</Button>
                  </Upload>
                </div>
                </Col>
              </row>
              <div>
                <div class="top">关于我们详细介绍</div>
                <div class="text-ipt">
                  <Input width="80%" v-model="model.fromdata.adminName" type="textarea" :rows="3" placeholder="Enter something..." />
                </div>
              </div>
              <div>
                <div class="top">地图地位</div>
                <div class="text-ipt">
                  <Input placeholder="" v-model="model.fromdata.adminName"></Input>
                </div>
              </div>
              <div class="maps" id="maps"></div>
              <div class="btn">
                <Row type="flex" justify="center" align="bottom">
                  <Col :span=4>
                  <Button type="primary" icon="ios-add" @click="handleCompanyAdd">保存</Button></Col>
                  <Col :span="4"> <Button @click="ui.companyedit=false" icon="ios-close-circle-outline">取消</Button></Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  </Layout>
</template>
<script src='./index.js' type="text/javascript">

</script>

<style lang="less" src='./index.less'>
</style>
