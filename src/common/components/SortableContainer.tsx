import { FC } from "react";
import { DndContext, closestCenter, MouseSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Item from "antd/es/list/Item";

type PropsType = {
    children: JSX.Element;
    items: Array<{ id: string;[key: string]: any; }>; // 可以扩展任何属性
    onDragEnd: (oldIndex: number, newIndex: number) => void;
};
const SortableContainer: FC<PropsType> = (props: PropsType) => {
    // 解构
    const { children, items, onDragEnd } = props;
    // 创建sensors
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 8, // 8px
            }
        }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over?.id);
            onDragEnd(oldIndex, newIndex);
            const newItems = arrayMove(items, oldIndex, newIndex); // 重新排序
        }

    };
    return <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {children}
        </SortableContext>
    </DndContext>;
};
export default SortableContainer;