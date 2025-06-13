import fs from 'fs';
import path from 'path';

export async function GET() {
    const filePath = path.join(process.cwd(), 'src/app/data/events.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const events = JSON.parse(fileData);

    const dynamicEvents = events.map(event => ({
        ...event, lastUpdated: new Date().toISOString()
    }));

    return new Response(JSON.stringify(dynamicEvents), {
        headers: { 'Content-Type': 'application/json' },
    });
}