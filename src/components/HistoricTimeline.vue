<template>
  <v-row>
    <v-col>
      <v-text-field
        v-model="state.searchString"
        variant="contained"
        hint="Search the timeline for specific text. (Other filters are available from the Filter menu.)"
        prepend-inner-icon="mdi-magnify"
        label="Search"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-timeline>
        <v-timeline-item
          v-for="event in filteredEvents"
          :key="event.id"
          fill-dot
          :dot-color="getCategoryColor(event.category)"
          size="small"
        >
          <template #opposite>
            <div
              :class="`pt-1 headline font-weight-bold text-${getCategoryColor(
                event.category
              )}`"
            >
              {{ formatDate(event.date) }}
            </div>
          </template>

          <div>
            <h2
              v-if="event.title"
              :class="`mt-n1 headline font-weight-light mb-4 text-${getCategoryColor(
                event.category
              )} justify-end`"
            >
              {{ event.title }}
            </h2>
            <div v-if="event.subtitle">{{ event.subtitle }}</div>
            <div v-if="event.description">
              {{ event.description }}
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-col>
  </v-row>

  <v-dialog
    v-model="state.showFilters"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <template #activator="{ props }">
      <v-card
        class="px-1"
        flat
        fixed
        top="104"
        right="-35"
        width="90"
        color="rgba(0, 0, 0, 0.1)"
        theme="dark"
      >
        <v-tooltip anchor="start">
          <template #activator="{ props: tipProps }">
            <v-btn
              aria-label="Filter"
              color="primary"
              icon=""
              theme="dark"
              variant="plain"
              v-bind="props"
            >
              <v-icon color="primary" dark v-bind="tipProps">
                mdi-filter-menu
              </v-icon>
            </v-btn>
          </template>
          <span>Filter</span>
        </v-tooltip>
      </v-card>
    </template>
    <historic-timeline-filters
      :filters="state.filters"
      @close="state.showFilters = false"
    ></historic-timeline-filters>
  </v-dialog>
</template>

<script setup>
import { computed, onMounted, reactive, watch } from "vue";
import { format } from "date-fns";
import HistoricTimelineFilters from "@/components/HistoricTimelineFilters.vue";
import { getEvents } from "@/services";

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

const state = reactive({
  events: [],
  filters: {
    categories: [],
    denominations: [],
    dateRange: [],
    dateRangeMin: 0,
    dateRangeMax: 0,
  },
  searchString: "",
  showFilters: false,
});

onMounted(() => {
  state.events = getEvents() ?? [];
});

const filteredEvents = computed(() => {
  let searchStringPattern;

  try {
    searchStringPattern = new RegExp(state.searchString, "i");
  } catch (e) {
    // searchStringPattern will be falsy
  }

  const initialFiltered = state.events
    .filter((e) => state.filters.categories.includes(e.category))
    .filter((e) => state.filters.denominations.includes(e.denomination))
    .filter(
      (e) =>
        e.date > new Date(state.filters.dateRange[0], 0) &&
        e.date < new Date(state.filters.dateRange[1], 11)
    );
  if (!searchStringPattern) {
    return initialFiltered;
  }

  return initialFiltered.filter(
    (e) =>
      searchStringPattern.test(e.title) ||
      searchStringPattern.test(e.subtitle) ||
      searchStringPattern.test(e.description)
  );
});

function getCategoryColor(category) {
  const categoryObj = categories.find((i) => i.value === category);
  return !categoryObj ? "black" : categoryObj.color;
}

watch(
  () => state.events,
  () => {
    state.filters.dateRangeMin =
      Math.floor(
        Math.min.apply(
          Math,
          state.events.map(function (o) {
            return new Date(o.date).getUTCFullYear();
          })
        ) / 10
      ) * 10;
    state.filters.dateRangeMax =
      Math.ceil(
        Math.max.apply(
          Math,
          state.events.map(function (o) {
            return new Date(o.date).getUTCFullYear();
          })
        ) / 10
      ) * 10;
    if (state.filters.dateRange.length === 0) {
      state.filters.dateRange = [
        state.filters.dateRangeMin,
        state.filters.dateRangeMax,
      ];
    }

    if (state.filters.categories.length === 0) {
      state.filters.categories = state.events
        .map((e) => e.category)
        .filter((category, index, arr) => arr.indexOf(category) == index);
    }

    if (state.filters.denominations.length === 0) {
      state.filters.denominations = state.events
        .map((e) => e.denomination)
        .filter(
          (denominations, index, arr) => arr.indexOf(denominations) == index
        );
    }
  }
);

function formatDate(date) {
  return format(date, "PPP");
}
</script>
