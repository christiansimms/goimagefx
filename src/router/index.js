import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import DisplayPage from '@/components/DisplayPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/display',
      name: 'DisplayZeroLevel',
      component: DisplayPage
    },
    {
      path: '/display/:compValue',
      name: 'DisplayFirstLevel',
      component: DisplayPage
    },
    {
      path: '/display/:compValue/:compValue2',
      name: 'DisplaySecondLevel',
      component: DisplayPage
    },
    {
      path: '/display/:compValue/:compValue2/:compValue3',
      name: 'DisplayThirdLevel',
      component: DisplayPage
    },
    {
      path: '/display/:compValue/:compValue2/:compValue3/:compValue4',
      name: 'DisplayFourthLevel',
      component: DisplayPage
    }
  ],
  /* Without scrollBehavior, clicking on a page does not scroll to top of page. Of course, that's b/c we're using
   * same page multiple times. */
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})
