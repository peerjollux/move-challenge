"use client";
import { ComponentProps } from "react";
import styled from "styled-components";

type props = Omit<ComponentProps<"input">, "type"> & {
  type?: "text" | "email" | "number" | "password" | "search" | "tel" | "url";
};

export const TextInput = styled.input<props>`
  padding: 12px 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1),
    0px 0px 1px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  background-color: #fff;
  font-size: 14px;

  &:focus {
    outline: 2px solid #000;
  }

  &::placeholder {
    color: #aaa;
  }

  &[aria-invalid="true"] {
    outline: 2px solid red;
`;
