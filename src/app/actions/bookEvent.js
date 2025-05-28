'use server';

import fs from 'fs';
import path from 'path';

export async function bookEvent (data) {
    const filePath = path.join (process.cwd (), 'src/app/data/bookings.json');
    const eventsPath = path.join(process.cwd(), 'src/app/data/events.json');
    const events = JSON.parse(fs.readFileSync(eventsPath, 'utf-8'));

    const eventExists = events.some (event => event.id == parseInt(data.eventId));
    if (!eventExists){
        return {success:false , message: "Invalid event ID"};
    }


    const existingBookings = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const newBooking = {
        id: Date.now(),
        ...data,
    };

    existingBookings.push(newBooking);
    fs.writeFileSync(filePath, JSON.stringify(existingBookings, null, 2));

    return {success:true};


}