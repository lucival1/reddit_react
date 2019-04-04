import React from 'react';
import { Carousel } from '../components/carousel/carousel';

interface CatsProps {
    //
}

interface CatsState {
    items: string[] | null;
}

export class Cats extends React.Component<CatsProps, CatsState> {
    public constructor(props: CatsProps) {
        super(props);
        this.state = {
            items: null
        };
    }
    public componentDidMount() {
        (async () => {
            const data = await getData();
            this.setState({ items: data });
        })();
    }
    public render() {
        const imgStyle: React.CSSProperties = { width: "100px", height: "100px" };
        if (this.state.items === null) {
            return <div>Loading....</div>;
        } else {
            return (
                <Carousel
                    items={
                        this.state.items.map((item, indexItem) => {
                            return (
                                <img style={imgStyle} src={item} />
                            );
                        })
                    }
                    startInIndex={0}
                />
            );
        }
    }
}

async function getData() {
    const response = await fetch("/data/cats.json");
    const json = await response.json();
    return json;
}