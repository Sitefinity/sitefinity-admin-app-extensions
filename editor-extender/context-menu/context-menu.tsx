import * as React from "react";
import { CommandBase, CommandButton } from "./command-button";

/**
 * Represents the props for the EditorContextMenu
 */
export interface EditorContextMenuProps {
    position: {x: number, y: number};
    commands: CommandBase[];
    isVisible: boolean;
}

/**
 * Represents the state of the EditorContextMenu
 */
export interface EditorContextMenuState {
    positionOffset: {x: number, y: number};
}

export class EditorContextMenu extends React.Component<EditorContextMenuProps, EditorContextMenuState> {
    constructor(p, s) {
        super(p, s);
        this.state = {positionOffset: {x: 0, y: 0}};
    }

    public render() {
        return ( this.props.isVisible &&
            <div style={this.generateStyle()} className="sf-tooltip__content -toolset -up">
                <div className="sf-notification -toolset -black -up" ref={(ref) => { this.calculatePosition(ref); }}>
                    <div className="sf-notification__content">
                {
                    this.props.commands.map((btn, i) => {
                        return (<CommandButton key={`context-menu-${i}`} icon = {btn.icon} title={btn.name} command={btn}></CommandButton>);
                    })
                }
                    </div>
                </div>
            </div>
        );
    }

    private calculatePosition(ref) {
        if (ref && this.state.positionOffset.x === 0) {
            const boundingRectangle = ref.getBoundingClientRect();
            this.setState( { positionOffset: {
                x: boundingRectangle.width / 2,
                y: boundingRectangle.height
            }});
        }
    }

    private generateStyle(): React.CSSProperties {
        const pos = this.props.position || {x: 0, y: 0};
        const offset = this.state.positionOffset;
        return {
            top: pos.y - 5,
            left: pos.x - offset.x,
            position: "relative",
            display: "flex",
            flexDirection: "row"
        };
    }
}
