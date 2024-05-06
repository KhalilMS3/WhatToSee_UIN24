import { client } from "../client";

export async function fetchAllUsers() {
    try {
        const data = await client.fetch(`*[_type == "users"]{
            _id,
            username
        }`);
        
        return data;
    } catch (error) {
        console.error('Error could not fetch:', error);
    }
}
