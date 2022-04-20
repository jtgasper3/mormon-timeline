import people from '@/data/people.yml'
import bom from '@/data/bom.yml'

export function getEvents() {
    const events = []
    
    events.push(...convertPeopleToEvents())
    events.push(...convertBomToEvents())

    return events.sort((a, b) => a.date - b.date)
}

function convertPeopleToEvents() {
    const convertedEvents = []
    people.forEach(person => {
        if (person.birth) {
            convertedEvents.push({
                id: 'person_' + person.id + '_birth',
                title: person.name + "'s Birth",
                subtitle: person.title,
                date: person.birth.date,
                description: person.name + ' was born in ' + person.birth.place + '.',
                references: person.birth.references,
                category: person.category,
                tags: ['birth'],
            })
        }
        if (person.death) {
            convertedEvents.push({
                id: 'person_' + person.id + '_death',
                title: person.name + "'s Death",
                subtitle: person.title,
                date: person.death.date,
                description: person.name + ' died in ' + person.death.place + '.',
                references: person.death.references,
                category: person.category,
                tags: ['birth'],
            })
        }
    })

    return convertedEvents
}

function convertBomToEvents() {
const convertedEvents = []
    bom.forEach((e) => convertedEvents.push({
        id: 'bom' + e.id + '_birth',
        title: e.title,
        date: e.date,
        description: e.description,
        references: e.references,
        category: e.category,
        tags: ['bom'],
    }))

    return convertedEvents
}