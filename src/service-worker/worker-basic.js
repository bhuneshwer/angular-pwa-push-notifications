// import {
//   ServiceWorkerModule,
//   Dynamic,
//   FreshnessStrategy,
//   PerformanceStrategy,
//   ExternalContentCache,
//   RouteRedirection,
//   StaticContentCache,
//   SwUpdate
// } from '@angular/service-worker';




import {ServiceWorkerModule,SwPush, SwUpdate} from '@angular/service-worker';
import { Observable } from 'rxjs/Observable';

import {CustomListeners} from './plugins/custom-listeners';

ServiceWorkerModule({
  manifestUrl: 'ngsw-manifest.json',
  plugins: [
    CustomListeners()
  ],
});