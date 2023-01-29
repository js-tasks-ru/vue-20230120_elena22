import { createApp } from './vendor/vue.esm-browser.js';
// From https://jsonplaceholder.typicode.com/comments
const emails = [
  'Eliseo@gardner.biz',
  'Jayne_Kuhic@sydney.com',
  'Nikita@garfield.biz',
  'Lew@alysha.tv',
  'Hayden@althea.biz',
  'Presley.Mueller@myrl.com',
  'Dallas@ole.me',
  'Mallory_Kunze@marie.org',
  'Meghan_Littel@rene.us',
  'Carmen_Keeling@caroline.name',
  'Veronica_Goodwin@timmothy.net',
  'Oswald.Vandervort@leanne.org',
  'Kariane@jadyn.tv',
  'Nathan@solon.io',
  'Maynard.Hodkiewicz@roberta.com',
  'Christine@ayana.info',
  'Preston_Hudson@blaise.tv',
  'Vincenza_Klocko@albertha.name',
  'Madelynn.Gorczany@darion.biz',
  'Mariana_Orn@preston.org',
  'Noemie@marques.me',
  'Khalil@emile.co.uk',
  'Sophia@arianna.co.uk',
  'Jeffery@juwan.us',
  'Isaias_Kuhic@jarrett.net',
];

const vm = createApp({
  data() {
    return {
      searchValue: '',
      emails,
      filteredEmails: []
    };
  },
  computed: {
    fullArr () {
      return this.emails.forEach(el => {
        this.filteredEmails.push({
          email: el,
          marked: false
        })
      });
    }
  },
  watch: {
    searchValue () {
      this.search()
    }
  },
  methods: {
    search () {
      const searchFilter = (email) => [email]
        .join(' ')
        .toLowerCase()
        .includes(this.searchValue.toLowerCase())

      return this.filteredEmails.filter(el => {
        if(searchFilter(el.email)) {
          el.marked = true
        } else {
          el.marked = false
        }
      })
    }
  }
}).mount('#app');

