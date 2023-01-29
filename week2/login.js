import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';

const site = 'https://vue3-course-api.hexschool.io/v2/';

const app = createApp({
  data(){
    return {
      user: {
        username: '',
        password: '',
      }
    }
  },
  methods:{
    login(){
      // console.log(this.user);  
      const url = `${site}admin/signin`;
      axios.post(url, this.user)
        .then((res)=>{
          console.log(res);
          // 一般寫法未使用結構，取出使用期限跟token
          // const expired = res.data.expired;
          // const token = res.data.token;
          // console.log(expired, token);
          // 1.以下為結構寫法
          const {expired, token} = res.data;
          console.log(expired, token);
          // 2.將cookie存到瀏覽器
          document.cookie = `myToken=${token}; expires=${new Date(expired)};`;
          // 3.轉址:轉到第2周的產品頁面
          window.location = './products.html';
        })
        .catch((err)=>{
          console.log(err);
        })
    }
  },
  mounted(){
    console.log('mounted');
    console.log(`${site}admin/signin`);
    
  }
});

app.mount('#app');