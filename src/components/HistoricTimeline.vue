<template>
  <v-timeline>
    <v-timeline-item
      v-for="(item) in items"
      :key="item.id"
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
        <v-card-subtitle v-if="item.subtitle">{{item.subtitle}}</v-card-subtitle>
        <v-card-text v-if="item.description">
          {{item.description}}
        </v-card-text>
        <v-card-actions>
          
        </v-card-actions>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script setup>
  import { computed, reactive } from 'vue'
  // import { VTimeline, VTimelineItem } from 'vuetify/components'
  import * as data from '@/services'
      
  const items = computed(() => {
    return data.getEvents()
  })
</script>
