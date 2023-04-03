import React from "react";
import styled from "styled-components";

export default function Widget({ data }) {
  return (
    <div className="styled-widget d-flex align-items-center gap-3">
      <Icon className="icon " color={data.color} bgColor={data.bgColor}>
        {data.icon}
      </Icon>
      <Text className="text">
        <p className="mb-2 fw-bold">
          {data.isMoney
            ? "$" + data.digits?.toLocaleString()
            : data.digits?.toLocaleString()}
        </p>
        <p className="text-light ">{data.title}</p>
      </Text>
      <Percentage>
        {data.percentage < 0 ? (
          <p className="text-danger fs-5">{Math.floor(data.percentage) + "%"}</p>
        ) : (
          <p className="text-success fs-5">{Math.floor(data.percentage) + "%"}</p>
        )}
      </Percentage>
    </div>
  );
}

const Icon = styled.div`
  margin-right: 0.5rem;
  padding: 0.5rem;
  color: ${({ color }) => color};
  background: ${({ bgColor }) => bgColor};
  border-radius: 3px;
  font-size: 20px;
`;

const Text = styled.div``;

const Percentage = styled.div``;
