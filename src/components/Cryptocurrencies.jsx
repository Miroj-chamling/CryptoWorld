import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Typography } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";

const { Text } = Typography;

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  console.log(cryptoList);
  const [cryptos, setCryptos] = useState([]);
  const [searchCoin, setSearchCoin] = useState("");
  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchCoin.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptoList, searchCoin]);

  if (isFetching) return "Loading...";

  return (
    <>
      {!simplified && (
        <Col span={24}>
          <div className="search-crypto-news">
            <Text>Search Crypto</Text>
            <Input
              placeholder="Eg: Bitcoin"
              onChange={(e) => setSearchCoin(e.target.value)}
            />
          </div>
        </Col>
      )}
      <br />
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((coin) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={coin.id}>
            <Link to={`/crypto/${coin.id}`}>
              <Card
                title={`${coin.rank}. ${coin.name}`}
                extra={<img className="crypto-image" src={coin.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(coin.price)}</p>
                <p>Market Cap: {millify(coin.marketCap)}</p>
                <p>Daily Change: {millify(coin.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
