import Main from '@/components/main'
import parentView from '@/components/parent-view'
import PayPage from '@/view/shop/paypage/index.vue'
import PayDetailPage from '@/view/shop/paydetailpage/index.vue'
/**
 * admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: false,
      notCache: false
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: false,
          title: '首页',
          notCache: false,
          icon: 'md-home'
        },
        component: () => import('@/view/home/home')
      }
    ]
  },

  {
    path: '/shop',
    name: 'shop',
    notCache: true,
    meta: {
      icon: '_shanghu',
      title: '商户管理',
      showAlways: true,
      access: ['boss:shop:list']
    },
    component: Main,
    children: [
      {
        path: 'shop_page',
        name: 'shop_page',
        meta: {
          title: '商户管理',
          icon: '_diannao',
          access: ['boss:shop:list']

        },
        component: () => import('@/view/shop/shoppage/index.vue')
      },
      {
        path: 'shop_banner_page',
        name: 'shop_banner_page',
        meta: {
          title: '商户图片管理',
          icon: '_diannao',
          access: ['boss:shop:template:list']
        },
        component: () => import('@/view/system/banner/index.vue')
      },
      {
        path: 'shop_wechat_page',
        name: 'shop_wechat_page',
        meta: {
          title: '商户微信管理',
          icon: '_diannao',
          access: ['boss:shop:template:list']
        },
        component: () => import('@/view/system/wechat/index.vue')
      },
      {
        path: 'pay_page',
        name: 'pay_page',
        meta: {
          title: '商户支付配置',
          icon: '_diannao',
          access: ['boss:shop:list']
        },
        component: PayPage
      },
      {
        path: 'pay_newslist',
        name: 'pay_newslist',
        meta: {
          title: '商户新闻列表',
          icon: '_diannao',
          access: ['boss:shop:template:list']
        },
        component: () => import('@/view/system/businessList/businessList.vue')
      },
      {
        path: 'pay_detail_page/:id',
        name: 'pay_detail_page',
        meta: {
          hideInMenu: true,
          title: '编辑商户支付配置',
          icon: '_diannao',
          access: ['boss:shop:list']
        },
        component: PayDetailPage
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    notCache: true,
    meta: {
      icon: '_xitongshezhi_1',
      title: '系统管理',
      showAlways: true,
      access: ['boss:shop:system:list']
    },
    component: Main,
    children: [
      {
        path: 'shop_template_page',
        name: 'shop_template_page',
        meta: {
          title: '模板管理',
          icon: '_diannao',
          access: ['boss:shop:template:list']
        },
        component: () => import('@/view/system/index/index.vue')
      },
      {
        path: 'business_template_page',
        name: 'business_template_page',
        meta: {
          title: '业务分配',
          icon: '_diannao',
          access: ['boss:shop:template:list']
        },
        component: () => import('@/view/system/business/index.vue')
      },
      {
        path: 'businessm_dict_page',
        name: 'businessm_dict_page',
        meta: {
          title: '字典管理',
          showAlways: true,
          icon: '_diannao',
          access: ['boss:shop:template:list']
        },
        component: parentView,
        children: [
          {
            path: 'businessm_temp_page',
            name: 'businessm_temp_page',
            meta: {
              title: '业务字典管理',
              icon: '_diannao',
              access: ['boss:shop:template:list']
            },
            component: () => import('@/view/system/businessm/index.vue')
          },
          {
            path: 'sub_businessm_temp_page',
            name: 'sub_businessm_temp_page',
            meta: {
              title: '子业务字典管理',
              icon: '_diannao',
              access: ['boss:shop:template:list']
            },
            component: () => import('@/view/system/subbusinessm/index.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
