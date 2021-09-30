<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet>
        <div  class="calendar-header">
         
        <span class="d-flex align-center">
          <v-btn
            fab
            text
            x-large
            color="#688dc0"
            @click="prev"
          >
            <v-icon >
              mdi-arrow-left-circle
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-btn
            fab
            text
            x-large
            color="#688dc0"
            @click="next"
          >
            <v-icon >
              mdi-arrow-right-circle
            </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          </span>
         </div>
            
      </v-sheet>


      <v-sheet height="740">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          class="calendar"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @change="updateRange"
        ></v-calendar>

      </v-sheet>
    </v-col>
  </v-row>
</template>
<script>
  export default {
    data: () => ({
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
  
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan'],
    }),
    mounted () {
      this.$refs.calendar.checkChange()
    },
    methods: {
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        console.log(nativeEvent, event)
        this.$router.push(`/detail/${event.href}`)
      },
      updateRange () {
        this.events = this.$store.getters.meetups.map(m => ({name: m.title, href: m.id, start:new Date(m.date), color: this.colors[Math.floor(Math.random() * 4)], timed: 1 }))
      },
   
    },
  }
</script>
<style lang="scss">

.calendar-header {
    max-height: 78px;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: 700;
    font-size: 24px;
    line-height: 1;
    color: var(--blue);
    background-color: var(--blue-extra);
    padding: 24px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;  
}
.calendar {
  .pl-1 {
 
    font-size: 14px;
    font-weight: 500;  
    & strong {
        display: none;
    }  
  }  
  .v-calendar-weekly__day.v-past v-outside {
   @media (min-width: 969px) {
     height: 144px !important;
   } 
  }  
 
  .v-calendar-weekly__day-label{
    display: flex !important;
    justify-content: flex-end !important;
    margin-right: 4px;
    & span {
      font-weight: 400;
      font-size: 16px;
    }
  }
}

</style>