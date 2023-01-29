import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';

const site = 'https://vue3-course-api.hexschool.io/v2/';
const api_path = 'yuchenye';


const app = createApp({
  data(){
    return {
      products: [],  // 將api內的產品資料,逐筆列出
      tempProduct: {}  // 點擊查看細節會出現在右邊區塊
    }
  },
  methods: {
    // 驗證登入
    checkLogin(){
      // console.log(`${site}api/user/check`);
      const url = `${site}api/user/check`;
      axios.post(url)
      .then(res => {
        console.log(res);
        this.getProducts();  // 觸發第28行
      })
      .catch(err =>{
        window.location = './login.html';
      })
    },
    // 取得產品列表
    getProducts(){
      // console.log(`${site}api/${api_path}/admin/products/all`);
      const url = `${site}api/${api_path}/admin/products/all`;
      axios.get(url)
      .then(res => {
        console.log(res);
        this.products = res.data.products;  // 存到第10行的products陣列
      })
      .catch(err => {
        window.location = './login.html';
      })
    }
  },
  mounted() {
    // 將token取出
    const cookieValue = document.cookie
    .split(';')
    .find((row) => row.startsWith('myToken='))
    ?.split('=')[1];
    // console.log(cookieValue); 印出token
    // axios請求時將headers的Authorization欄位帶入token
    axios.defaults.headers.common['Authorization'] = cookieValue;
    this.checkLogin();  // 嘗試驗證登入到第14行
  },
});

app.mount('#app');
// createApp(app).mount('#app');

