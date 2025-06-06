import IdContainer from "./IdContainer";
import path from 'path';
import fs from 'fs';

export default function EventDetail({ params }) {
  const { id } =params;
  return <IdContainer id={id} />;
}

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'src/app/data/events.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const events = JSON.parse(fileData);
  

  return events.map(event => ({
    id: event.id.toString()
  }));
}