import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, RouterOutlet, NavigationEnd, NavigationStart } from '@angular/router';

// rxjs
import { Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { MessagesService, CustomPreloadingStrategyService } from './core';
import { SpinnerService } from './widgets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private sub: { [key: string]: Subscription } = {};

  constructor(
    public messagesService: MessagesService,
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
    public spinnerService: SpinnerService,
    private preloadingStrategy: CustomPreloadingStrategyService
  ) {}

  ngOnInit() {
    // console.log(
    //   `Preloading Modules: `,
    //   this.preloadingStrategy.preloadedModules
    // );
    // this.setPageTitles();
    this.setMessageServiceOnRefresh();
  }

  ngOnDestroy() {
    this.sub.navigationStart.unsubscribe();
    // this.sub.navigationEnd.unsubscribe();
  }

  onDisplayMessages(): void {
    this.router.navigate([{ outlets: { messages: ['messages'] } }]);
    this.messagesService.isDisplayed = true;
  }

  /**
   * @param $event - component instance
   */
  onActivate($event: any, routerOutlet: RouterOutlet) {
    console.log('Activated Component', $event, routerOutlet);
    // another way to set titles
    this.titleService.setTitle(routerOutlet.activatedRouteData.title);
    this.metaService.addTags(routerOutlet.activatedRouteData.meta);
  }

  onDeactivate($event: any, routerOutlet: RouterOutlet) {
    console.log('Deactivated Component', $event, routerOutlet);
  }

  private setPageTitles() {
    this.sub.navigationEnd = this.router.events
      .pipe(
        // NavigationStart, NavigationEnd, NavigationCancel,
        // NavigationError, RoutesRecognized, ...
        filter(event => event instanceof NavigationEnd),

        // access to router state, we swap what we’re observing
        // better alternative to accessing the routerState.root directly,
        // is to inject the ActivatedRoute
        // .map(() => this.activatedRoute)
        map(() => this.router.routerState.root),

        // we’ll create a while loop to traverse over the state tree
        // to find the last activated route,
        // and then return it to the stream
        // Doing this allows us to essentially dive into the children
        // property of the routes config
        // to fetch the corresponding page title(s)
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        switchMap(route => route.data)
      )
      .subscribe(data => this.titleService.setTitle(data.title));
  }

  private setMessageServiceOnRefresh() {
    this.sub.navigationStart = this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        this.messagesService.isDisplayed = event.url.includes('messages:');
      });

  }
}
