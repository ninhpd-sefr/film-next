"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import {
  Typography,
  Spin,
  Row,
  Col,
  Image,
  Alert,
  Tooltip,
  Button,
  Skeleton,
  Modal,
  Input,
  message,
} from "antd";
import { EpisodesResponse, FilmData, ServerData } from "../../../../types/app";
const { Title, Paragraph, Text } = Typography;
import {
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
} from "@ant-design/icons";
import { MoviePlayer } from "@/app/components/movie.player";
import { APP_DOMAIN_FRONTEND } from "../../../../constant";
import { DetailSkeletonLoader } from "@/app/components/film.detail.skeleton.loader";
import NProgress from "nprogress";

// Fetcher function for useSWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function MovieDetailPage() {
  const [loved, setLoved] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fullURL, setFullURL] = useState<string>("");
  const { slug } = useParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentURL = `${window.location.origin}/film/${slug}`;
      setFullURL(currentURL);
    }
  }, [slug]);

  const { data, error, isLoading } = useSWR(
    `${APP_DOMAIN_FRONTEND}/phim/${slug}`,
    fetcher
  );

  useEffect(() => {
    if (isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
    return () => {
      NProgress.done();
    };
  }, [isLoading]);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <DetailSkeletonLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Alert
          message="Error"
          description="Failed to fetch movie details."
          type="error"
          showIcon
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Alert
          message="No Data"
          description="Movie details are unavailable."
          type="warning"
          showIcon
        />
      </div>
    );
  }

  const filmData = data?.movie as FilmData;
  const episodes = data?.episodes;

  console.log(JSON.stringify(episodes));

  const handleShare = () => {
    setIsModalVisible(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullURL);
      message.success("Link copied to clipboard!");
    } catch (error) {
      message.error("Failed to copy the link!");
    }
  };

  return (
    <div style={{ paddingBottom: 20 }}>
      {episodes[0].server_data.length >= 2 ? (
        <Image
          width={"100%"}
          height={400}
          style={{ objectFit: "cover" }}
          src={filmData.thumb_url}
        />
      ) : (
        <MoviePlayer linkEmbed={episodes[0].server_data[0].link_embed} />
      )}

      <Row>
        <Col xs={24} sm={12} md={12}>
          <Title level={2}>{filmData.name}</Title>
          <Title level={4}>{filmData.origin_name}</Title>
          <Title level={5} style={{ marginTop: 0 }}>
            {filmData.year} {filmData.chieurap ? "- Chiếu rạp" : null} -{" "}
            {filmData.time} - {filmData.quality}
          </Title>
          <Paragraph>{filmData.content}</Paragraph>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Row>
            <Col style={{ marginRight: 40 }}>
              <Title level={4}>
                <Tooltip title="Click to love">
                  {loved ? (
                    <Button
                      onClick={() => setLoved(!loved)}
                      type="link"
                      shape="circle"
                      icon={<HeartFilled />}
                    />
                  ) : (
                    <Button
                      onClick={() => setLoved(!loved)}
                      type="link"
                      shape="circle"
                      icon={<HeartOutlined />}
                    />
                  )}
                </Tooltip>{" "}
                Love
              </Title>
            </Col>
            <Col>
              <Title level={4}>
                <Tooltip title="Click to share">
                  <Button
                    type="link"
                    shape="circle"
                    icon={<ShareAltOutlined />}
                    onClick={handleShare}
                  />
                </Tooltip>{" "}
                Share
              </Title>
            </Col>
          </Row>
          <div>
            <Text strong>Actors:</Text>
            {filmData.actor.map((actor: any, index) => (
              <Text>
                {" "}
                {index !== 0 ? "," : null}
                {actor}
              </Text>
            ))}
          </div>
          <div>
            <Text strong>Directors:</Text>
            {filmData.director.map((director: any, index) => (
              <Text>
                {" "}
                {index !== 0 ? "," : null}
                {director}
              </Text>
            ))}
          </div>
          <div>
            <Text strong>Category:</Text>
            {filmData.category.map((category: any, index) => (
              <Text>
                {" "}
                {index !== 0 ? "," : null}
                {category.name}
              </Text>
            ))}
          </div>
          <div>
            <Text strong>Country:</Text>
            {filmData.country.map((country: any, index) => (
              <Text>
                {" "}
                {index !== 0 ? "," : null}
                {country.name}
              </Text>
            ))}
          </div>
        </Col>
      </Row>
      {episodes[0].server_data.length >= 2 && (
        <>
          <Title level={2}>Movie List</Title>
          <Row>
            {episodes[0].server_data.map((item: ServerData, index: number) => (
              <Col
                xs={6}
                sm={4}
                md={3}
                lg={2}
                key={index}
                style={{ marginBottom: 10 }}
              >
                <Tooltip title={`Click to open ${item.name}`}>
                  {" "}
                  <Button
                    onClick={() => window.open(`${item.link_embed}`, "_blank")}
                    type="primary"
                    shape="default"
                    size="large"
                  >
                    {item.name}
                  </Button>
                </Tooltip>
              </Col>
            ))}
          </Row>
        </>
      )}
      <Modal
        title="Share Movie"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <div>
          <Input value={fullURL} readOnly style={{ marginBottom: "10px" }} />
          <Button type="primary" onClick={handleCopy} block>
            Copy Link
          </Button>
        </div>
      </Modal>
    </div>
  );
}
