import { Component, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from "lodash";
import { UserModel } from '../user.class';
import { Subscription } from 'rxjs';
import { IAlbum, Lightbox, LightboxEvent, LightboxConfig, IEvent, LIGHTBOX_EVENT } from 'ngx-lightbox';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class UsersProfileComponent implements OnInit, AfterViewInit, OnDestroy {
    userDetail: UserModel = new UserModel();



    public editProfile: boolean;
    public editProfileIcon: string;

    public editContact: boolean;
    public editContactIcon: string;

    public editOtherInfo: boolean;
    public editOtherInfoIcon: string;

    public albums: Array<IAlbum>;
    private subscription: Subscription;

    activeTab: string = "profile";
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private lightbox: Lightbox, private lightboxEvent: LightboxEvent, private lighboxConfig: LightboxConfig
    ) {
        this.editProfile = false;
        this.editProfileIcon = 'icon-edit';

        this.editContact = false;
        this.editContactIcon = 'icon-edit';

        this.editOtherInfo = false;
        this.editOtherInfoIcon = 'icon-edit';

        this.albums = [];
        for (let i = 1; i <= 6; i++) {
            const album = {
                src: 'assets/images/light-box/l' + i + '.jpg',
                caption: 'Image ' + i + ' caption here',
                thumb: 'assets/images/light-box/sl' + i + '.jpg'
            };

            this.albums.push(album);
        }
        lighboxConfig.fadeDuration = 1;


    }

    ngOnInit(): void {
        this.inintUserValue()
    }

    inintUserValue = () => {
        this.route.data.subscribe(res => {
            if (!!res && !!res.userData[0]) {
                this.userDetail = res.userData[0]
            }
        });
    }

    open(index: number): void {
        this.subscription = this.lightboxEvent.lightboxEvent$.subscribe((event: IEvent) => this._onReceivedEvent(event));
        this.lightbox.open(this.albums, index, { wrapAround: true, showImageNumberLabel: true });
    }
    private getDate(date: any) {
        if (!!date) {
            return new Date(date['year'], date['month'] - 1, date['day']);
        }
    }

    private _onReceivedEvent(event: IEvent): void {
        if (event.id === LIGHTBOX_EVENT.CLOSE) {
            this.subscription.unsubscribe();
        }
    }


    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {
    }

}
