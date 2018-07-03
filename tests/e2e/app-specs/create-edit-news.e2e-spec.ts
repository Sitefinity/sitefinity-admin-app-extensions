
import { USERNAME, PASSWORD, TIMEOUT } from "./../helpers/constants";
import { initAuth } from "./../helpers/authentication-manager";
import { browser } from "protractor";

describe("Create edit news", () => {

    beforeAll(async (done: DoneFn) => {
        await initAuth(USERNAME, PASSWORD);
        done();
    }, TIMEOUT);

    it("get browser", async () => {
        await browser.get("http://localhost:3000/content/newsitems");
    });
});
