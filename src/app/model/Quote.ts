export interface Quotes {
    id?: string; // Firestore automatically generates IDs
    quoteText: string;
    author: string;
    createdAt: string;
}