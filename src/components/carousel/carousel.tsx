import React from 'react';

interface CarouselProps {
    items: JSX.Element[];
    startInIndex: number;
}

interface CarouselState {
    currentPicIndex: number;
}

export class Carousel extends React.Component<CarouselProps, CarouselState> {
    public constructor(props: CarouselProps) {
        super(props);
        if (
            props.startInIndex > this.props.items.length - 1 ||
            props.startInIndex < 0
        ) {
            throw new Error("invalid startInIndex!");
        }
        this.state = {
            currentPicIndex: props.startInIndex
        };
    }
    public render() {
        return <div>
            <button onClick={() => this._goLeft()}>Go left</button>
            {this.props.items[this.state.currentPicIndex]}
            <button onClick={() => this._goRight()}>Go right</button>
        </div>;
    }
    private _goLeft() {
        if (this.state.currentPicIndex === 0) {
            this.setState({ currentPicIndex: this.props.items.length - 1 });
        } else {
            this.setState({ currentPicIndex: this.state.currentPicIndex - 1 });
        }
    }
    private _goRight() {
        if (this.state.currentPicIndex === this.props.items.length - 1) {
            this.setState({ currentPicIndex: 0 });
        } else {
            this.setState({ currentPicIndex: this.state.currentPicIndex + 1 });
        }
    }
}
