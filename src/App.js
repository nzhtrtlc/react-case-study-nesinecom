import React, { useEffect, useState } from "react";
import ActionButtons from "./components/ActionButtons";
import Table from "./components/Table";
import { RENDER_COUNT } from "./consts";
import "./main.sass";

export default function App() {
    const [mainData, setMainData] = useState(JSON.parse(localStorage.data) || []);
    const [tempData, setTempData] = useState([]);

    useEffect(() => {
        if (localStorage.data == null) {
            fetch("https://nesine-case-study.onrender.com/bets").then((d) =>
                d.json().then((r) => {
                    localStorage.setItem("data", JSON.stringify(r));
                    setMainData(r);
                })
            );
        }
    }, []);

    useEffect(() => {
        setTempData(mainData.slice(0, RENDER_COUNT));
    }, []);

    const onLoadMore = () => {
        setTempData([
            ...tempData,
            ...mainData.slice(tempData.length, tempData.length + RENDER_COUNT),
        ]);
    };

    const onLoadAll = () => {
        setTempData(mainData);
    };

    if (mainData && mainData.length === 0) return <h2>No data available</h2>;

    return (
        <div>
            <Table dataToRender={tempData} eventCount={mainData.length}/>

            <ActionButtons
                onLoadAll={onLoadAll}
                onLoadMore={onLoadMore}
                dataToRender={tempData}
                mainData={mainData}
            />
        </div>
    );
}
