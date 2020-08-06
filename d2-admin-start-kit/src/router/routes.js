import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        // meta: {
        //   auth: true,
        // },
        component: _import('system/index')
      },
      {
        path: 'Main',
        name: 'Main',
        meta: {
          title: '数据面板',
          // auth: true
        },
        component: _import('main')
      },
      // 查询
      {
        path: 'SipSearch',
        name: 'SipSearch',
        meta: {
          title: '贫困村信息查询',
          // auth: true
        },
        component: _import('search/SipSearch')
      },
      {
        path: 'ConSearch',
        name: 'ConSearch',
        meta: {
          title: '贫困户信息查询',
          // auth: true
        },
        component: _import('search/ConSearch')
      },
      //扶贫统计
      {
        path: 'PovertyFlySta',
        name: 'PovertyFlySta',
        meta: {
          title: '贫困户信息统计',
          // auth: true
        },
        component: _import('statistics/PovertyFlySta')
      },
      {
        path: 'PovertyMesSta',
        name: 'PovertyMesSta',
        meta: {
          title: '扶贫措施统计',
          // auth: true
        },
        component: _import('statistics/PovertyMesSta')
      },

      //扶贫分析
      {
        path: 'GeoWeiAns',
        name: 'GeoWeiAns',
        meta: {
          title: '地理加权回归分析',
          auth: true
        },
        component: _import('analyze/GeoWeiAns')
      },
      {
        path: 'GeoEnvAns',
        name: 'GeoEnvAns',
        meta: {
          title: '地理环境分析',
          auth: true
        },
        component: _import('analyze/GeoEnvAns')
      },
      {
        path: 'AccAns',
        name: 'AccAns',
        meta: {
          title: '可达性分析',
          auth: true
        },
        component: _import('analyze/AccAns')
      },
      {
        path: 'AreaResAns',
        name: 'AreaResAns',
        meta: {
          title: '区域资源分析',
          auth: true
        },
        component: _import('analyze/AreaResAns')
      },

      //专题制图
      {
        path: 'Drawng',
        name: 'Drawng',
        meta: {
          title: '扶贫措施展示',
          auth: true
        },
        component: _import('drawing/index')
      },

      //用户
      {
        path: 'User',
        name: 'User',
        meta: {
          title: '用户页面',
          auth: true
        },
        component: _import('user/index')
      },

    
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]