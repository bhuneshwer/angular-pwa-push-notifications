import { Component, OnInit } from '@angular/core';
import { ServiceWorkerModule, SwPush, SwUpdate} from '@angular/service-worker';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-sw-sandbox',
  templateUrl: './sw-sandbox.component.html',
  styleUrls: ['./sw-sandbox.component.css']
})
export class SwSandboxComponent implements OnInit {
	readonly VAPID_PUBLIC_KEY = "BLBx-hf2WrL2qEa0qKb-aCJbcxEvyn62GDTyyP9KTS5K7ZL0K7TfmOKSPqp8vQF0DaG8hpSBknz_x3qf5F4iEFo";
	readonly VAPID_PRIVATE_KEY="k-GEO4tyRXHAMVT-N-oed3ZQ7Lkxm3WodB76gaDsovo"
	registration: SwPush;

  	constructor(private swUpdate: SwUpdate,private swPush: SwPush) {
  	}

  	ngOnInit() {

  	}	

  	subscribeToPush() {
	    this.swPush.requestSubscription({
	        serverPublicKey: this.VAPID_PUBLIC_KEY
	    })
	    .then((pushSubscription)=> {
	    	console.debug("Subscribed",pushSubscription)
	    })
	    .catch(err => console.error("Could not subscribe to notifications", err));
	}

 	unsubscribeFromPush() {
	   this.registration.unsubscribe().then(unsub=>{
	   		console.debug("Unsubscribed...")
	   })
	}
}