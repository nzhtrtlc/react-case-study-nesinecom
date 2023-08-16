import React, { useState } from "react";
import { CouponContext } from '../context/CouponContext'
import { columnNames } from "../../consts";
import "./Table.sass";
import Cart from "../Cart";

function TableHeader({eventCount}) {
    return (
        <thead>
        <tr>
            <th></th>
            <th>Event Count: {eventCount}</th>
            {columnNames.map((c) => (
                <th key={Math.random()}>{c}</th>
            ))}
        </tr>
        </thead>
    );
}

const Table = ({dataToRender, eventCount}) => {
    const [coupons, setCoupons] = useState([]);

    const onFieldClick = ((e, couponData) => {
        const {code, ratio} = couponData

        const foundSame = coupons.find((c) => c.code === code && c.ratio === ratio);

        if (foundSame) {
            setCoupons(coupons.filter((c) => c.code !== code));
            e.target.style.backgroundColor = 'white'
        } else {
            setCoupons([...coupons, couponData]);
            e.target.style.backgroundColor = 'yellow'
        }

        const sameRowDiffRatio = coupons.find(
            (c) => c.code === code && c.ratio !== ratio
        );
        if (sameRowDiffRatio) {
            console.log(e.target.parentElement)
            e.target.parentElement.querySelectorAll('td').forEach(td => td.style.backgroundColor = '#fff')
            e.target.style.backgroundColor = 'yellow'

            const index = coupons.findIndex((c) => c.code === sameRowDiffRatio.code);
            const tempCoupons = [...coupons];
            tempCoupons[index] = couponData;
            setCoupons(tempCoupons);
        }
    });

    return (
        <CouponContext.Provider value={coupons}>
            <table className="tableFixedHeader">
                <TableHeader columnNames={columnNames} eventCount={eventCount}/>
                <tbody>
                {dataToRender.map((d, index) => {
                    return (
                        <>
                            <tr>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="group">
                                        <span>{d.D}</span>
                                        <span>{d.DAY}</span>
                                        <span>{d.LN}</span>
                                    </div>
                                </td>
                                {columnNames.map((c) => (
                                    <td>{c}</td>
                                ))}
                            </tr>
                            <tr>
                                <td></td>
                                <td width="400" className="bold">
                                    <div className="group">
                                        <span>{d.C}</span>
                                        <span>{d.T}</span>
                                        <span>{d.N}</span>
                                    </div>
                                </td>
                                <td>Yorumlar</td>
                                <td width="70">{d.OCG["1"].MBS}</td>
                                <td
                                    onClick={(e) =>
                                        onFieldClick(e, {
                                            MBS: d.OCG["1"].MBS,
                                            code: d.C,
                                            match: d.N,
                                            ratio: d.OCG["1"].OC["0"].O,
                                        })
                                    }
                                    width="100"
                                >
                                    {d.OCG["1"].OC["0"].O}
                                </td>
                                <td
                                    onClick={(e) =>
                                        onFieldClick(e, {
                                            MBS: d.OCG["1"].MBS,
                                            code: d.C,
                                            match: d.N,
                                            ratio: d.OCG["1"].OC["1"].O,
                                        })
                                    }
                                    width="100"
                                >
                                    {d.OCG["1"].OC["1"].O}
                                </td>
                                <td></td>
                                <td
                                    onClick={(e) =>
                                        onFieldClick(e, {
                                            MBS: d.OCG["5"].MBS,
                                            code: d.C,
                                            match: d.N,
                                            ratio: d.OCG["5"].OC["25"].O,
                                        })
                                    }
                                    width="100"
                                >
                                    {d.OCG["5"].OC["25"].O}
                                </td>
                                <td
                                    onClick={(e) =>
                                        onFieldClick(e, {
                                            MBS: d.OCG["5"].MBS,
                                            code: d.C,
                                            match: d.N,
                                            ratio: d.OCG["5"].OC["26"].O,
                                        })
                                    }
                                    width="100"
                                >
                                    {d.OCG["5"].OC["26"].O}
                                </td>
                                {new Array(11).fill(<td></td>)}
                            </tr>
                        </>
                    );
                })}
                </tbody>
            </table>
            <Cart/>
        </CouponContext.Provider>
    );
};

export default Table;
