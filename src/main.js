import Vue from 'vue';
import App from './App.vue';
import { Loading, Col, DatePicker, Select, Option, Table, TableColumn, Message } from 'element-ui';
import './styles/reset.less';
import './styles/common.less';
import './styles/xmindfont.less';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Loading.directive);
Vue.use(Col);
Vue.use(DatePicker);
Vue.use(Select);
Vue.use(Option);
Vue.use(Table);
Vue.use(TableColumn);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message

Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#app');

Date.prototype.format = function(fmt) {
    let date = this;
    var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    return fmt;
};
