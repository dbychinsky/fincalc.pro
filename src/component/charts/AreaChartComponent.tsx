import React, {useContext, useEffect} from 'react';
import {
    Legend, ResponsiveContainer, AreaChart, Tooltip, XAxis, YAxis, Area
} from "recharts";
import "./AreaChartComponent.scss";
import {observer} from "mobx-react";
import {StoreContext} from "../../App";
import TitleTile from "../titleTile/TitleTile";

export type RateDynamicChart = {
    day: string,
    USD: number,
    EUR: number,
    RUB: number,
    PLN: number
}

const AreaChartComponent = observer(() => {

    const areaChartStore = useContext(StoreContext).areaChartStore;
    const currencyRateStore = useContext(StoreContext).currencyRateStore;

    /**
     * Конвертируем данные
     */
    useEffect(() => {
            if (currencyRateStore.rateDynamicUSD !== undefined) {
                areaChartStore.setRateDynamic(
                    currencyRateStore.rateDynamicUSD,
                    currencyRateStore.rateDynamicEUR,
                    currencyRateStore.rateDynamicRUB,
                    currencyRateStore.rateDynamicPLN,
                );
            } // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [currencyRateStore.rateDynamicUSD,
            currencyRateStore.rateDynamicEUR,
            currencyRateStore.rateDynamicRUB,
            currencyRateStore.rateDynamicPLN]
    );

    return (
        <div className="areaChartComponent">
            <TitleTile><span>Графики изменения курсов валют за периоды</span></TitleTile>
            <p className="title">Период: 7 дней</p>
            <div className="chartWrapper">
                <ResponsiveContainer>
                    <AreaChart data={areaChartStore.rateAllPeriodChart.slice(83)}
                               margin={{top: 15, right: 0, left: -32, bottom: 0}}>
                        <XAxis dataKey="day"/>
                        <YAxis type="number" domain={['dataMin', 'auto']} tickCount={8}/>
                        <Legend verticalAlign="bottom"
                                height={26}
                                iconType={"plainline"}
                                iconSize={10}/>
                        <Tooltip/>

                        <defs>
                            <linearGradient id="usd" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#1bab00" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#1bab00" stopOpacity={0}/>
                            </linearGradient>

                            <linearGradient id="eur" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#c6b508" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#c6b508" stopOpacity={0}/>
                            </linearGradient>

                            <linearGradient id="rub" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#cb0101" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#cb0101" stopOpacity={0}/>
                            </linearGradient>

                            <linearGradient id="pln" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22b1b8" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#22b1b8" stopOpacity={0}/>
                            </linearGradient>
                        </defs>

                        <Area type="monotone"
                              dataKey="USD"
                              stroke="#39ff14"
                              fill="url(#usd)"
                              activeDot={{r: 5}}
                              dot={false}/>
                        <Area type="monotone"
                              dataKey="EUR"
                              stroke="#ffea19"
                              fill="url(#eur)"
                              activeDot={{r: 5}}
                              dot={false}/>
                        <Area type="monotone"
                              dataKey="RUB"
                              stroke="#f32525"
                              fill="url(#rub)"
                              fillOpacity={1}
                              activeDot={{r: 5}}
                              dot={false}/>
                        <Area type="monotone"
                              dataKey="PLN"
                              stroke="#7df9ff"
                              fill="url(#pln)"
                              fillOpacity={1}
                              activeDot={{r: 5}}
                              dot={false}/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <p className="title">Период: 14 дней</p>
            <div className="chartWrapper">
                <ResponsiveContainer>
                    <AreaChart width={286} height={200} data={areaChartStore.rateAllPeriodChart.slice(76)}
                               margin={{top: 15, right: 0, left: -32, bottom: 0}}>
                        <XAxis dataKey="day"/>
                        <YAxis type="number" domain={['dataMin', 'auto']} tickCount={8}/>
                        <Legend verticalAlign="bottom" height={26} iconType={"plainline"} iconSize={10}/>
                        <Tooltip/>

                        <defs>
                            <linearGradient id="usd" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#1bab00" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#1bab00" stopOpacity={0}/>
                            </linearGradient>

                            <linearGradient id="eur" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#c6b508" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#c6b508" stopOpacity={0}/>
                            </linearGradient>

                            <linearGradient id="rub" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#cb0101" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#cb0101" stopOpacity={0}/>
                            </linearGradient>

                            <linearGradient id="pln" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22b1b8" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#22b1b8" stopOpacity={0}/>
                            </linearGradient>
                        </defs>

                        <Area type="monotone"
                              dataKey="USD"
                              stroke="#39ff14"
                              fill="url(#usd)"
                              activeDot={{r: 5}}
                              dot={false}/>
                        <Area type="monotone"
                              dataKey="EUR"
                              stroke="#ffea19"
                              fill="url(#eur)"
                              activeDot={{r: 5}}
                              dot={false}/>
                        <Area type="monotone"
                              dataKey="RUB"
                              stroke="#f32525"
                              fill="url(#rub)"
                              fillOpacity={1}
                              activeDot={{r: 5}}
                              dot={false}/>
                        <Area type="monotone"
                              dataKey="PLN"
                              stroke="#7df9ff"
                              fill="url(#pln)"
                              fillOpacity={1}
                              activeDot={{r: 5}}
                              dot={false}/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <p className="title">Период: 30 дней</p>
            <div className="chartWrapper">
                <ResponsiveContainer>
                    <AreaChart width={286} height={200} data={areaChartStore.rateAllPeriodChart.slice(60)}
                               margin={{top: 15, right: 0, left: -32, bottom: 0}}>
                        <XAxis dataKey="day"/>
                        <YAxis type="number" domain={['dataMin', 'auto']} tickCount={8}/>
                        <Legend verticalAlign="bottom" height={26} iconType={"plainline"} iconSize={10}/>
                        <Tooltip/>

                        <defs>
                            <linearGradient id="usd" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#1bab00" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#1bab00" stopOpacity={0}/>
                            </linearGradient>

                            <linearGradient id="eur" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#c6b508" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#c6b508" stopOpacity={0}/>
                            </linearGradient>

                            <linearGradient id="rub" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#cb0101" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#cb0101" stopOpacity={0}/>
                            </linearGradient>

                            <linearGradient id="pln" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22b1b8" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#22b1b8" stopOpacity={0}/>
                            </linearGradient>
                        </defs>

                        <Area type="monotone"
                              dataKey="USD"
                              stroke="#39ff14"
                              fill="url(#usd)"
                              activeDot={{r: 5}}
                              dot={false}/>
                        <Area type="monotone"
                              dataKey="EUR"
                              stroke="#ffea19"
                              fill="url(#eur)"
                              activeDot={{r: 5}}
                              dot={false}/>
                        <Area type="monotone"
                              dataKey="RUB"
                              stroke="#f32525"
                              fill="url(#rub)"
                              fillOpacity={1}
                              activeDot={{r: 5}}
                              dot={false}/>
                        <Area type="monotone"
                              dataKey="PLN"
                              stroke="#7df9ff"
                              fill="url(#pln)"
                              fillOpacity={1}
                              activeDot={{r: 5}}
                              dot={false}/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <p className="title">Период: 90 дней</p>
            <div className="chartWrapper">
                <ResponsiveContainer>
                    <AreaChart data={areaChartStore.rateAllPeriodChart}
                               margin={{top: 15, right: 0, left: -32, bottom: 0}}>
                        <XAxis dataKey="day"/>
                        <YAxis type="number" domain={['dataMin', 'auto']} tickCount={8}/>
                        <Legend verticalAlign="bottom" height={26} iconType={"plainline"} iconSize={10}/>
                        <Tooltip/>

                        <defs>
                            <linearGradient id="usd" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#1bab00" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#1bab00" stopOpacity={0}/>
                            </linearGradient>

                            <linearGradient id="eur" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#c6b508" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#c6b508" stopOpacity={0}/>
                            </linearGradient>

                            <linearGradient id="rub" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#cb0101" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#cb0101" stopOpacity={0}/>
                            </linearGradient>

                            <linearGradient id="pln" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22b1b8" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#22b1b8" stopOpacity={0}/>
                            </linearGradient>
                        </defs>

                        <Area type="monotone"
                              dataKey="USD"
                              stroke="#39ff14"
                              fill="url(#usd)"
                              activeDot={{r: 5}}
                              dot={false}/>
                        <Area type="monotone"
                              dataKey="EUR"
                              stroke="#ffea19"
                              fill="url(#eur)"
                              activeDot={{r: 5}}
                              dot={false}/>
                        <Area type="monotone"
                              dataKey="RUB"
                              stroke="#f32525"
                              fill="url(#rub)"
                              fillOpacity={1}
                              activeDot={{r: 5}}
                              dot={false}/>
                        <Area type="monotone"
                              dataKey="PLN"
                              stroke="#7df9ff"
                              fill="url(#pln)"
                              fillOpacity={1}
                              activeDot={{r: 5}}
                              dot={false}/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
});

export default AreaChartComponent;