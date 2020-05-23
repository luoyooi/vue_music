import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 页面组件库
import './plugins/element.js'

// 初始化样式
import './assets/js/flexible.js'
import './assets/css/normalize.css'
import './assets/css/index.css'

// 网络请求
import axios from 'axios'
Vue.prototype.$http = axios

// 音乐播放组件
import APlayer from '@moefe/vue-aplayer';
Vue.use(APlayer, {
    defaultCover: 'https://github.com/u3u.png',
    productionTip: true,
});

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')