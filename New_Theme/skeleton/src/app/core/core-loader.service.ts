import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class LoaderService {
    public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );

    /**
     *
     *
     * @param {boolean} value
     * @memberof LoaderService
     */
    display(value: boolean) {
        this.status.next(value);
    }
}
