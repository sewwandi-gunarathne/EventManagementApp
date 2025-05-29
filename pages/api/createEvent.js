import fs from 'fs';
import path from 'path';

export default function handler (req, res){
    if (req.method =='POST') {
        const data = req.body;
        const eventsPath = path.join (process.cwd (), 'src/app/data/events.json');
        const events = JSON.parse(fs.readFileSync(filePath, 'utf-8'));


        const newEvent = {
        id: Date.now(),
        ...data,
    };

    events.push(newEvent);
    fs.writeFileSync(eventsPath, JSON.stringify(events, null, 2));

    return res.status(200).json({success:true});
    }
    return res.status(405).json({message:'Method not allowed'})
}

    