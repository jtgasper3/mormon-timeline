import { describe, expect, it } from 'vitest'
import { getEvents } from '@/services/events.js'

describe("event services", () => {
    it('getEvents()', () => {
        const events = getEvents()
        expect(events.length).toBeGreaterThan(5)
    })
})
