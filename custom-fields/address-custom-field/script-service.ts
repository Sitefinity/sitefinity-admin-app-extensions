import { Injectable } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
  type: string;
  element: string;
}

export const ScriptStore: Scripts[] = [
  { name: 'here-maps-core', src: 'http://js.api.here.com/v3/3.0/mapsjs-core.js', element: 'script', type: 'text/javascript' },
  { name: 'here-maps-service', src: 'http://js.api.here.com/v3/3.0/mapsjs-service.js', element: 'script', type: 'text/javascript' },
  { name: 'here-maps-ui', src: 'https://js.api.here.com/v3/3.0/mapsjs-ui.js', element: 'script', type: 'text/javascript' },
  { name: 'here-maps-events', src: 'https://js.api.here.com/v3/3.0/mapsjs-mapevents.js', element: 'script', type: 'text/javascript' },
  { name: 'here-maps-css', src: 'https://js.api.here.com/v3/3.0/mapsjs-ui.css?dp-version=1549984893', element: 'link', type: 'text/css' }
];

declare var document: any;

@Injectable()
export class DynamicScriptLoaderService {

  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src,
        element: script.element,
        type: script.type
      };
    });
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (!this.scripts[name].loaded) {
        //load script
        let script = document.createElement(this.scripts[name].element);
        if (this.scripts[name].element === 'link') {
            script.href = this.scripts[name].src;
            script.rel = "stylesheet";
        } else {
            script.src = this.scripts[name].src;
        }

        script.type = this.scripts[name].type;
        if (script.readyState) {  //IE
            script.onreadystatechange = () => {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    this.scripts[name].loaded = true;
                    resolve({script: name, loaded: true, status: 'Loaded'});
                }
            };
        } else {  //Others
            script.onload = () => {
                this.scripts[name].loaded = true;
                resolve({script: name, loaded: true, status: 'Loaded'});
            };
        }
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }

}
