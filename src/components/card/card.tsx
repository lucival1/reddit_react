import React from 'react';

interface CardProps {
}

interface CardState {
    isCollapsed: boolean;
}

export class Card extends React.Component<CardProps, CardState> {
    public constructor(props: CardProps) {
        super(props);
        this.state = {
            isCollapsed: false
        };
    }
    public render() {
        const style: React.CSSProperties = {
            border: "1px solid #eeeeee",
            boxShadow: "0 10px 6px -6px #777",
            marginBottom: "20px"
        };
        return <div style={style}>
            <button onClick={() => this._toggle()}>
                {this.state.isCollapsed ? "Open" : "Close"}
            </button>
            {this._renderChildren()}
        </div>;
    }
    private _renderChildren() {
        if (this.state.isCollapsed) {
            return null;
        } else {
            return this.props.children;
        }
    }
    private _toggle() {
        // this.state.isCollapsed = false; NOT LIKE THIS!
        this.setState({ isCollapsed: !this.state.isCollapsed });
    }
}
