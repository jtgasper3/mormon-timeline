<template>
  <v-expansion-panels class="mb-5">
    <v-expansion-panel>
      <v-expansion-panel-title>
        Filters
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row no-gutters>
          <v-col cols="12">
            Categories: 
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="4"
            v-for="item in categories"
            :key="item.value"
          >
            <v-switch
              v-model="state.filterCategories"
              :color="item.color"
              :label="item.label"
              :value="item.value"
              hide-details
              density="compact"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            Time Range:
            <v-range-slider
              v-model="state.filterDateRange"
              :min="state.dateRangeMin"
              :max="state.dateRangeMax"
              step="10"
              thumb-label="always"
              strict
            ></v-range-slider>
          </v-col>
        </v-row>
  
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
  <v-timeline>
    <v-timeline-item
      v-for="(event) in filteredEvents"
      :key="event.id"
      fill-dot
      :dot-color="getCategoryColor(event.category)"
      size="small" 
    >
      <template v-slot:opposite>
        <span
          :class="`headline font-weight-bold text-${getCategoryColor(event.category)}`"
          v-text="event.date"
        ></span>
      </template>
      <v-card>
        <v-card-title
          v-if="event.title"
          :class="`headline font-weight-light text-${getCategoryColor(event.category)}`"
        >
          {{event.title}}
        </v-card-title>
        <v-card-subtitle v-if="event.subtitle">{{event.subtitle}}</v-card-subtitle>
        <v-card-text v-if="event.description">
          {{event.description}}
        </v-card-text>
        <v-card-actions v-if="false">
          
        </v-card-actions>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script setup>
  import { computed, onMounted, reactive, watch } from 'vue'
  // import { VTimeline, VTimelineItem } from 'vuetify/components'
  import * as data from '@/services'
  
  const denominations = [
    {
      label: 'Common',
      value: 'common',
    },
    {
      label: 'Latter-day Saints',
      value: 'lds',
    },
    {
      label: 'Community of Christ',
      value: 'rlds',
    },
  ]

  const categories = [
    {
      label: 'Book Of Mormon',
      value: 'bom',
      color: 'cyan',
    },
    {
      label: 'People',
      value: 'people',
      color: 'pink',
    },
  ] // amber, orange
  
  const state = reactive({
    events: [],
    filterCategories: [],
    filterDenominations: [],
    filterDateRange: [],
    dateRangeMin: 0,
    dateRangeMax: 0,
  })

  onMounted(() => {
    state.events = data.getEvents() ?? []
  })

  const filteredEvents = computed(() => {
    return state.events
      .filter((e) => state.filterCategories.includes(e.category))
      .filter((e) => e.date > new Date(state.filterDateRange[0], 0) && e.date < new Date(state.filterDateRange[1], 11))
  })

  function getCategoryColor(category) {
    const categoryObj = categories.find((i) => i.value === category)
    return !categoryObj ? 'black' : categoryObj.color
  }

  watch(() => state.events, (count) => {
    state.dateRangeMin = Math.floor(Math.min.apply(Math, state.events.map(function(o) { return new Date(o.date).getUTCFullYear()})) / 10) * 10
    state.dateRangeMax = Math.ceil(Math.max.apply(Math, state.events.map(function(o) { return new Date(o.date).getUTCFullYear()})) / 10) * 10
    if (state.filterDateRange.length === 0) {
      state.filterDateRange = [state.dateRangeMin, state.dateRangeMax]
    }

    if (state.filterCategories.length === 0) {
      state.filterCategories = state.events
        .map(e => e.category)
        .filter((category, index, arr) => arr.indexOf(category) == index)
    }
  })
</script>
