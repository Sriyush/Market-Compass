'use client';
import React, { useState, useEffect } from "react";
import "../styles/TopChains.css";
import {
    XAxis,
    YAxis,
    AreaChart,
    Area,
    ResponsiveContainer,
} from "recharts";
import Image from "next/image";
import { Tooltip as ReactTooltip } from "react-tooltip";
import star from "../../assests/star.svg";
import order from "../../assests/order.svg";
import candle from "../../assests/candle.svg";
import search from "../../assests/search.svg";
import info from "../../assests/info.svg";
import Ethereum from "../../assests/ethereum.svg";
import Binance from "../../assests/binance.svg";
import Polygon from "../../assests/polygon.svg";

const chainLogos = {
    Ethereum: Ethereum,
    "Binance Smart Chain": Binance,
    Polygon: Polygon,
};

const staticTableData = [
    {
        rank: 1,
        chainName: "Ethereum",
        totalChainTvl: 120000000000,
        avgVolume24h: 4500000000,
        avgChange1d: 2.5,
        avgChange7d: 5.1,
        protocols: ["Uniswap", "Aave", "Compound"],
        numOfProtocols: 3,
    },
    {
        rank: 2,
        chainName: "Binance Smart Chain",
        totalChainTvl: 80000000000,
        avgVolume24h: 2500000000,
        avgChange1d: 1.2,
        avgChange7d: 4.0,
        protocols: ["PancakeSwap", "Venus", "BakerySwap"],
        numOfProtocols: 3,
    },
    {
        rank: 3,
        chainName: "Polygon",
        totalChainTvl: 45000000000,
        avgVolume24h: 1500000000,
        avgChange1d: 1.8,
        avgChange7d: 3.5,
        protocols: ["QuickSwap", "Aave", "Curve"],
        numOfProtocols: 3,
    },
];

const lineData = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

function getChainSVGUrl(chainName) {
    return chainLogos[chainName] || ""; // Use the logo map
}

const TopChains = () => {
    const [chainsData, setChainsData] = useState([]);
    const [tabledata, settabledata] = useState(staticTableData);

    useEffect(() => {
        fetch('https://www.deripulse.com/api/allChains')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("Raw API Response:", data);

                const aggregatedData = {};

                for (const chain in data) {
                    let totalChainTvl = 0;
                    let totalVolume24h = 0;
                    let totalChange7d = 0;
                    let totalChange1d = 0;
                    let protocolsArray = []; // To store protocol names for the current chain

                    data[chain].forEach(protocol => {
                        if (protocol.chainTvls && protocol.chainTvls[chain]) {
                            totalChainTvl += protocol.chainTvls[chain];
                        }
                        if (protocol.volume24h) {
                            totalVolume24h += protocol.volume24h;
                        }
                        if (protocol.change_7d) {
                            totalChange7d += protocol.change_7d;
                        }
                        if (protocol.change_1d) {
                            totalChange1d += protocol.change_1d;
                        }
                        protocolsArray.push(protocol.protocolname);
                    });

                    const numOfProtocols = protocolsArray.length;
                    aggregatedData[chain] = {
                        chainName: chain,
                        totalChainTvl,
                        avgVolume24h: totalVolume24h / numOfProtocols,
                        avgChange7d: totalChange7d / numOfProtocols,
                        avgChange1d: totalChange1d / numOfProtocols,
                        protocols: protocolsArray,
                        numOfProtocols
                    };
                }

                const sortedData = Object.values(aggregatedData)
                    .sort((a, b) => b.totalChainTvl - a.totalChainTvl)
                    .map((chain, index) => ({
                        rank: index + 1,
                        ...chain
                    }));

                setChainsData(data);
                settabledata(sortedData);

            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const format = (value) => {
        if (value > 1000000000) {
            return `${(value / 1000000000).toFixed(2)}B`;
        }
        if (value >= 1000000) {
            return `${(value / 1000000).toFixed(2)}M`;
        }
        if (typeof value === 'number' && value <= 1000) {
            return `${value.toFixed(2)}`;
        }
        else if (value >= 1000) {
            return `${(value / 1000).toFixed(2)}K`;
        }
        else {
            return value;
        }
    };

    return (
        <div className="layout">
            <div className="topchain-container">
                <div className="box">
                    <div className="group">
                        <div className="marketsize">
                            <div className="headers">
                                <div className="heading">Top Chains
                                    <Image className="group-2" alt="Group" src={star} />
                                </div>
                                <div className="pagination">
                                    <Image data-tooltip-id="topGainers" src={info} />
                                    <ReactTooltip
                                        id="topGainers"
                                        place="bottom"
                                        content="Top 3 Gainers in terms of APR"
                                    />
                                </div>
                            </div>

                            <div className="data">
                                <div>
                                    <table className="table1">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>24hr Volume</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tabledata.slice(0, 3).map((chain, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{chain.rank}</td>
                                                        <td className="chaincell">
                                                            <Image
                                                                src={getChainSVGUrl(chain.chainName)}
                                                                alt={chain.chainName}
                                                                height={22}
                                                                width={22}
                                                                title={chain.chainName}
                                                            />
                                                            {chain.chainName}
                                                        </td>
                                                        <td>$ {chain.avgVolume24h.toFixed(2)}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="chartcontainer">
                            <div className="heading">
                                Total Value Locked
                                <div className="rightheading">
                                    <div className="all">
                                        All
                                        <Image src={order} alt="asc" />
                                    </div>
                                    <div className="candle">
                                        <Image src={candle} alt="candle" />
                                    </div>
                                </div>
                            </div>
                            <div className="minih"></div>
                            <div className="linechart">
                                <ResponsiveContainer width="100%" height={150}>
                                    <AreaChart
                                        width={450}
                                        height={180}
                                        margin={{
                                            top: 5,
                                            right: 1,
                                            left: -15,
                                            bottom: 5,
                                        }}
                                    >
                                        <defs>
                                            <linearGradient
                                                id="chartGradient"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop offset="5%" stopColor="red" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#d6455d" stopOpacity={0.8} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Area
                                            type="monotone"
                                            dataKey="uv"
                                            data={lineData}
                                            stroke="red"
                                            fill="url(#chartGradient)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tableheader">
                <div className="tmainhead">Top Chains</div>
                <div className="searchbar">
                  <div className="search">
                    <Image src={search} alt="search" />
                    <input 
                placeholder="Search (eg. dydx, Gmx)"
           
              />
                  </div>
                </div>
              </div>
              <div className="topchainstable">
              <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Protocols</th>
        
          <th>TVL</th>
          <th>24h Volume</th>
          <th>1d Change</th>
          <th>7d Change</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(tabledata) && tabledata.map((chain, index) => (
          <tr key={index}>
            <td>{chain.rank}</td>
            <td className="chaincell">
            <Image
                            src={getChainSVGUrl(chain.chainName)}
                            alt={chain.chainName}
                            height={22}
                            width={22}
                            title={chain.chainName}
                          />
    <span data-tip={chain.protocols.join(', ')}>{chain.chainName}</span>
    <ReactTooltip />
</td>
<td>
            <span data-tip={chain.protocols.join(', ')}>{chain.numOfProtocols}</span>
            <ReactTooltip />
        </td>
            <td>{format(chain.totalChainTvl.toFixed(2))}</td>
            <td>{chain.avgVolume24h.toFixed(2)}</td>
            <td>{chain.avgChange1d.toFixed(2)}%</td>
            <td>{chain.avgChange7d.toFixed(2)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
            </div>
        </div>
    );
};

export default TopChains;
