<template>
  <v-timeline>
    <v-timeline-item
      v-for="(item, i) in items"
      :key="i"
      fill-dot
      :dot-color="item.color"
      size="small" 
    >
      <template v-slot:opposite>
        <span
          :class="`headline font-weight-bold text-${item.color}`"
          v-text="item.date"
        ></span>
      </template>
      <v-card>
        <v-card-title
          v-if="item.title"
          :class="`headline font-weight-light text-${item.color}`"
        >
          {{item.title}}
        </v-card-title>
        <v-card-subtitle v-if="item.subtitle">Test</v-card-subtitle>
        <v-card-text v-if="item.description">
          {{item.description}}
        </v-card-text>
        <v-card-actions>
          
        </v-card-actions>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
  import { VTimeline, VTimelineItem } from 'vuetify/components'

  export default {
    name: 'HistoricTimeline',
    components: {
      VTimeline,
      VTimelineItem
    },

    data: () => ({
      items: [
        {
          color: 'cyan',
          title: 'Joseph Smith Jr.\'s Birth',
          description: 'Joseph Smith was born in Sharon, Vermont.',
          references: ['https://en.wikipedia.org/wiki/Joseph_Smith'],
          category: 'common',
          tags: ['birth'],
          date: '1805-12-23',
        },
        {
          color: 'cyan',
          title: 'Joseph Smith Jr.\'s Death',
          description: 'Joseph Smith died in Carthage, Illinois.',
          references: ['https://en.wikipedia.org/wiki/Joseph_Smith'],
          category: 'common',
          tags: ['birth'],
          date: '1844-06-27',
        },
      ],
    }),
  }
</script>
