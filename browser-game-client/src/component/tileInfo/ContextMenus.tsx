import {IMapTileContent} from "../../context/SocketContext.tsx";

const TreeContextMenu = () => <ul>
    <li>Chop</li>
</ul>

export default function getContextMenu(item: IMapTileContent | undefined) {
    if(!item) {
        return <div>No menu</div>;
    }
    switch (item.type) {
        case 'TREE':
            return TreeContextMenu();
        default:
            return <div>No menu</div>;
    }
}