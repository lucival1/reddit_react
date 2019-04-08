import React from 'react';
import Button from "react-bootstrap/Button";

interface BlockBtnProps {
    style?: React.CSSProperties,
    variant: any,
    path?: string,
    name: string,
}

interface BlockBtnState {
}

export class BlockBtn extends React.Component<BlockBtnProps> {
    public constructor(props: BlockBtnProps) {
        super(props);
    }

    public render() {
        const {style, variant, name, path} = this.props;
        return (
            <Button
                href={path}
                variant={variant}
                style={style}
                block
            >{name}
            </Button>
        );
    }
}