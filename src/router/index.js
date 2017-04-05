import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/globe'
import Hello2 from '@/components/globe2'
import Hello3 from '@/components/globe3'
import Hello4 from '@/components/globe4'
import Hello5 from '@/components/globe5'
import Hello6 from '@/components/globe6'
import Hello7 from '@/components/globe7'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello7
    }
  ]
})
