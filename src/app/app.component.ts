import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	showWizard = false;
	data: any;

	start() {
		this.showWizard = true;
	}

	closeM() {
		this.showWizard = false;
	}
	getData(d) {
		this.data = d;
		console.log(this.data);
	}
}
