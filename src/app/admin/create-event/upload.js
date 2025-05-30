'use server';

import { writeFile } from 'fs/promises';
import path from 'path';

export async function uploadImage(formData) {
    const file = formData.get('image');
    const eventName = formData.get('eventName');

    if (!file || typeof file === 'string') {
        return { success: false, message: 'No valid image uploaded' };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name}`;
    const uploadPath = path.join(process.cwd(), 'public', 'images', fileName);

    await writeFile(uploadPath, buffer);

    

    return { success: true, fileName:`/images/${fileName}`, message: 'Upload successful' };
}