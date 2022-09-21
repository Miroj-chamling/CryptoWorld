import React, { useState } from "react";
import { Row, Col, Avatar, Card, Typography, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import demoImg from "../assets/demo.jpeg";

const { Text, Title } = Typography;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const [inputValue, setInputValue] = useState("");
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 25,
  });
  if (!cryptoNews?.value) return "Loading...";
  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <div className="search-crypto-news">
              <Text>Search News</Text>
              <Input
                placeholder="Eg: Bitcoin"
                onChange={(e) =>
                  e.target.value === ""
                    ? setInputValue("Cryptocurrency")
                    : setInputValue(e.target.value)
                }
              />
              <button
                className="search-btn"
                onClick={() => setNewsCategory(inputValue)}
              >
                Search
              </button>
            </div>
          </Col>
        )}
        {cryptoNews.value.length > 0 ? (
          <>
            {cryptoNews.value.map((news, i) => (
              <Col key={i} xs={24} sm={12} lg={8}>
                <Card hoverable className="news-card">
                  <a href={news.url} target="_blank" rel="noreferrer">
                    <div className="news-image-container">
                      <Title level={4} className="news-title">
                        {news.name}
                      </Title>
                      <img
                        alt="newImage"
                        style={{ maxWidth: "200px", maxHeight: "100px" }}
                        src={news?.image?.thumbnail?.contentUrl || `${demoImg}`}
                      />
                    </div>
                    <p>
                      {news.description > 100
                        ? `${news.description.substring(0, 100)}...`
                        : news.description}
                    </p>
                    <div className="provider-container">
                      <div>
                        <Avatar
                          src={
                            news.provider[0]?.image?.thumbnail?.contentUrl ||
                            `${demoImg}`
                          }
                          alt="news-provider"
                        />
                        <Text className="provider-name">
                          {news.provider[0]?.name}
                        </Text>
                      </div>
                    </div>
                    <br />
                    <Text>
                      {moment(news.datePublished).startOf("ss").fromNow()}
                    </Text>
                  </a>
                </Card>
              </Col>
            ))}
          </>
        ) : (
          <div
            style={{ margin: "auto", display: "flex", alignItems: "center" }}
          >
            <Title level={2}>Your search was not found</Title>
            <div style={{ padding: "0px 0px 12px 8px" }}>
              <SearchOutlined
                style={{ fontSize: "32px", fontWeight: "bold" }}
              />
            </div>
          </div>
        )}
      </Row>
    </>
  );
};

export default News;
