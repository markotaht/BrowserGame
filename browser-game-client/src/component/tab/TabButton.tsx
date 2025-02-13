import React from 'react';
import './TabButton.css';

interface TabButtonProps {
    children?: React.ReactNode;
    text?: string;
    active?: boolean;
    onClick?: () => void;
}

const TabButton = ({text, active, onClick}: TabButtonProps) => {
    return (<div className={`tab-button ${active ? 'active' : ''}`} onClick={onClick}>
        {text}
    </div>);
}

export default React.memo(TabButton);