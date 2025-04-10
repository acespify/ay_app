import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuoteService } from 'src/app/services/quote.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit, OnDestroy {
  quoteText: string = '';
  quoteAuthor: string = '';
  private quoteSubscription: Subscription | undefined;

  constructor(private router: Router, private quoteService: QuoteService) { }

  ngOnInit() {
    this.loadRandomQuote();
  }

  ngOnDestroy(): void {
      if(this.quoteSubscription){
        this.quoteSubscription.unsubscribe();
      }
  }

  loadRandomQuote() {
    this.quoteSubscription = this.quoteService.getRandomQuote().subscribe(quotes => {
      console.log('Fetched quote', quotes);
      if(quotes){
        this.quoteText = quotes.quoteText;
        this.quoteAuthor = quotes.author;
      } else {
        // Handle the case where no quotes are available
        this.quoteText = 'No inspirational quote available.';
        this.quoteAuthor = '';
      }
    });
  }

  goToHistory(){
    this.router.navigate(['history']);
  }

  NewNotes(){
    this.router.navigate(['new-notes']);
  }
}