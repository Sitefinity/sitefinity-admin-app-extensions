
# Custom hooks


As we know, Angular has lifecycle hooks where we can perform specific actions based on the lifecycle state of the component. Now as extension developer you can hook for some hooks in the list/edit/create  views. Hooking on this lifecycle events you can perform additional actions. 

To add custom logic for the hooks you need to implement **ItemHooksProvider**  provider interface, where you can implement the desired logic. Example you can see in [CustomItemHooksProvider](./item-hooks-provider.ts)

The supported states for which you can hook are:

 - **List view**
	 - when the list view component is initializing -> *onGridItemsInitializing()* hook
	 - when the items in the list view are changed(for example when some item is deleted) -> *onGridItemsChanged()* hook
	 - when the list view component is being destroyed -> *onGridItemsUnloading()* hook
	 - when the list view component is initialized (ngAfterViewInit angular hook) -> *afterGridInit()* hook

- **Edit/Create view**
	- when the single item view is initializing -> onEditItemInitializing() hook
	- when the item that is open is changed -> onEditItemChanged() hook
	- when the single item view is being destroyed -> onEditItemUnloading() hook
	- when the single item view is initialized (ngAfterViewInit angular hook) -> afterEditItemInit() hook


For each of the hooks, object will be passed containing the list view items or the item open for edit.
