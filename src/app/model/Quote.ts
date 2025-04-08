export interface Quotes {
    id?: string; // Firestore automatically generates IDs
    text: string;
    author: string;
    createdAt: string;
}