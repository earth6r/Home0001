# Google Calendar Delete Event API

This endpoint allows you to delete an existing Google Calendar event.

## Endpoint

```
DELETE /api/google-calendar/delete-event
```

## Request Body

| Parameter     | Type   | Required | Description                                |
| ------------- | ------ | -------- | ------------------------------------------ |
| calendarEmail | string | Yes      | Email of the calendar containing the event |
| eventId       | string | Yes      | ID of the event to delete                  |

## Response

### Success (200 OK)

```json
{
  "success": true
}
```

### Error (400 Bad Request)

```json
{
  "error": "Missing required fields",
  "required": ["calendarEmail", "eventId"]
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
  "error": "Failed to delete calendar event",
  "details": "Error message"
}
```

## Example

```javascript
const response = await fetch('/api/google-calendar/delete-event', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    calendarEmail: 'bookings@home0001.com',
    eventId: '12345abcde',
  }),
})

const data = await response.json()
console.log(data)
```

## Important Notes

- Deleting an event is permanent and cannot be undone
- All attendees will receive a cancellation notification by default
- You must have appropriate permissions on the calendar to delete events
