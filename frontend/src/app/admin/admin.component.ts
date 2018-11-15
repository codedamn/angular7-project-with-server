import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

	quote = "Loading...."

  constructor(private user: UserService) { }

  ngOnInit() {
    this.user.getSomeData().subscribe(({ status, data }) => {
		if(status === 'ok') {
			this.quote = data
		} else {
			this.quote = "[SOMETHING WENT WRONG!]"
		}
    })
  }

  saveQuote(quoteText: string) {
	  console.log(quoteText)
	  this.quote = quoteText
	  this.user.saveNewQuote(quoteText).subscribe(({status}) => {
		  // cool
	  })
  }

}
