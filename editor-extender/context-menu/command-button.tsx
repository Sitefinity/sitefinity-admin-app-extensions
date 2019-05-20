import * as React from "react";

interface CommandButtonProps {
    title?: string;
    icon?: string;
    command: CommandBase;
}

export interface CommandBase {
    name?: string;
    icon?: string;
    execute: () => any;
    isSeparator?: boolean;
}

export class CommandButton extends React.Component<CommandButtonProps> {
    public render() {
        return (
            this.props.command.isSeparator ?
            (<span className="sf-notification__tool-separator"></span>)
        :
            (<span className="sf-notification__tool-button"
                onClick={() => {this.props.command.execute(); }}>
                {this.props.icon ? (<i className={`sf-icon fa fa-${this.props.icon} -color-inherit -size-xs`}></i>) : this.props.title}
            </span>)
        );
    }
}
