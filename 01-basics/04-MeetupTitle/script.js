import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

const vm = createApp({
  data() {
    return {
      title: '',
      id: undefined
    };
  },
  watch: {
    id (val) {
      this.fetchMeetupById(val)
    }
  },
  methods: {
    fetchMeetupById(meetupId) {
      return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
        if (response.ok) {
          return response.json().then((res) => {
            this.title = res.title
          });;
        } else {
          return response.json().then((error) => {
            throw error;
          });
        }
      });
    }
  }
}).mount('#app');

