import "./PlayerInventory.css"
import InventoryItem from "./InventoryItem.tsx";
import {IInventorySocket} from "../../data/IInventorySocket.ts";
import React, {useMemo} from "react";
import usePlayerInventory from "../../hooks/usePlayerInventory.ts";

const PlayerInventory = () => {
    const playerInventory = usePlayerInventory();

    const inventoryComponents = useMemo(() => playerInventory.map((item: IInventorySocket) => <InventoryItem
        item={item}/>), [playerInventory]);

    return (
        <div className={'inventory-container'}>
            {inventoryComponents}
        </div>
    );
}

export default React.memo(PlayerInventory);