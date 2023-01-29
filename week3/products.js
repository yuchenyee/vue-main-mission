import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';


const site = 'https://vue3-course-api.hexschool.io/v2/';
const api_path = 'yuchenye';

let productModal = {};
let delProductModal = {};

const app = createApp({
  data(){
    return {
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false,  // 確認是編輯或新增所使用的
    }
  },
  methods: {
    // 1.取得產品列表
    getProducts(){
      // console.log(`${site}api/${api_path}/admin/products/all`);
      const url = `${site}api/${api_path}/admin/products/all`;
      axios.get(url)
      .then(res => {
        console.log(res);
        this.products = res.data.products;  // 存到第13行的products陣列
      })
      .catch(err => {
        console.log(err.data.message);
      })
    },
    openModal(status, product){
      // productModal.show();
      if(status==='create'){
        productModal.show();
        this.isNew = true;
        //  帶入初始資料
        this.tempProduct = {
          imagesUrl: [],
        }
      } else if(status==='edit'){
        productModal.show();
        this.isNew = false;
        // 帶入當前要編輯的資料
        this.tempProduct = {...product};
      } else if(status==='delete'){
        delProductModal.show();
        this.tempProduct = {...product};
      }
    },
    // 新增產品內容
    updateProduct(){
      let url = `${site}api/${api_path}/admin/product`;
      // 用this.isNew 判斷 API 要怎麼運行，用變數來管理
      let method = 'post';
      if(!this.isNew){
        url = `${site}api/${api_path}/admin/product/${this.tempProduct.id}`;
        method = 'put';
      }
      axios[method](url, { data: this.tempProduct })
      .then(res=>{
        this.getProducts();  // 新增完之後,在跑一次重新取得列表結果
        productModal.hide(); // 新增完,將視窗關閉
      })
    },
    // 刪除產品內容
    deleteProduct(){
      const url = `${site}api/${api_path}/admin/product/${this.tempProduct.id}`;
      // 用this.isNew 判斷 API 要怎麼運行，用變數來管理
      axios.delete(url)
      .then(res=>{
        this.getProducts();  // 新增完之後,在跑一次重新取得列表結果
        delProductModal.hide(); // 新增完,將視窗關閉
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
    this.getProducts();  // 嘗試驗證登入到第22行

    // bootstrap 方法
    console.log(bootstrap)
    // 1. 初始化 new
    productModal = new bootstrap.Modal('#productModal');
    delProductModal = new bootstrap.Modal('#delProductModal');
    // 2. 呼叫方法 show, hide
    // productModal.show();  // 確保會動    
  },
});

app.mount('#app');







