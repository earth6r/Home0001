import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import moment from 'moment-timezone';

const keys = {
    client_email: process.env.GOOGLE_API_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_API_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

const Subject = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_IMPERSONATE;

const auth = new JWT({
    email: keys.client_email,
    key: keys.private_key,
    scopes: ['https://www.googleapis.com/auth/calendar.events'],
    subject: Subject,
});

const calendar = google.calendar({ version: 'v3', auth });

async function createCalendarEvent({
    date,
    startTime,
    eventName,
    staffEmails,
    inviteeEmail,
    location,
    eventDescription,
}) {
    if (
        !date ||
        !startTime ||
        !eventName ||
        !Array.isArray(staffEmails) ||
        !inviteeEmail ||
        !location ||
        !eventDescription
    ) {
        throw new Error('Missing required fields or staffEmails is not an array.');
    }

    const startDateTime = moment
        .tz(`${date}T${startTime}:00`, 'America/New_York')
        .toDate();

    const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000);

    const event = {
        summary: eventName,
        location: location,
        description: eventDescription,
        start: {
            dateTime: startDateTime.toISOString(),
            timeZone: 'America/New_York',
        },
        end: {
            dateTime: endDateTime.toISOString(),
            timeZone: 'America/New_York',
        },
        attendees: [
            { email: Subject },
            { email: inviteeEmail },
            ...staffEmails.map(email => ({ email })),
        ],
    };

    const response = await calendar.events.insert({
        calendarId: Subject,
        requestBody: event,
        sendUpdates: 'all',
    });

    return response.data.id;
}

export default createCalendarEvent;
