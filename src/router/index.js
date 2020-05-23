import Vue from 'vue'
import VueRouter from 'vue-router'
import MusicSearch from '../components/musicSearch.vue'
import MusicPlay from '../components/musicPlay.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/musics' },
    { path: '/musics', component: MusicSearch },
    { path: '/play', component: MusicPlay },
]

const router = new VueRouter({
    routes
})

export default router