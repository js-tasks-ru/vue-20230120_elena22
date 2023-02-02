import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../../06-MeetupView/components/MeetupView'
import { fetchMeetupById } from '../meetupService.js';

export default defineComponent({
  name: 'PageMeetup',
  components: {
    UiAlert,
    UiContainer,
    MeetupView
  },
  props: {
    meetupId: {
      type: Number,
      require: true
    }
  },
  data: () => ({
    meetup: undefined,
    error: false,
    errorText: undefined,
    loading: false
  }),
  watch: {
    meetupId: {
      handler(val) {
        this.loading = true
        this.error = false
        fetchMeetupById(val)
          .then(res => {
            this.meetup = res
            this.loading = false
          })
          .catch((e) => {
            this.loading = false
            this.error = true
            this.errorText = e.message
          })
      },
      immediate: true
    }
  },
  template: `
    <div class="page-meetup">
      <MeetupView v-if="meetup && !loading && !error" :meetup="meetup"/>

      <UiContainer v-if="loading">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-if="error">
        <UiAlert>{{errorText}}</UiAlert>
      </UiContainer>
    </div>`,
});
