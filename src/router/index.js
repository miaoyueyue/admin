import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import("@/pages/login.vue")
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/pages/home.vue"),
      children:[
        {
          path: '/project',
          component: () => import('@/pages/project'),
          name: 'project',
          meta: { title: 'project', icon: 'documentation', affix: true , requireAuth: true,}
        },
        {
          path: '/user',
          component: () => import('@/pages/user'),
          name: 'user',
          meta: { title: 'user', icon: 'documentation', affix: true  , requireAuth: true,}
        },
        {
          path: '/buildingMg',
          component: () => import('@/pages/buildingMg'),
          name: 'buildingMg',
          meta: { title: 'buildingMg', icon: 'documentation', affix: true  , requireAuth: true,}
        },
        {
          path: '/imcaMg',
          component: () => import('@/pages/imcaMg'),
          name: 'imcaMg',
          meta: { title: 'imcaMg', icon: 'documentation', affix: true  , requireAuth: true,}
        },
        {
          path: '/brandMg',
          component: () => import('@/pages/brandMg'),
          name: 'brandMg',
          meta: { title: 'brandMg', icon: 'documentation', affix: true  , requireAuth: true,}
        },
        {
          path: '/newProject',
          name: 'newProject',
          component: () => import("@/pages/newProject.vue"),
        },
        {
          path: '/projectDes',
          name: 'projectDes',
          component: () => import("@/pages/projectDes.vue"),
        },
        {
          path: '/cityDes',
          name: 'cityDes',
          component: () => import("@/pages/cityDes.vue"),
        },
        {
          path: '/proPhoto',
          name: 'proPhoto',
          component: () => import("@/pages/proPhoto.vue"),
        },
        {
          path: '/buildDes',
          name: 'buildDes',
          component: () => import("@/pages/buildDes.vue"),
        },
        {
          path: '/businessDes',
          name: 'businessDes',
          component: () => import("@/pages/businessDes.vue"),
        },
        {
          path: '/applyList',
          name: 'applyList',
          component: () => import("@/pages/applyList.vue"),
        },
        {
          path: '/addBrand',
          name: 'addBrand',
          component: () => import("@/pages/addBrand.vue"),
        },
        {
          path: '/editPro',
          name: 'editPro',
          component: () => import("@/pages/editPro.vue"),
        },
      ],
      redirect:'/project'
    },
  ]
})
