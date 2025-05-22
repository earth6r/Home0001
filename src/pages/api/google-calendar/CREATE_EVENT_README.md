# Google Calendar Create Event API

This endpoint allows you to create a new Google Calendar event.

## Endpoint

```
POST /api/google-calendar/create-event
```

## Request Body

| Parameter               | Type    | Required | Description                                  |
| ----------------------- | ------- | -------- | -------------------------------------------- |
| startTime               | string  | Yes      | Event start time in ISO format (UTC)         |
| endTime                 | string  | Yes      | Event end time in ISO format (UTC)           |
| eventName               | string  | Yes      | Title/summary of the event                   |
| inviteeEmail            | string  | Yes      | Email of the primary attendee                |
| eventDescription        | string  | Yes      | Description of the event                     |
| calendarEmail           | string  | Yes      | Email of the calendar to create the event in |
| zoom                    | boolean | No       | Whether to include Zoom link (default: true) |
| customizedNotifications | object  | No       | Custom notification settings                 |

## Response

### Success (200 OK)

```json
{
  "success": true,
  "eventId": "string"
}
```

### Error (400 Bad Request)

```json
{
  "error": "Missing required fields",
  "required": [
    "startTime",
    "endTime",
    "eventName",
    "inviteeEmail",
    "eventDescription",
    "calendarEmail"
  ]
}
```

### Error (405 Method Not Allowed)

```json
{
  "error": "Method not allowed"
}
```

### Error (500 Internal Server Error)

```json
{
  "error": "Failed to create calendar event",
  "details": "Error message"
}
```

## Example

```javascript
const response = await fetch('/api/google-calendar/create-event', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    startTime: '2023-04-15T10:00:00.000Z',
    endTime: '2023-04-15T11:00:00.000Z',
    eventName: 'Property Viewing',
    inviteeEmail: 'client@example.com',
    eventDescription: 'Property viewing at 123 Main St',
    calendarEmail: 'bookings@home0001.com',
    zoom: true,
  }),
})

const data = await response.json()
console.log(data)
```
