import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';

const site = 'https://vue3-course-api.hexschool.io/v2/';

const app = createApp({
  data(){
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login(){
      // console.log(`${site}admin/signin`);
      const url = `${site}admin/signin`;
      axios.post(url, this.user)
      .then(res => {
        // console.log(res)
        const {expired, token} = res.data;
        document.cookie = `myToken=${token}; expires=${new Date(expired)};`;
        window.location = 'products.html';
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
})
app.mount('#app');
