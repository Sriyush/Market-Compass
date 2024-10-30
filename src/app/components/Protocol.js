"use client";
import { use, useEffect, useMemo, useState } from "react";
import styles from "../styles/protocol.module.css";
import axios from "axios";
import Image from "next/image";
import blockExplorer from "../protocols/blockexplorers";
import arrowup from "../../assests/arrowup.svg";
import link from "../../assests/link.svg";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
function getChainSVGUrl(chainName) {
  return `/chains/${chainName.toLowerCase()}.svg`;
}
const Protocol = (props) => {
  const protocol = props.props;
  const [Logo, setLogo] = useState();
  const [Name, setName] = useState();
  const [url, setURL] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [Filtereddata, setFiltereddata] = useState();

  useEffect(() => {
    async function fetchData() {
      const resp = await axios.get("https://www.deripulse.com/api/db");
      const data = resp.data.arrProtocolData;
      const filtereddata = data.filter((dt) => dt.slug === protocol);
      setFiltereddata(filtereddata[0]);

      // const delay = 2000;

      // setTimeout(() => {
      //   setURL(filtereddata[0].url);
      //   setIsLoading(false);
      // }, delay);
    }
    fetchData();
  }, []);

  if (Filtereddata !== undefined) {
    function calculateATHAndATLWithDates(data) {
      if (!data || data.length === 0) {
        return null;
      }

      let ATH = { date: data[0].date, value: data[0].totalLiquidityUSD };
      let ATL = { date: data[0].date, value: data[0].totalLiquidityUSD };

      for (const item of data) {
        const liquidity = item.totalLiquidityUSD;

        if (liquidity > ATH.value) {
          ATH = { date: item.date, value: liquidity };
        }

        if (liquidity < ATL.value) {
          ATL = { date: item.date, value: liquidity };
        }
      }

      return { ATH, ATL };
    }
    let ATH = null;
    let ATL = null;
    if (Filtereddata.chartTVL.length > 0) {
      const result = calculateATHAndATLWithDates(Filtereddata.chartTVL);
      ATH = result.ATH;
      ATL = result.ATL;
    }
    return (
      <div className="protocolcontainer">
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <div className={styles.part1}>
            <div>
              <Image
                className={styles.logo}
                src={Filtereddata.logo}
                width={100}
                height={100}
              />
            </div>
            <div className={styles.name}>{Filtereddata.protocolname}</div>
            <div className={styles.chains}>
              {Filtereddata.chains.map((chain, index) => (
                <div key={index} className={styles.chain}>
               <div>
               <Image
                            src={getChainSVGUrl(chain)}
                            alt={chain}
                            height={22}
                            width={22}
                            title={chain}
                          />
               </div>
               
                  {chain}
                </div>
              ))}  
            </div>

            <div className={styles.info}>
              {Filtereddata.url && (
                <div className={styles.infobox}>
                  <Image className={styles.urlClick} src={link} />
                  {new URL(Filtereddata.url).hostname}
                  <a target="_blank" rel="noopener noreferrer" href={url}>
                    <Image src={arrowup} />
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className={styles.part2}>
            <div className={styles.tvlBox}>
              <div className={styles.boxhead}>Total Value Locked (TVL)</div>
              <div className={styles.tvl}>
                ${" "}
                {Filtereddata.tvl.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                }) || <Skeleton />}
              </div>
              <div className={styles.tvlline}></div>
              <div className={styles.chainTvls}>
                {Object.entries(Filtereddata.chainTvls).map(
                  ([chain, tvl], index) => (
                    <div className={styles.chaintvldata}>
                      <div className={styles.pchain}>{chain} TVL </div>

                      <div className={styles.pchaintvl}>
                        ${" "}
                        {parseFloat(tvl).toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className={styles.token}>
                <div className={styles.lptoken}>
                  LP Token
                  <div className={styles.symbol}>${Filtereddata.symbol}</div>
                </div>
                <div className={styles.lptoken}>
                  Change 1h
                  <div
                    className={`${
                      Filtereddata.change_1h >= 0
                        ? styles.change_g
                        : styles.change_r
                    }`}
                  >
                    {Filtereddata.change_1h.toFixed(2)}%
                  </div>
                </div>
                <div className={styles.lptoken}>
                  Change 1d
                  <div
                    className={`${
                      Filtereddata.change_1d >= 0
                        ? styles.change_g
                        : styles.change_r
                    }`}
                  >
                    {Filtereddata.change_1d.toFixed(2)}%
                  </div>
                </div>
                <div className={styles.lptoken}>
                  Change 7d
                  <div
                    className={`${
                      Filtereddata.change_7d >= 0
                        ? styles.change_g
                        : styles.change_r
                    }`}
                  >
                    {Filtereddata.change_7d.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.tvlChart}>
              <div className={styles.charttext}>TVL Chart</div>

              <ResponsiveContainer height={220}>
                <AreaChart data={Filtereddata.chartTVL}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0076FF" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0076FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    tick={false}
                    axisLine={false}
                    tickLine={false}
                    height={0}
                  />
                  <YAxis
                    domain={["dataMin", "dataMax"]}
                    tick={false}
                    axisLine={false}
                    tickLine={false}
                    width={0}
                  />
                  <Tooltip
                    content={({ payload, label }) => {
                      const formattedDate = new Date(
                        label * 1000
                      ).toLocaleDateString("en-GB");

                      if (payload && payload.length > 0) {
                        const dataPoint = payload[0].payload;
                        return (
                          <div className={styles.neon}>
                            <p>Date: {formattedDate}</p>
                            <p>
                              Total Liquidity USD $
                              {parseFloat(
                                dataPoint.totalLiquidityUSD
                              ).toLocaleString("en-US", {
                                maximumFractionDigits: 2,
                              })}{" "}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />

                  <Legend />
                  <Area
                    className={styles.charttext}
                    type="monotone"
                    dataKey="totalLiquidityUSD"
                    stroke="#0076FF"
                    fill="url(#colorUv)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className={styles.tvlStats}>
              <div className={styles.boxhead}>
                {Filtereddata.protocolname} TVL Statistics
              </div>

              <div className={styles.statsgrid}>
                <div>All Time High</div>
                <div className={styles.ATH}>
                  ${" "}
                  {parseFloat(ATH.value).toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}
                </div>

                <div>All Time Low</div>
                <div className={styles.ATL}>
                  ${" "}
                  {parseFloat(ATL.value).toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div>Volume 24h</div>
                <div className={styles.ATH}>
                  ${" "}
                  {parseFloat(Filtereddata.volume24h).toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.part3}>
            <div className={styles.pools}></div>
          </div>
        </SkeletonTheme>
      </div>
    );
  }
};

export default Protocol;
