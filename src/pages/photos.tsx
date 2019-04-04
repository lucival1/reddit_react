import * as React from "react";
import { Carousel } from "../components/carousel/carousel";

interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

interface PhotosProps {
    //
}

interface PhotosState {
    photos: Photo[] | null;
}

export class Photos extends React.Component<PhotosProps, PhotosState> {
    public constructor(props: PhotosProps) {
        super(props);
        this.state = {
            photos: null
        };
    }
    public componentDidMount() {
        (async () => {
            const data = await getData();
            this.setState({ photos: data });
        })();
    }
    public render() {
        if (this.state.photos === null) {
            return <div>Loading....</div>;
        } else {
            return <Carousel
                items={
                    this.state.photos.map((photo) => {
                        return <img src={photo.url} />;
                    })
                }
                startInIndex={0}
            />;
        }
    }
}

async function getData() {
    const response = await fetch("https://jsonplaceholder.typicode.com/photos");
    const json = await response.json();
    return json as Photo[];
}
