"use client";
import React, { useState, useEffect } from "react";
import {
  XAxis,
  YAxis,
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Image from "next/image";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "../styles/toppools.css";
import star from "../../assests/star.svg";
import info from "../../assests/info.svg";
import candle from "../../assests/candle.svg";
import search from "../../assests/search.svg";

const TopChains = () => {
  const [chainsData, setChainsData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [topAPR, setTopAPR] = useState([]);
  const [lowAPR, setLowAPR] = useState([]);
  const [avgAPR, setAvgAPR] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hardcoded top APR data
    const hardcodedTopAPR = [
      { symbol: "BTC-APR", apy1D: 1.23, apy7D: 2.34 },
      { symbol: "ETH-APR", apy1D: 0.56, apy7D: 1.78 },
      { symbol: "SOL-APR", apy1D: 0.89, apy7D: 1.67 },
    ];
    setTopAPR(hardcodedTopAPR);

    // Hardcoded low APR data
    const hardcodedLowAPR = [
      { symbol: "XRP-APR", apy1D: -0.12, apy7D: -0.25 },
      { symbol: "DOGE-APR", apy1D: -0.34, apy7D: -0.45 },
      { symbol: "SHIB-APR", apy1D: -0.50, apy7D: -0.60 },
    ];
    setLowAPR(hardcodedLowAPR);

    // Hardcoded table data
    const hardcodedTableData = [
      { rank: 1, chainName: "Ethereum", totalChainTvl: 120000000, protocols: ["Uniswap", "Aave"], numOfProtocols: 2 },
      { rank: 2, chainName: "Binance Smart Chain", totalChainTvl: 90000000, protocols: ["PancakeSwap", "Venus"], numOfProtocols: 2 },
      { rank: 3, chainName: "Polygon", totalChainTvl: 50000000, protocols: ["QuickSwap", "Aave"], numOfProtocols: 2 },
    ];
    setTableData(hardcodedTableData);
    
    // Set loading to false
    setLoading(false);
  }, []);

  const formatValue = (value) => {
    if (value > 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    return value.toFixed(2);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="layout">
      <div className="topchain-container">
        <div className="box">
          <div className="group">
            <div className="marketsize">
              <div className="headers">
                <div className="heading">
                  Top Gainers
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
                <table className="table1">
                  <tbody>
                    {topAPR.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}.</td>
                        <td>{item.symbol.replace(/-/g, " / ")}</td>
                        <td className="tdapy">
                          <span className={item.apy1D < 0 ? "redText" : "greenText"}>
                            {item.apy1D > 0 ? "+" : ""}
                            {item.apy1D.toFixed(4)}
                          </span>
                          {" / "}
                          <span className={item.apy7D < 0 ? "redText" : "greenText"}>
                            {item.apy7D?.toFixed(4) || "-"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="marketsize">
              <div className="headers">
                <div className="heading">
                  Top Losers
                  <Image className="group-2" alt="Group" src={star} />
                </div>
                <div className="pagination">
                  <Image data-tooltip-id="topLosers" src={info} />
                  <ReactTooltip
                    id="topLosers"
                    place="bottom"
                    content="Top 3 Losers in terms of APR"
                  />
                </div>
              </div>
              <div className="data">
                <table className="table1">
                  <tbody>
                    {lowAPR.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}.</td>
                        <td>{item.symbol.replace(/-/g, " / ")}</td>
                        <td className="tdapy">
                          <span className={item.apy1D < 0 ? "redText" : "greenText"}>
                            {item.apy1D > 0 ? "+" : ""}
                            {item.apy1D.toFixed(4)}
                          </span>
                          {" / "}
                          <span className={item.apy7D < 0 ? "redText" : "greenText"}>
                            {item.apy7D?.toFixed(4) || "-"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="marketsize">
              <div className="headers">
                <div className="heading">
                  Top Chains Trend
                  <Image className="group-2" alt="Group" src={star} />
                </div>
              </div>
              <ResponsiveContainer width="100%" height={120}>
                <AreaChart data={[] /* Add your lineData here if necessary */}>
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="tableheader">
          <div className="tmainhead">Top Chains</div>
          <div className="searchbar">
            <div className="search">
              <Image src={search} alt="search" />
              <input placeholder="Search (e.g., dydx, Gmx)" />
            </div>
          </div>
        </div>
        <div className="topchainstable">
          <table className="table1">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Chain</th>
                <th>Total TVL</th>
                <th>Protocols</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((chain) => (
                <tr key={chain.rank}>
                  <td>{chain.rank}</td>
                  <td>
                    {chain.chainName}
                    <div className="protocols">{chain.protocols.join(", ")}</div>
                  </td>
                  <td>{formatValue(chain.totalChainTvl)}</td>
                  <td>{chain.numOfProtocols}</td>
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
