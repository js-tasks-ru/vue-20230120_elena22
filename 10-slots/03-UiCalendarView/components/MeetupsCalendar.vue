<template>
  <UiCalendarView v-slot="{ day }">
    <UiCalendarEvent
      v-for="meetup in meetupsDays[day.dateToString]"
      :key="meetup.title"
      tag="a"
      :href="`/meetups/${meetup.id}`"
    >
      {{ meetup.title }}
    </UiCalendarEvent>
  </UiCalendarView>
</template>

<script>
import UiCalendarView from './UiCalendarView.vue';
import UiCalendarEvent from './UiCalendarEvent.vue';

export default {
  name: 'MeetupsCalendar',

  components: {
    UiCalendarEvent,
    UiCalendarView,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },
  computed: {
    meetupsDays() {
      const result = {};
      this.meetups.forEach((meetup) => {
        const dateString = new Date(meetup.date).toDateString();
        if (!result[dateString]) {
          result[dateString] = [{ title: meetup.title, id: meetup.id }];
        } else {
          result[dateString].push({ title: meetup.title, id: meetup.id });
        }
      });
      return result;
    },
  },
};
</script>

<style scoped></style>
