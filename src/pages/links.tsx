import * as React from "react";
import { Listview } from "../components/listview/listview";
import { Link } from "react-router-dom";
import { getAuthToken } from "../components/with_auth/with_auth";

interface LinksItem {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

interface LinkssProps {
    //
}

interface LinkssState {
    links: LinksItem[] | null;
}

export class Links extends React.Component<LinkssProps, LinkssState> {
    public constructor(props: LinkssProps) {
        super(props);
        this.state = {
            links: null
        };
    }
    public componentDidMount() {
        (async () => {
            const data = await getData();
            this.setState({ links: data });
        })();
    }
    public render() {
        if (this.state.links === null) {
            return <div>Loading...</div>;
        } else {
            return <div>
                {this._renderPrivate()}
                {
                    this._renderSomethingPrivate()
                }
                <Listview
                    items={
                        this.state.links.map((links) => {
                            return <div>
                                <input type="checkbox" checked={links.completed} />
                                {links.title}
                            </div>;
                        })
                    }
                />
            </div>;
        }
    }
    private _renderSomethingPrivate() {
        // getAuthToken will not trigger a re-render
        const token = getAuthToken();
        if (token) {
            return <div>{token}</div>;
        } else {
            return "????????";
        }
    }
    private _renderPrivate() {
        const token: string | undefined = (window as any).__token;
        if (typeof token === "string") {
            return <Link style={{ color: "#ffffff" }} to="/profile">Profile</Link>
        }
    }
}

async function getData() {
    const response = await fetch("/api/v1/links/");
    const json = await response.json();
    return json as LinksItem[];
}