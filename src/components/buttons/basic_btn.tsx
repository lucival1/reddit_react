import React from 'react';
import Button from "react-bootstrap/Button";

interface BasicBtnProps {
    style?: React.CSSProperties,
    variant: any,
    path?: string,
    name: string
}

interface BasicBtnState {
}

export class BasicBtn extends React.Component<BasicBtnProps> {
    public constructor(props: BasicBtnProps) {
        super(props);
    }

    public render() {
        const {style, variant, name, path} = this.props;
        return (
            <Button
                href={path}
                variant={variant}
                style={style}
            >{name}
            </Button>
        );
    }
}