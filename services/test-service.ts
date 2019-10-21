import { Injectable } from "@angular/core";

@Injectable()
export class TestService {
    doSomething() {
        console.log("Service is called");
    }
}
