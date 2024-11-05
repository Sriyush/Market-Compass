"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import "./styles/home.css";
import rank from "../assests/rank.svg";
import search from "../assests/search.svg";
import candle from "../assests/candle.svg";
import order from "../assests/order.svg";
import Dough from "./components/Doughnut";
import React, { useEffect, useState } from 'react';
import ethereum from "../assests/ethereum.svg";
import {
  XAxis,
  YAxis,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

function getChainSVGUrl(chainName) {
  return `/chains/${chainName.toLowerCase()}.svg`;
}

const COLORS = ["#F8E837", "green", "#0076FF", "#FF8042", "#FFFFFF4D"];

export default function Home() {
  const [data, setdata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for demonstration
  const sampleData = [
    {
      rank: 1,
      protocolname: "Ethereum",
      tvl: 2000000000,
      logo: ethereum,
      chains: ["Ethereum", "Binance"],
      mcap: 3000000000,
      change_7d: 10,
      volume24h: 5000000,
      chartTVL: [
        { date: 1622505600, totalLiquidityUSD: 2000000000 },
        { date: 1622592000, totalLiquidityUSD: 2100000000 },
      ],
    },
    {
      rank: 2,
      protocolname: "Binance",
      tvl: 1500000000,
      logo: ethereum,
      chains: ["Ethereum", "Polygon"],
      mcap: 2500000000,
      change_7d: -5,
      volume24h: 3000000,
      chartTVL: [
        { date: 1622505600, totalLiquidityUSD: 1500000000 },
        { date: 1622592000, totalLiquidityUSD: 1550000000 },
      ],
    },
    // Add more sample protocols as needed
  ];

  // Update sample data to state (replace this with actual data fetching)
  React.useEffect(() => {
    setdata(sampleData);
  }, []);

  const filteredData = data.filter((protocol) =>
    protocol.protocolname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const format = (value) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(2)}B`;
    }
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)}M`;
    }
    if (typeof value === 'number' && value <= 1000) {
      return `${value.toFixed(2)}`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}K`;
    } else {
      return value;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="layout">
        <div className="home-container">
          <div className="box">
            <div className="group">
              <div className="marketsize">
                <div className="headers">
                  <div className="heading">Market size</div>
                </div>
                <div className="ranking">
                  <Image className="group-2" alt="Group" src={rank} />
                  <div className="text-wrapper-8">
                    {data.length > 0 ? format(data[0].tvl) : ''}
                  </div>
                  <Image
                    className="icon"
                    alt="Icon"
                    src={data.length > 0 ? data[0].logo : null}
                    width={22}
                    height={22}
                  />
                </div>
                <div className="data">
                  <div className="doughnut">
                    <Dough pieChartData={data} />
                  </div>
                  <div className="exchanges">
                    {data.slice(0, 4).map((name, index) => (
                      <div key={index} className="text-wrapper">
                        <Image
                          className="mark"
                          alt="Mark"
                          src={name.logo || null}
                          width={15}
                          height={15}
                        />
                        {name.protocolname}
                      </div>
                    ))}
                    <div className="text-wrapper">Others</div>
                  </div>
                </div>
              </div>
              <div className="chartcontainer">
                <div className="heading">Total Value Locked</div>
                <div className="minih">
                  <div className="tvlprice">
                    ${data.length > 0 ? format(data[0].tvl) : ''}
                  </div>
                </div>
                <div className="linechart">
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart
                      width={500}
                      height={300}
                      data={data[0] ? data[0].chartTVL : []}
                      margin={{
                        top: 5,
                        right: 1,
                        left: -15,
                        bottom: 5,
                      }}
                    >
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Area
                        type="monotone"
                        dataKey="totalLiquidityUSD"
                        stroke="red"
                        fill="url(#chartGradient)"
                        strokeWidth={0.9}
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
          <div className="tableheader">
            <div className="tmainhead">Crypto Derivatives</div>
            <div className="searchbar">
              <div className="search">
                <Image src={search} alt="search" />
                <input
                  placeholder="Search (eg. dydx, Gmx)"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
          <div className="div">
            <div className="datatable">
              <div className="tables">
                <div className="table">
                  <div className="thead-rank">#</div>
                  <div className="thead-name">Names</div>
                  <div className="thead-tvl">TVL</div>
                  <div className="thead-protocol">Protocol</div>
                  <div className="thead-marketcap">Market Cap</div>
                  <div className="thead-7dchange">7d Change</div>
                  <div className="thead-24hrvolume">24hr Volume</div>
                </div>
              </div>
              {filteredData.map((item, index) => (
                <div className="tablecells" key={index}>
                  <div className="tablecell">
                    <div className="tablecell-rank">{item.rank}</div>
                    <div className="tablecell-name">
                      <div className="nameimg">
                        <Image
                          src={item.logo || null}
                          alt="prot"
                          width={22}
                          height={22}
                          margin={1}
                        />
                      </div>
                      <div>{item.protocolname}</div>
                    </div>
                    <div className="tablecell-tvl">${format(item.tvl)}</div>
                    <div className="tablecell-marketcap">
                      {item.mcap ? format(item.mcap) : "N/A"}
                    </div>
                    <div
                      className="tablecell-7dchange"
                      style={{
                        color: item.change_7d < 0 ? "red" : "green",
                      }}
                    >
                      {item.change_7d !== null && item.change_7d !== undefined
                        ? `${item.change_7d.toFixed(2)}%`
                        : "N/A"}
                    </div>
                    <div className="tablecell-24hrvolume">
                      {item.volume24h !== null && item.volume24h !== undefined
                        ? `${format(item.volume24h.toFixed(2))}`
                        : "N/A"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
