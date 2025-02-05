import { FC, useState } from 'react';
import getComponentInfo from "../../../hooks/getComponentInfo";
import { getComponentConfByType } from "../../../components/QuestionComponents/index.interface";
import "../scss/ConponentList.scss";
type PropsType = {
    selectedId: string;
    setSelectedId: (id: string) => void;
    setSelectComponentType: (type: string) => void;
};
const ComponentList: FC<PropsType> = (props: PropsType) => {
    const { selectedId, setSelectedId, setSelectComponentType } = props;
    // 解构组件信息
    const { visibleComponentList } = getComponentInfo();
    return (
        <div className="stat-c-container">
            {visibleComponentList
                .map((item: any) => {
                    const { componentId, componentProps, componentType } = item;
                    const componentConf = getComponentConfByType(componentType);
                    if (componentConf == null) return null;
                    // 解构属性表单
                    const { Component } = componentConf;
                    return (
                        <div
                            className={`stat-c-wrapper ${componentId == selectedId && 'stat-c-selected'}`}
                            key={componentId}
                            onClick={() => {
                                setSelectedId(componentId);
                                setSelectComponentType(componentType);
                            }}
                        >
                            <div className="stat-c-component">
                                <Component {...componentProps}></Component>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default ComponentList;
