import React from 'react';

interface PanelProps {
    header: string;
    body: string;
    footer: string;
}

interface PanelState {

}

export class Panel extends React.Component<PanelProps, PanelState> {
    public render() {
        const panelStyle: React.CSSProperties = {
            border: "1px solid #333333",
            borderRadius: "5px"
        };
        const headerStyle: React.CSSProperties = {
            padding: "5px",
            borderBottom: "1px solid #333333"
        };
        const footerStyle: React.CSSProperties = {
            padding: "5px",
            borderTop: "1px solid #333333"
        };
        return <div style={panelStyle}>
            <div style={headerStyle}>{this.props.header}</div>
            <div>{this.props.body}</div>
            <div style={footerStyle}>{this.props.footer}</div>
        </div>;
    }
}
