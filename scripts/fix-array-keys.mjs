import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dvhn6875';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-16';
const token = process.env.SANITY_API_TOKEN;

if (!token) {
    console.error('Missing SANITY_API_TOKEN in environment variables. Provide a token with write access.');
    process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

function makeKey(prefix = 'k') {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

async function ensureKeys() {
    try {
        console.log('🔎 Fetching homepage document...');
        const homepage = await client.getDocument('homepage');
        if (!homepage) {
            console.error("No homepage document found with _id 'homepage'.");
            process.exit(1);
        }

        const arraysToFix = ['heroSlides', 'marqueeItems', 'statCounters', 'heroStats'];
        const patchData = {};
        let needsPatch = false;

        for (const key of arraysToFix) {
            const arr = homepage[key];
            if (Array.isArray(arr) && arr.length > 0) {
                const fixed = arr.map((item) => {
                    if (item && typeof item === 'object' && !item._key) {
                        needsPatch = true;
                        return { ...item, _key: makeKey(key) };
                    }
                    return item;
                });
                patchData[key] = fixed;
            }
        }

        if (!needsPatch) {
            console.log('✅ All array items already have keys. No changes needed.');
            return;
        }

        console.log('✏️ Patching homepage with generated _key values...');
        const res = await client
            .patch(homepage._id)
            .set(patchData)
            .commit();

        console.log('✅ Homepage arrays updated with _key values.');
        console.log(res);
    } catch (err) {
        console.error('❌ Error ensuring keys:', err);
        process.exit(1);
    }
}

ensureKeys();
