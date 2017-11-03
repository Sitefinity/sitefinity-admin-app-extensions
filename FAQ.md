# FAQ 
 
 
#### Why should I choose the new administrative panel? 

> In this version, it provides much better Content Editing Experience based on customer's feedback we collected and has better security model and performance as well. 

#### What is the difference between the current admin panel and the new one? 

> The new parts blend in current UI and will gradually replace existing functionality. With v.10.2 the focus is on content editing and you will get the new look and feel for all Dynamic types as well News and Blogs.

#### What functionalities includes the new version? 
> We reinvented the way you browse and edit content as well the way you embed media, insert or relate Images from libraries, the way you follow workflow and schedule publishing. Our ODATA web services were also updated to match that, so we can offer same abilities for your own integrations and automations. As we are shipping this a BETA it has some limitations, most notably it works with default system language at the moment. 

#### How does it work? 
> In general, it is a Single Page Application (SPA) that operates via ODATA web services. This allows to have better security model, much better performance and efficiency as more fluid and responsive UI. 

#### What I need to install on my PC beforehand? 
> Nothing, you will get all bundled in Sitefinity and you can upgrade or create a new project, the way you always do. If you happen to be interested in extending the new UI there is SDK for that tat uses NPM package manager. In this case see next question. 

#### How to install it? 
> If you interested in extension development for the new admin UI. You need the npm v.4+. It comes as part of nodejs installation. https://docs.npmjs.com/getting-started/installing-node  
It is recommended to update it to latest version using this command line: 
 npm install npm@latest -g 

#### How to run it? 
> In v.10.2 you have to turn the new UI features by going to: 
 Administration > Switch to new interface  
You can toggle it ON/OFF at any time, just have in mind it Is systemwide settings and affects all users. 

#### How to host it? 
> For the BETA we will provide integrated mode to all our customers. Upon request, you can reach out to our DevRel. 

#### Can I host it on IIS? 
> In integrated mode it is part and is hosted in Sitefinity 
For standalone mode it can be hosted on any static web server (even on CDN like S3 or at Github Pages) 
For Extension development we will ship a light Dev server that will faceplate rapid development with hot module replacement. 

#### Should I host it on IIS during development? 
> You will normally do so as part of your Sitefinity. For Standalone mode you can chose whatever you like (including IIS). 

#### What could be extended and how to do it? 
> We prepared a SDK for extension development along with few samples to get the feel of how easy it is to create extension on most comment places in the UI (Actions, Grid, Item Editing). We look forward for your feedback on this and will ask for what extensibility points are must for your Admin UI needs. 

#### What IDE I should use, VS, VS Code or Notepad? 
> For extension development use your favorite editor, we like VS Code a lot for it's excellent TypeScript support and clean UI. 

#### Do I need to rebuild it after every change? What about if it is hosted on IIS? 
> For extension development during coding we do live code compile and refresh as a moder and rapid way of development. Once you're happy with the result you can produce a bundle and check it in your project for production deployment.

#### How to write an extension? 
> Our SDK comes with samples for all current extension points you can use them as starting point. You can get going in few seconds and see all your changes instantly. 

#### How to write tests for my extensions? 
> Any JavaScript/TypeScript testing framework should work. We also consider providing this as sample as well in our SDK for faster bootstrapping. 

#### I already have changes in the admin panel, can I apply them in the new version? 
> Most of the changes for Admin will still be there in integrated mode (Menus/New Screens/ Module Builder, Definitions). Only changes in contend editing actions, dialog and grid, has to be ported to new extensions framework if needed. 