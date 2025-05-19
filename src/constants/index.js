export const initialUnavailableEvents = [
  {
    title: 'Doctor Unavailable', start: '2024-06-04T08:30:00', end: '2024-06-04T09:30:00',
    display: 'background', className: 'event-unavailable-bg',
    extendedProps: { isUnavailable: true, type: 'unavailable' }
  },
  {
    title: 'Lunch Break', daysOfWeek: [1, 2, 3, 4, 5], startTime: '12:00:00', endTime: '13:00:00',
    display: 'background', className: 'event-lunch-bg',
    extendedProps: { isUnavailable: true, type: 'lunch' }
  },
  // ... ADD className TO ALL OTHER UNAVAILABLE/BOOKED EVENTS
  { title: 'Booked', start: '2024-06-10T09:00:00', end: '2024-06-10T10:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-10T14:00:00', end: '2024-06-10T14:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-11T11:00:00', end: '2024-06-11T11:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-11T15:30:00', end: '2024-06-11T16:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-12T08:00:00', end: '2024-06-12T09:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-12T13:00:00', end: '2024-06-12T13:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-12T16:00:00', end: '2024-06-12T17:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-13T10:30:00', end: '2024-06-13T11:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-13T17:00:00', end: '2024-06-13T18:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-14T09:30:00', end: '2024-06-14T10:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-14T13:30:00', end: '2024-06-14T14:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-14T15:00:00', end: '2024-06-14T15:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-17T08:30:00', end: '2024-06-17T09:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-17T14:30:00', end: '2024-06-17T15:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-18T11:30:00', end: '2024-06-18T12:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-18T16:30:00', end: '2024-06-18T17:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-19T10:00:00', end: '2024-06-19T11:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-19T13:00:00', end: '2024-06-19T14:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-20T09:00:00', end: '2024-06-20T09:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-20T15:00:00', end: '2024-06-20T16:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-21T11:00:00', end: '2024-06-21T12:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-21T14:00:00', end: '2024-06-21T14:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-24T08:00:00', end: '2024-06-24T08:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-24T13:30:00', end: '2024-06-24T14:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-24T16:00:00', end: '2024-06-24T16:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-25T10:30:00', end: '2024-06-25T11:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-25T15:30:00', end: '2024-06-25T16:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-26T09:30:00', end: '2024-06-26T10:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-26T17:00:00', end: '2024-06-26T17:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-27T08:30:00', end: '2024-06-27T09:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-27T14:30:00', end: '2024-06-27T15:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-28T10:00:00', end: '2024-06-28T10:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-28T13:00:00', end: '2024-06-28T13:30:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
  { title: 'Booked', start: '2024-06-28T16:30:00', end: '2024-06-28T17:00:00', display: 'background', className: 'event-unavailable-bg', extendedProps: { isUnavailable: true, type: 'unavailable' } },
];

 