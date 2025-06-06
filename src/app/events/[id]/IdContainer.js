import fs from 'fs';
import path from 'path';
import IdForm from './IdForm';


export default async function IdContainer({ id }) {

    const filePath = path.join(process.cwd(), 'src/app/data/events.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const events = JSON.parse(fileData);

    const event = events.find(e => e.id.toString() === id);

    return (
        <IdForm 
        event={event}
        />
  )
}