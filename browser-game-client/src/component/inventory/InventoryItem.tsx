import './InventoryItem.css'
import {IInventorySocket} from "../../data/IInventorySocket.ts";
import {IItemNode} from "../../data/IBaseNode.ts";
import React from 'react';

interface IInventoryItemProps {
    item: IInventorySocket;
}

const InventoryItem = ({item}: IInventoryItemProps) => {
    const itemNode = item.itemNode as IItemNode;
    return (
        <div key={itemNode.id} className={'inventory-item'}>
            {itemNode.name}{itemNode.stackable ? `(${item.count})`: ''}
        </div>
    );
}

export default React.memo(InventoryItem);