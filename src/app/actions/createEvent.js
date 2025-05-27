'use server';

import fs from 'fs';
import path from 'path';

export async function createEvent (data) {
    const filePath = path.join (process.cwd (), 'src/app/data/events.json');
    const existingEvents = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const newEvent = {
        id: Date.now(),
        ...data,
    };

    existingEvents.push(newEvent);
    fs.writeFileSync(filePath, JSON.stringify(existingEvents, null, 2));

    return {success:true};


}