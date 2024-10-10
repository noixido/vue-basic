import { createApp } from 'vue'
import './assets/css/main.css'
import App from './App.vue'
import router from './router/index';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-dt';
 
DataTable.use(DataTablesCore);

const app = createApp(App);
app.use(router);
app.mount('#app');

