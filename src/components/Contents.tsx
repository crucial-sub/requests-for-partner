import React, { useEffect, useState } from 'react';
import Filter from 'components/Filter';
import Cards from 'components/Cards';
import Toggle from 'components/Toggle';
import { RequestsArray } from 'utils/types';

const Contents = () => {
    const [data, setData] = useState<RequestsArray | null>([]);
    const [originData, setOriginData] = useState<RequestsArray | null>([]);
    const getData = async () => {
        const json = await (
            await fetch('http://localhost:4000/requests')
        ).json();
        setData(json);
        setOriginData(json);
    };

    useEffect(() => {
        getData();
    }, []);
    const onFiltered = (selectedValue: string) => {
        if (data !== null) {
            setData(data.filter((item) => item.method.includes(selectedValue)));
        }
    };
    const [isToggled, setIsToggled] = useState<boolean>(false);
    const filteredData =
        data && isToggled
            ? data.filter((item) => item.status === '상담중')
            : data;
    if (filteredData === null || data === null || originData === null)
        return <div>로딩 중</div>;

    return (
        <div>
            <Filter
                data={data}
                setData={setData}
                onFiltered={onFiltered}
                originData={originData}
            />
            <Toggle isToggled={isToggled} setIsToggled={setIsToggled} />
            <Cards data={filteredData} />
        </div>
    );
};

export default Contents;
