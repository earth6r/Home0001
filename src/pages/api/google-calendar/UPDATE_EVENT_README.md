# Google Calendar Update Event API

This endpoint allows you to update an existing Google Calendar event.

## Endpoint

```
PUT /api/google-calendar/update-event
```

## Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| startTime | string | Yes | New event start time in ISO format (UTC) |
| endTime | string | Yes | New event end time in ISO format (UTC) |
| eventId | string | Yes | ID of the event to update |
| calendarEmail | string | Yes | Email of the calendar containing the event |
| eventName | string | Yes | New title/summary of the event |
| inviteeEmail | string | Yes | Email of the primary attendee |
| eventDescription | string | Yes | New description of the event |
| zoom | boolean | No | Whether to include Zoom link (default: true) |

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
  "required": ["startTime", "endTime", "eventId", "calendarEmail", "eventName", "inviteeEmail", "eventDescription"]
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
  "error": "Failed to update calendar event",
  "details": "Error message"
}
```

## Example

```javascript
const response = await fetch('/api/google-calendar/update-event', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    startTime: '2023-04-16T14:00:00.000Z',
    endTime: '2023-04-16T15:00:00.000Z',
    eventId: '12345abcde',
    calendarEmail: 'bookings@home0001.com',
    eventName: 'Updated Property Viewing',
    inviteeEmail: 'client@example.com',
    eventDescription: 'Rescheduled property viewing at 123 Main St',
    zoom: true
  }),
});

const data = await response.json();
console.log(data);
```

## Important Notes

- All attendees will receive an update notification by default
- The returned eventId is the same as the one provided in the request
- You must have appropriate permissions on the calendar to update events 