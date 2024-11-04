<template>
    <div>
    <v-app-bar
            density="compact"
            elevation="1"
          >
            <v-btn icon>
              <v-icon >mdi-message-badge</v-icon>
            </v-btn>
    
            <div class=" ">You're welcome, Patrick!</div>
    
            <v-spacer></v-spacer>
    
            <v-btn
              append-icon="mdi-filter-variant"
              class="text-none"
            >
              Filter
            </v-btn>
           
            <v-btn icon>
              <v-icon>mdi-more-vert</v-icon>
            </v-btn>
    
            <div class="parent-container">
              <v-text-field
                size="xsmall"
                density="compact"
                variant="outlined"
                class="h-50 m-small custom-text-field"
                label="Search"
              ></v-text-field>
            </div>
    
           
          </v-app-bar>
        <v-card class="ma-2">
          <div>
   
    <v-sheet>
      <v-calendar
      
        ref="calendar"
        v-model="value"
        :events="events"
        :view-mode="type"
        :weekdays="weekday"
      ></v-calendar>
    </v-sheet>
  </div>
  
</v-card>
<v-btn
        class="pe-2"
        prepend-icon="mdi-account-multiple-outline"
        variant="flat"
      >
        <div class="text-none font-weight-regular">
          Share
        </div>

        </v-btn>
</div>
  </template>
  
  <script>
  import { useDate } from 'vuetify'
  export default {
    
    data: () => ({ 
        
      type: 'month',
      types: ['month', 'week', 'day'],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { title: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
        { title: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
        { title: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
        { title: 'Mon, Wed, Fri', value: [1, 3, 5] },
      ],
      value: [new Date()],
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      titles: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
        disabled: false,
        panel: [0, 1],
        files: [
        {
          color: 'blue',
          icon: 'mdi-clipboard-text',
          subtitle: 'Jan 20, 2014',
          title: 'Vacation itinerary',
        },
        {
          color: 'amber',
          icon: 'mdi-gesture-tap-button',
          subtitle: 'Jan 10, 2014',
          title: 'Kitchen remodel',
        },
      ],
      folders: [
        {
          subtitle: 'Jan 9, 2014',
          title: 'Photos',
        },
        {
          subtitle: 'Jan 17, 2014',
          title: 'Recipes',
        },
        {
          subtitle: 'Jan 28, 2014',
          title: 'Work',
        },
      ],
      }),
      mounted () {
      const adapter = useDate()
      this.getEvents({ start: adapter.startOfDay(adapter.startOfMonth(new Date())), end: adapter.endOfDay(adapter.endOfMonth(new Date())) })
    },
    methods: {
      getEvents ({ start, end }) {
        const events = []

        const min = start
        const max = end
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = this.rnd(days, days + 20)

        for (let i = 0; i < eventCount; i++) {
          const allDay = this.rnd(0, 3) === 0
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)

          events.push({
            title: this.titles[this.rnd(0, this.titles.length - 1)],
            start: first,
            end: second,
            color: this.colors[this.rnd(0, this.colors.length - 1)],
            allDay: !allDay,
          })
        }

        this.events = events
      },
      getEventColor (event) {
        return event.color
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
    
  };
  </script>
  
  
  