import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'src/app/data/bookings.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const bookings = JSON.parse(fileData);

  const dynamicBookings = bookings.map(booking => ({
    ...booking, lastUpdated: new Date().toISOString()
  }));

  return new Response(JSON.stringify(dynamicBookings), {
    headers: { 'Content-type': 'application.json' },
  });

}