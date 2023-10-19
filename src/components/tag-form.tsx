import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { TextInput } from "./text-input";
import { PlusIcon } from "@heroicons/react/20/solid";
import { TAG_MAX_LENGTH, TAG_MIN_LENGTH, validateTag } from "@/lib/validation";

const Form = styled.form`
  position: relative;
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  padding-left: 0;
`;

const Button = styled.button`
  display: inline-flex;
  padding: 6px;
  align-items: center;
  border-radius: 50%;
  color: #fff;
  background: #5162ff;

  &:hover {
    background-color: #6675ff;
  }

  &:focus {
    outline: 2px solid #000;
  }
`;

export function TagForm({ onSubmit }: { onSubmit: (value: string) => void }) {
  const [invalid, setInvalid] = useState(false);
  const [value, setValue] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valid = validateTag(value);
    if (!valid) {
      setInvalid(true);
      return;
    }
    setValue("");
    onSubmit(value);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (invalid) {
      setInvalid(false);
    }
    setValue(event.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextInput
        value={value}
        placeholder="Add new tag..."
        type="text"
        minLength={TAG_MIN_LENGTH}
        maxLength={TAG_MAX_LENGTH}
        onChange={onChange}
        style={{ width: 240 }}
        role="textbox"
        aria-invalid={invalid}
        autoFocus
      />
      <ButtonContainer>
        <Button type="submit" aria-label="Add tag">
          <PlusIcon width={12} />
        </Button>
      </ButtonContainer>
    </Form>
  );
}
