<template>
  <v-card>
    <v-toolbar
      dark
      color="primary"
    >
      <v-btn
        icon
        dark
        @click="close()"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Filters</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          dark
          text
          @click="close()"
        >
          Save
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title> Denominations </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row no-gutters>
            <v-col v-for="item in denominations" :key="item.value" cols="4">
              <v-switch
                v-model="filters.denominations"
                :label="item.label"
                :value="item.value"
                hide-details
                density="compact"
              ></v-switch>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title> Categories </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row no-gutters>
            <v-col v-for="item in categories" :key="item.value" cols="4">
              <v-switch
                v-model="filters.categories"
                :color="item.color"
                :label="item.label"
                :value="item.value"
                hide-details
                density="compact"
              ></v-switch>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title> Dates </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row no-gutters>
            <v-col cols="12">
              Time Range:
              <v-range-slider
                v-model="filters.dateRange"
                :min="filters.dateRangeMin"
                :max="filters.dateRangeMax"
                step="10"
                thumb-label="always"
                strict
              ></v-range-slider>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  filters: { 
    type: Object,
    required: true
  },
})

const filters = ref(props.filters)
const emit = defineEmits(['close', 'change'])

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
    label: "Book Of Mormon",
    value: "bom",
    color: "cyan",
  },
  {
    label: "People",
    value: "people",
    color: "pink",
  },
]; // amber, orange

function close() {
  emit("close");
}

</script>
