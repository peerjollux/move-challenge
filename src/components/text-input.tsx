"use client";
import { ComponentProps } from "react";
import styled from "styled-components";

type props = Omit<ComponentProps<"input">, "type"> & {
  type?: "text" | "email" | "number" | "password" | "search" | "tel" | "url";
};

export const TextInput = styled.input<props>`
  border: 1px solid #ccc;
`;
