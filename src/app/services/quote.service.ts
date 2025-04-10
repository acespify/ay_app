import { Injectable } from '@angular/core';
import { Quotes } from '../model/Quote';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private quotesCollection: AngularFirestoreCollection<Quotes>;
  quotes$: Observable<Quotes[]>;

  constructor(private firestore: AngularFirestore) {
    this.quotesCollection = this.firestore.collection<Quotes>('quotes');
    this.quotes$ = this.quotesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Quotes;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
   }

   // Method to get all quotes (you might want to fetch a single random quote)
  getAllQuotes(): Observable<Quotes[]> {
    return this.quotes$;
  }

  // Method to get a single quote by ID (if needed)
  getQuote(id: string): Observable<Quotes | undefined> {
    return this.quotesCollection.doc(id).valueChanges();
  }

   // Method to get all quotes(may want to fetch a single random quote)
   getRandomQuote() : Observable<Quotes | undefined> {
    return this.quotes$.pipe(
      map(quotes => {
        if(quotes && quotes.length > 0) {
         // const randomIndex = Math.floor(Math.random() * quotes.length);
         return quotes[0];// return quotes[randomIndex];
        }else {
          return undefined;
        }
      })
    );
   }
}
