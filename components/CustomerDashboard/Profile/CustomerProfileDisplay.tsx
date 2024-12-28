import React from "react";
import {
  Card,
  Descriptions,
  Row,
  Col,
  Typography,
  Space,
  Alert,
  Divider,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const CustomerProfileDisplay = ({ order }: any) => {
  if (!order) {
    return (
      <Row justify="center" style={{ marginTop: 50 }}>
        <Col span={16}>
          <Alert
            message="No Order Data"
            description="We couldn't find any order information for this customer."
            type="info"
            showIcon
          />
        </Col>
      </Row>
    );
  }

  const {
    billing,
    shipping,
    total,
    currency_symbol,
    status,
    payment_method_title,
    date_created,
    payment_url,
  } = order;

  return (
    <Row justify="center" style={{ marginTop: 50 }}>
      <Col xs={22} sm={20} md={18} lg={16}>
        <Card
          bordered={false}
          style={{
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
            background: "linear-gradient(135deg, #ffffff, #f9f9ff)",
          }}
        >
          <div className="w-24 h-24 flex justify-center items-center lg:w-28 lg:h-28 rounded-full uppercase border border-templatePrimaryLight m-auto mb-5 text-4xl font-bold bg-templatePrimary text-white">
            {`${billing.first_name.slice(0, 1)}${billing.last_name.slice(
              0,
              1
            )}`}
          </div>

          <Space direction="vertical" size={30} style={{ width: "100%" }}>
            <Descriptions
              bordered
              size="middle"
              column={1}
              labelStyle={{ fontWeight: 600, color: "#555" }}
              contentStyle={{ fontSize: "16px", color: "#333" }}
            >
              <Descriptions.Item
                label={
                  <>
                    <UserOutlined /> Name
                  </>
                }
              >
                <Text
                  strong
                >{`${billing.first_name} ${billing.last_name}`}</Text>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <MailOutlined /> Email
                  </>
                }
              >
                <Text>{billing.email}</Text>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <PhoneOutlined /> Phone
                  </>
                }
              >
                <Text>{billing.phone}</Text>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <HomeOutlined /> Billing Address
                  </>
                }
              >
                <Text>
                  {billing.address_1},{" "}
                  {billing.address_2 && `${billing.address_2}, `}
                  {billing.city}, {billing.state}, {billing.country} -{" "}
                  {billing.postcode}
                </Text>
              </Descriptions.Item>
            </Descriptions>

            <Divider />
          </Space>
        </Card>
      </Col>
    </Row>
  );
};

export default CustomerProfileDisplay;
