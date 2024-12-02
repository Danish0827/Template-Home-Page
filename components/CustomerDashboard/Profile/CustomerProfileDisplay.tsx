import React from "react";
import { Card, Descriptions, Row, Col, Typography, Space, Alert } from "antd";

const { Title } = Typography;

const CustomerProfileDisplay = ({ order }:any) => {
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
      <Col span={20}>
        <Card
          bordered={false}
          style={{
            borderRadius: 8,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Title level={3} style={{ marginBottom: 20, textAlign: "center" }}>
            Customer Profile
          </Title>
          <Space direction="vertical" size={20} style={{ width: "100%" }}>
            <Descriptions
              bordered
              column={1}
              labelStyle={{ fontWeight: 600 }}
              size="middle"
            >
              <Descriptions.Item label="Name" className="capitalize" labelStyle={{ fontWeight: 900 }}>
                {billing.first_name} {billing.last_name}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {billing.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {billing.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Billing Address">
                {billing.address_1}, {billing.address_2}, {billing.city},{" "}
                {billing.state}, {billing.country} - {billing.postcode}
              </Descriptions.Item>
              {/* <Descriptions.Item label="Shipping Address">
                {shipping.first_name} {shipping.last_name}, {shipping.address_1}
                , {shipping.address_2}, {shipping.city}, {shipping.state},{" "}
                {shipping.country} - {shipping.postcode}
              </Descriptions.Item> */}
            </Descriptions>

            {/* <Card title="Order Details" size="small">
              <Descriptions
                bordered
                column={1}
                labelStyle={{ fontWeight: 600 }}
                size="middle"
              >
                <Descriptions.Item label="Order Status">
                  {status}
                </Descriptions.Item>
                <Descriptions.Item label="Payment Method">
                  {payment_method_title}
                </Descriptions.Item>
                <Descriptions.Item label="Order Total">
                  {currency_symbol} {total}
                </Descriptions.Item>
                <Descriptions.Item label="Order Date">
                  {new Date(date_created).toLocaleString()}
                </Descriptions.Item>
                <Descriptions.Item label="Payment URL">
                  <a
                    href={payment_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Complete Payment
                  </a>
                </Descriptions.Item>
              </Descriptions>
            </Card> */}
          </Space>
        </Card>
      </Col>
    </Row>
  );
};

export default CustomerProfileDisplay;
