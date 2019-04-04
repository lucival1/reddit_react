import React from 'react';

interface TabItem {
    title: string;
    content: JSX.Element;
}

interface TabsProps {
    pages: TabItem[]
}

interface TabsState {
    currentTabIndex: number;
}

export class Tabs extends React.Component<TabsProps, TabsState> {
    public constructor(props: TabsProps) {
        super(props);
        this.state = {
            currentTabIndex: 0
        };
    }
    public render() {
        return <div>
            {this._renderHeader()}
            {this._renderBody()}
        </div>;
    }
    private _renderHeader() {
        return this.props.pages.map((item, itemIndex) => {
            const isSelected = itemIndex === this.state.currentTabIndex;
            const tabStyle: React.CSSProperties = {
                borderTop: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "1px solid #000000",
                marginRight: "5px",
                float: "left",
                padding: "10px",
                cursor: "pointer",
                backgroundColor: isSelected ? "#eeeeee" : "#ffffff" 
            };
            return <div style={tabStyle} onClick={() => this._selectTab(itemIndex)}>
                {item.title}
            </div>;
        });
    }
    private _selectTab(tabIndex: number) {
        this.setState({ currentTabIndex: tabIndex });
    }
    private _renderBody() {
        const bodyStyle: React.CSSProperties = {
            clear: "both"
        };
        return <div style={bodyStyle}>
            {this.props.pages[this.state.currentTabIndex].content}
        </div>;
    }
}

/*
const arr1 =  [
    { title: "Title 1", content: <div>Page 1</div> },
    { title: "Title 2", content: <div>Page 2</div> },
    { title: "Title 3", content: <div>Page 3</div> }
];

let arr2 = []; // [<div>"Title 1"</div>, <div>"Title 2"</div>]
for (var itemIndex = 0; itemIndex++; itemIndex < arr1.length) {
    const currentItem = arr1[itemIndex];
    arr2.push(<div>{currentItem.title}</div>);
}

let arr3 = arr1.map((currentItem, itemIndex) => {
    return <div>{currentItem.title}</div>;
});

*/

