import { Component, OnInit } from '@angular/core';
import { ServiceWorkerModule, SwPush, SwUpdate} from '@angular/service-worker';
import { Observable } from 'rxjs/Observable';

declare var Notification:any

@Component({
  selector: 'app-sw-sandbox',
  templateUrl: './sw-sandbox.component.html',
  styleUrls: ['./sw-sandbox.component.css']
})
export class SwSandboxComponent implements OnInit {
	readonly VAPID_PUBLIC_KEY = "BGvB66kegnvlpTkIDyLPPVGRHGFY879YAqAyqd7MlLMMs_W0424NdgmS2ILhjPCfw3QKGvscTGvlusC5jEyD_ao";
	readonly VAPID_PRIVATE_KEY="SkKDufi9dDhoi9BaKTx9ZVqkT--Dy6GGWP5YuRP_RvI"
	registration: SwPush;

  	constructor(private swUpdate: SwUpdate,private swPush: SwPush) {
  	}

  	ngOnInit() {
  		this.isPushSupported();
  	}	
  	isPushSupported() {
        //To check `push notification` permission is denied by user
        if (Notification.permission === 'denied') {
            console.warn('User has blocked push notification.');
            return;
    	}
    	 //Check `push notification` is supported or not
        if (!('PushManager' in window)) {
            console.error('Push notification isn\'t supported in your browser.');
            return;
        }


        //Get `push notification` subscription
        //If `serviceWorker` is registered and ready
        console.log('searching for service worker !!');
        navigator.serviceWorker.ready
            .then((registration)=> {
                registration.pushManager.getSubscription()
                    .then((subscription) =>{
                    	console.log('service worker is ready');
                        console.log(subscription)
                        //If already access granted, enable push button status
                         if (subscription) {
                             console.log('subscipition');
                             this.changePushStatus(true);

                         } else {
                             this.changePushStatus(false);
                         }
                    })
                    .catch(function(error) {
                        console.error('Error occurred while enabling push ', error);
                    });
            });
    }

        //To change status
    changePushStatus(status) {
       console.log('ready for change staus');
    }

     urlB64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

  	subscribeToPush() {
	    // this.swPush.requestSubscription({
	    //     serverPublicKey: this.VAPID_PUBLIC_KEY
	    // })
	    // .then((pushSubscription)=> {
	    // 	console.debug("Subscribed",pushSubscription)
	    // })
	    // .catch(err => console.error("Could not subscribe to notifications", err));

	    navigator.serviceWorker.ready.then((registration)=>{
            if (!registration.pushManager) {
                alert('Your browser doesn\'t support push notification.');
                return false;
            }

            //To subscribe `push notification` from push manager
            registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: this.urlB64ToUint8Array(this.VAPID_PUBLIC_KEY)
                })
                .then((subscription)=>{
                    console.info('Push notification subscribed.',subscription);
                    this.changePushStatus(true);
                    this.sendPushNotification();
                })
                .catch((error)=>{
                    this.changePushStatus(false);
                    console.error('Push notification subscription error: ', error);
                });
        })
	}
	 sendPushNotification() {
        navigator.serviceWorker.ready
            .then((registration)=>{
                //Get `push subscription`
                registration.pushManager.getSubscription().then((subscription)=>{
                	console.debug("subscription",subscription)
                    //this.pushNotificationService.notify(JSON.stringify(subscription));
                })
            })
    }

    checkEventForSubscribe(){
        console.log('checkEventForSubscribe');
    }

 	unsubscribeFromPush() {
	   // this.registration.unsubscribe().then(unsub=>{
	   // 		console.debug("Unsubscribed...")
	   // })

     navigator.serviceWorker.ready
        .then((registration)=> {
            //Get `push subscription`
            registration.pushManager.getSubscription()
                .then((subscription)=>{
                    if (!subscription) {
                        console.error('Unable to unregister push notification.');
                        return;
                    }

                    //Unsubscribe `push notification`
                    subscription.unsubscribe()
                        .then(()=>{
                            console.info('Push notification unsubscribed.');
                            this.changePushStatus(false);
                        })
                        .catch((error) =>{
                            console.error(error);
                        });
                })
                .catch((error) =>{
                    console.error('Failed to unsubscribe push notification.');
                });
        })
	}
}