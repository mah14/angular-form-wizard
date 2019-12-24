import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-wizard',
  templateUrl: './my-wizard.component.html',
  styleUrls: ['./my-wizard.component.sass']
})
export class MyWizardComponent implements OnInit {

	s1Form;
	s2Form;
	s3Form;
	errors;
	step1Params;
	step2Params;
	step3Params
	Language;
	TimeZone : any;
	Cummonication;
	Country;
	data : any;

	@Output() showMyWizard: EventEmitter<boolean> =   new EventEmitter();
	@Output() tableData: EventEmitter<any> =   new EventEmitter();

	constructor(private formBuilder: FormBuilder) { 

		this.s1Form = this.formBuilder.group({
			projectName: ['', Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z] ?)+$')])],
			projectOwner: ['', Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z] ?)+$')])],
			customerName: ['', Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z] ?)+$')])],
			contactPhone: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])],
			emailAddress: ['', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
			companySite: ['', Validators.required]
		});

		this.s2Form = this.formBuilder.group({
			email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
			language: ['', Validators.required],
			timeZone: ['', Validators.required],
			cummonication: this.formBuilder.group({
				email : [true],
				sms: [false],
				phone: [false]
			})				
		});


		this.s3Form = this.formBuilder.group({
			address1: ['', Validators.required],
			address2: ['', Validators.required],
			postCode: ['', Validators.required],
			city: ['', Validators.required],
			state: ['', Validators.required],
			country: ['', Validators.required]
		});

		this.errors = {
			minlength : 'At least 3 characters is requierd',
			textPattern : 'Plaese enter valid characters (a-zA-Z)',
			numberPattern : 'Plaese enter numbers (0-9)',			
			emailPattern : 'Email must be a valid email address',
		}

		this.Language = ['English','Persian','French','Spanish'];
		this.TimeZone = [
			{
				label:'GMT -12:00', 
				value: '-12:00'
			},
			{
				label:'GMT -6:00', 
				value: '-6:00'
			},
			{
				label:'GMT', 
				value: '0:00'
			},
			{
				label:'GMT +6:00', 
				value: '6:00'
			},
			{
				label:'GMT +12:00', 
				value: '12:00'
			}
		];
		this.Country = ['Australia','Canada','France','Iran','United States'];
	}

	ngOnInit() {
		localStorage.clear();
	}

	get f() { return this.s1Form.controls; }
	get ff() { return this.s2Form.controls; }

	closeModal() {
		this.showMyWizard.emit(false);
	}

	onStep1Next(e) {
		this.step1Params = {
			pName: this.s1Form.value.projectName,
			pOwner: this.s1Form.value.projectOwner,
			cName: this.s1Form.value.customerName,
			phone: this.s1Form.value.contactPhone,
			email: this.s1Form.value.emailAddress,
			site: this.s1Form.value.companySite,
		}
		localStorage.setItem('projectName', this.step1Params.pName);
		localStorage.setItem('projectOwner', this.step1Params.pOwner);
		localStorage.setItem('customerName', this.step1Params.cName);
		localStorage.setItem('contactPhone', this.step1Params.phone);
		localStorage.setItem('pdEmailAddress', this.step1Params.email);
		localStorage.setItem('companySite', this.step1Params.site);
		
		console.log('step1: ', localStorage);
	}

	onStep2Next(e) {
		this.step2Params = {
			email: this.s2Form.value.email,
			language: this.s2Form.value.language,
			s2TimeZone: this.s2Form.value.timeZone,
			s2Cummonication: this.s2Form.value.cummonication,
		}
		localStorage.setItem('psEmailAddress', this.step2Params.email);
		localStorage.setItem('language', this.step2Params.language);
		localStorage.setItem('timeZone', this.step2Params.s2TimeZone);
		localStorage.setItem('cummonication', JSON.stringify(this.step2Params.s2Cummonication));
		
		console.log('step2: ', localStorage);
	}

	onStep3Next(e) {
		this.step3Params = {
			adrs1: this.s3Form.value.address1,
			adrs2: this.s3Form.value.address2,
			pCode: this.s3Form.value.postCode,
			city: this.s3Form.value.city,
			state: this.s3Form.value.state,
			country: this.s3Form.value.country,
		}
		localStorage.setItem('address1', this.step3Params.adrs1);
		localStorage.setItem('address2', this.step3Params.adrs1);
		localStorage.setItem('postCode', this.step3Params.pCode);
		localStorage.setItem('city', this.step3Params.city);
		localStorage.setItem('state', this.step3Params.state);
		localStorage.setItem('country', this.step3Params.country);
		
		console.log('step3: ', localStorage);
		this.data = localStorage;
	}

	onComplete(e) {
		this.tableData.emit(this.data);
		this.closeModal();
	}
}
