import bom from "@/data/bom.yml";
import people from "@/data/people.yml";

export function getEvents() {
  const events = [];

  events.push(...convertBomToEvents());
  events.push(...convertPeopleToEvents());

  return events.sort((a, b) => a.date - b.date);
}

function convertBomToEvents() {
  const convertedEvents = [];

  bom.forEach((e) =>
    convertedEvents.push({
      id: "bom_" + e.id,
      title: e.title,
      date: stripTimezone(e.date),
      description: e.description,
      references: e.references,
      category: e.category,
      tags: ["bom"],
    })
  );

  return convertedEvents;
}

function convertPeopleToEvents() {
  const convertedEvents = [];

  people.forEach((person) => {
    if (person.birth) {
      convertedEvents.push({
        id: "person_" + person.id + "_birth",
        title: person.name + "'s Birth",
        subtitle: person.title,
        date: stripTimezone(person.birth.date),
        description: person.name + " was born in " + person.birth.place + ".",
        references: person.birth.references,
        denomination: person.category,
        category: "people",
        tags: ["birth"],
      });
    }
    if (person.death) {
      convertedEvents.push({
        id: "person_" + person.id + "_death",
        title: person.name + "'s Death",
        subtitle: person.title,
        date: stripTimezone(person.death.date),
        description: person.name + " died in " + person.death.place + ".",
        references: person.death.references,
        denomination: person.category,
        category: "people",
        tags: ["birth"],
      });
    }
  });

  return convertedEvents;
}

function stripTimezone(date) {
  // our dates should be local... timezones mess stuff up.
  return new Date(date.replace(/Z?$/i, ""));
}