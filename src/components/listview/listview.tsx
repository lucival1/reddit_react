import React from 'react';
import {LinkEntry} from "../link/link";

interface ListItem {
    userId: number;
    id: number;
    title: string;
    url: string,
}

interface ListviewProps {
    items: ListItem[];
}

interface ListviewState {}

export class Listview extends React.Component<ListviewProps, ListviewState> {
    public render() {
        if (this.props.items.length < 1) {
            return <div>There is no items!</div>;
        } else {
            return (
                <div>
                    {this.props.items.map(function (item, index) {
                        return (
                            <LinkEntry
                                key={index}
                                id={item.id}
                                title={item.title}
                                url={item.url}
                                commentCount={10}
                                date={"21/03/19"}
                                userName={"Luci"}
                                userId={item.userId}
                                score={20}
                                onUpvote={ () => console.log("Upvote link with ID", item.id) }
                                onDownvote={ () => console.log("Downvote link with ID", item.id) }
                            />
                        );
                    })}
                </div>
            );
        }
    }
}
