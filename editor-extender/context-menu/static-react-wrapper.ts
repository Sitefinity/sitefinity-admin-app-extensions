import * as React from "react";
import * as ReactDOM from "react-dom";

/**
 * Provides a class that wraps a React component to be inserted into the DOM and updated externally if needed.
 * React handles internal updates and function calls independently updating only what is changed and needs to be rerendered.
 */
export class StaticReactWrapper<T, ComponentClass extends React.Component> {
    public wrappedComponent;
    public rootDom;
    private props: T;

    /**
     * Performs an update to the wrapped react component.
     * @param newProps partial or full set of the component props that need to be updated.
     */
    public update(newProps: any) {
        const mergedProps = Object.assign({}, this.props, newProps);
        this.props = mergedProps;
        this.render();
    }

    /**
     * Renders the wrapped React component at the chosen node.
     */
    public render() {
        ReactDOM.render(React.createElement(this.wrappedComponent, this.getProps()), this.getRootDomNode());
    }

    private getProps() {
        return this.props;
    }

    private getRootDomNode() {
        return this.rootDom;
    }
}
