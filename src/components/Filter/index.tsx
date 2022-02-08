import Button from 'layout/Button';
import React, { useState } from 'react';
import { INGREDIENT, PROCESSING_METHOD } from 'utils/constants/data';
import { RequestsArray, ISetData } from 'utils/types';

import downArrow from 'assets/arrow_drop_down.png';
import refresh from 'assets/refresh.png';

import FilterButton from './FilterButton';
import styled from 'styled-components';

const Filter: React.FC<{
    data: RequestsArray;
    setData: ISetData;
    onFiltered(selectedValue: string): void;
    originData: RequestsArray;
}> = ({ data, setData, onFiltered, originData }) => {
    const [isMethodOpen, setIsMethodOpen] = useState<boolean>(false);
    const [isIngreOpen, setIsIngreOpen] = useState<boolean>(false);
    const [selectedMethod, setSelectedMethod] = useState<
        (string | ConcatArray<string>)[]
    >([]);
    const [selectedMaterial, setSelectedMaterial] = useState<
        (string | ConcatArray<string>)[]
    >([]);

    const [methodcheckList, setMethodCheckList] = useState<(null | number)[]>(
        []
    );
    const [materialcheckList, setMaterialCheckList] = useState<
        (null | number)[]
    >([]);

    const openOptionHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        const checkValue = event.currentTarget.value;
        if (checkValue === 'method') {
            setIsMethodOpen((prev) => !prev);
        }
        if (checkValue === 'ingredient') {
            setIsIngreOpen((prev) => !prev);
        }
    };

    const handleAllUncheck = () => {
        setSelectedMethod([]);
        setSelectedMaterial([]);
        setMaterialCheckList([]);
        setMethodCheckList([]);
    };
    return (
        <div>
            <Button value="method" onClick={openOptionHandler}>
                가공방식
                {selectedMethod.length > 0 && (
                    <span> ({selectedMethod.length})</span>
                )}
                <ArrowIMG src={downArrow} alt="drop-down" />
            </Button>
            <Button value="ingredient" onClick={openOptionHandler}>
                재료
                {selectedMaterial.length > 0 && (
                    <span> ({selectedMaterial.length})</span>
                )}
                <ArrowIMG src={downArrow} alt="drop-down" />
            </Button>

            {isMethodOpen && (
                <FilterButton
                    buttonData={PROCESSING_METHOD}
                    name="method"
                    option={PROCESSING_METHOD}
                    data={data}
                    setData={setData}
                    onFiltered={onFiltered}
                    originData={originData}
                    selectedMethod={selectedMethod}
                    setSelectedMethod={setSelectedMethod}
                    selectedMaterial={selectedMaterial}
                    setSelectedMaterial={setSelectedMaterial}
                    setCheckList={setMethodCheckList}
                    checkList={methodcheckList}
                />
            )}

            {isIngreOpen && (
                <FilterButton
                    selectedMethod={selectedMethod}
                    setSelectedMethod={setSelectedMethod}
                    selectedMaterial={selectedMaterial}
                    setSelectedMaterial={setSelectedMaterial}
                    buttonData={INGREDIENT}
                    name="material"
                    option={INGREDIENT}
                    data={data}
                    setData={setData}
                    onFiltered={onFiltered}
                    originData={originData}
                    setCheckList={setMaterialCheckList}
                    checkList={materialcheckList}
                />
            )}

            <span>
                <RefreshBtn onClick={handleAllUncheck}>
                    <RefreshIMG src={refresh} alt="refresh" /> 필터링 리셋
                </RefreshBtn>
            </span>
        </div>
    );
};

const ArrowIMG = styled.img`
    width: 10px;
    height: 5px;
    margin-bottom: 3px;
    margin-left: 12px;
`;

const RefreshIMG = styled.img`
    width: 16px;
    height: 16px;
`;

const RefreshBtn = styled.button`
    font-size: 12px;
    font-weight: 400px;
    color: #2196f3;
`;
export default Filter;
