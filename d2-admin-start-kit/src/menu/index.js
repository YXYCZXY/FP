import { uniqueId } from 'lodash'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
 function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

// export const menuHeader =  supplementPath([
//   { path: '/index', title: '首页' , icon: 'home' },
//   { path: '/Main', title: '数据面板', icon: 'cogs'},
//   {
//     title:'数据查询',
//     icon:'search',
//     'children':[
//         {path:'/SipSearch',title:'简单查询',icon:'question-circle-o'},
//         {path:'/ConSearch',title:'条件查询',icon:'question-circle'}
//     ]
//   },
//   {
//     title:'贫困统计',
//     icon:'edit',
//     'children':[
//         {path:'/PovertyMesSta',title:'贫困户信息统计',icon:'address-card-o'},
//         {path:'/PovertyMeaSta',title:'扶贫措施统计',icon:'wrench'}
//     ]
//   },
//   {
//     title:'扶贫分析',
//     icon:'eye',
//     'children':[
//         {path:'/GeoWeiAns',title:'地理加权回归分析',icon:'globe'},
//         {path:'/GeoEnvAns',title:'地理环境分析',icon:'leaf'},
//         {path:'/AccAns',title:'可达性分析',icon:'car'},
//         {path:'/AreaResAns',title:'区域资源分析',icon:'area-chart'}
//     ]
//   },
//   {
//     title:'专题制图',
//     icon:'map-o',
//     'children':[
//         {path:'/PovertyMeaDraw',title:'扶贫措施制图'},
//         {path:'/VillageDraw',title:'村庄信息制图'}
//     ]
//   },
//   {path:'/User',title:'用户页面',icon:'steam'}
// ])

export const menuAside =  supplementPath([
  { path: '/index', title: '数据面板', icon: 'home'  },
  // { path: '/Main', title: '数据面板', icon: 'cogs' },
  {
    title:'数据查询',
    icon:'search',
    'children':[
        {path:'/SipSearch',title:'贫困村信息查询',icon:'question-circle-o'},
        {path:'/ConSearch',title:'贫困户信息查询',icon:'question-circle'}
    ]
  },
  {
    title:'贫困统计',
    icon:'edit',
    'children':[
        {path:'/PovertyFlySta',title:'贫困户信息统计',icon:'address-card-o'},
        {path:'/PovertyMesSta',title:'扶贫措施统计',icon:'wrench'}
    ]
  },
  {
    title:'扶贫分析',
    icon:'eye',
    'children':[
      {path:'/GeoWeiAns',title:'地理加权回归分析',icon:'globe'},
      {path:'/GeoEnvAns',title:'地理环境分析',icon:'leaf'},
      {path:'/AccAns',title:'可达性分析',icon:'car'},
      {path:'/AreaResAns',title:'区域资源分析',icon:'area-chart'}
    ]
  },
  {path:'/Drawng',title:'扶贫措施展示',icon:'map-o'},
  {path:'/User',title:'用户页面',icon:'steam'}
])
