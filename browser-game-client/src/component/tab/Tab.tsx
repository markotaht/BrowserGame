import TabButton from "./TabButton.tsx";
import './Tab.css';
import {useMemo, useState} from "react";
import PlayerInventory from "../inventory/PlayerInventory.tsx";
import React from "react";

const Tab = () => {
    const [activeTab, setActiveTab] = useState(0);

    const buttons = useMemo(() =>['A', 'B', 'C', 'D'],[]);

    const contents = useMemo(() => [
        <PlayerInventory/>,
        undefined,
        undefined,
        undefined,
    ], []);

    const buttonsElements = useMemo(() => buttons.map((button, index) => (
        <TabButton text={button} key={button} onClick={() => setActiveTab(index)}
                   active={activeTab === index}/>)), [activeTab, buttons]);


    return (
        <div className={'tab-container'}>
            <div className="tab-buttons">
                {buttonsElements}
            </div>
            <div className={'tab-content'}>{contents[activeTab]}</div>
        </div>
    );
}

export default React.memo(Tab);