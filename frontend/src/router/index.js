import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from 'js-cookie';

import FreezbeView from '../views/FreezbeView'
import EditFreezbeView from '../views/EditFreezbeView'
import AddFreezbeView from '@/views/AddFreezbeView'

import IngredientView from '../views/IngredientView'
import EditIngredientView from '../views/EditIngredientView'
import AddIngredientView from '../views/AddIngredientView'

import ProcedeView from '../views/ProcedeView'
import EditProcedeView from '../views/EditProcedeView'
import AddProcedeView from '../views/AddProcedeView'

import LoginView from '@/views/LoginView'

import { parseJwt } from '@/assets/jwt';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/freezbe',
    name: 'freezbe',
    component: FreezbeView,
    meta: {
      requiresAuth: true, // Indique que l'authentification est requise pour cette route
      allowedRoles: ['SCH_RD', 'SCH_PROD']
    },
  },
  {
    path: '/freezbe/edit/:id',
    name: 'editFreezbe',
    component: EditFreezbeView,
    props: true,
    meta: {
      requiresAuth: true, // Indique que l'authentification est requise pour cette route
      allowedRoles: ['SCH_RD']
    },
  },
  {
    path: '/freezbe/add',
    name: 'addFreezbe',
    component: AddFreezbeView,
    meta: {
      requiresAuth: true, // Indique que l'authentification est requise pour cette route
      allowedRoles: ['SCH_RD']
    },
  },
  {
    path: '/ingredient',
    name: 'ingredient',
    component: IngredientView,
    meta: {
      requiresAuth: true, // Indique que l'authentification est requise pour cette route
      allowedRoles: ['SCH_RD']
    },
  },
  {
    path: '/ingredient/edit/:id',
    name: 'editIngredient',
    component: EditIngredientView,
    props: true,
    meta: {
      requiresAuth: true, // Indique que l'authentification est requise pour cette route
      allowedRoles: ['SCH_RD']
    },
  },
  {
    path: '/ingredient/add',
    name: 'addIngredient',
    component: AddIngredientView,
    meta: {
      requiresAuth: true, // Indique que l'authentification est requise pour cette route
      allowedRoles: ['SCH_RD']
    },
  },
  {
    path: '/procede',
    name: 'procede',
    component: ProcedeView,
    meta: {
      requiresAuth: true, // Indique que l'authentification est requise pour cette route
      allowedRoles: ['SCH_RD', 'SCH_TEST']
    }
  },
  {
    path: '/procede/edit/:id',
    name: 'editProcede',
    component: EditProcedeView,
    props: true,
    meta: {
      requiresAuth: true, // Indique que l'authentification est requise pour cette route
      allowedRoles: ['SCH_RD', 'SCH_TEST']
    },
  },
  {
    path: '/procede/add',
    name: 'addProcede',
    component: AddProcedeView,
    meta: {
      requiresAuth: true, // Indique que l'authentification est requise pour cette route
      allowedRoles: ['SCH_RD', 'SCH_TEST']
    },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      requiresAuth: false // Indique si l'authentification est requise pour cette route
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Garde de navigation global
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!Cookies.get('token'); // Vérifiez si l'utilisateur est authentifié
  

  if (to.meta.requiresAuth) {
    if (isAuthenticated) {
      const jwtToken = Cookies.get('token');
      const userRole = jwtToken ? parseJwt(jwtToken).role : null;

      // L'utilisateur est authentifié, vérifiez son rôle pour déterminer l'accès
      if (userRole === 'SCH_RD' && to.meta.allowedRoles.includes('SCH_RD')) {
        // L'utilisateur a le rôle "SCH_RD" et la route est autorisée pour ce rôle
        next();
      } else if (userRole === 'SCH_PROD' && to.meta.allowedRoles.includes('SCH_PROD')) {
        // L'utilisateur a le rôle "SCH_PROD" et la route est autorisée pour ce rôle
        next();
      } else if (userRole === 'SCH_TEST' && to.meta.allowedRoles.includes('SCH_TEST')) {
        // L'utilisateur a le rôle "SCH_TEST" et la route est autorisée pour ce rôle
        next();
      } else {
        // L'utilisateur n'a pas le bon rôle pour cette route, laissez-le sur sa page actuelle
        next(false);
      }
    } else {
      // L'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
      next('/login');
    }
  } else {
    // Cette route ne nécessite pas d'authentification, laissez l'utilisateur passer
    next();
  }
});

export default router
