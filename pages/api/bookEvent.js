import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const bookingsPath = path.join(process.cwd(), 'src/app/data/bookings.json');
        const eventsPath = path.join(process.cwd(), 'src/app/data/events.json');

        const events = JSON.parse(fs.readFileSync(eventsPath, 'utf-8'));

        const eventExists = events.some(event => event.id == parseInt(data.eventId));
        if (!eventExists) {
            return res.status(400).json ({ success: false, message: "Invalid event ID" });
        }


        const existingBookings = JSON.parse(fs.readFileSync(bookingsPath, 'utf-8'));

        const newBooking = {
            id: Date.now(),
            ...data,
        };

        existingBookings.push(newBooking);
        fs.writeFileSync(bookingsPath, JSON.stringify(existingBookings, null, 2));

        return res.status(200).json({ success: true });
    }
    return res.status(405).json({message:'Method not allowed'});
}






