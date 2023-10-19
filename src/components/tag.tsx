"use client";
import React, { FormEvent, useRef } from "react";
import { PencilIcon, XMarkIcon } from "@heroicons/react/20/solid";
import styled from "styled-components";
import { TAG_MAX_LENGTH, TAG_MIN_LENGTH, validateTag } from "@/lib/validation";

const Wrapper = styled.div`
  display: flex;
  padding: 4px;
  align-items: center;
  border-radius: 8px;
  background: #5162ff;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.06),
    0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 0px 1px 0px rgba(0, 0, 0, 0.05);
  color: white;
  font-size: 14px;
  width: 100%;
  height: 40px;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 14px;
  padding: 6px 8px;
  border-radius: 4px;
  line-height: 20px;
  color: #fff;
  width: auto;
  background-color: #6675ff;

  &:focus {
    color: #000;
    background-color: #fff;
  }
`;

const Button = styled.button`
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  color: #fff;

  &:hover {
    background-color: #6675ff;
  }

  &:focus {
    outline: 2px solid #fff;
  }
`;

const Value = styled.span`
  padding: 4px 8px;
  line-height: 20px;
  color: #fff;
  flex: 1;
`;

type TagProps = {
  value: string;
  onValueChange: (value: string) => void;
  onDelete: () => void;
};

export function Tag({ value, onDelete, onValueChange }: TagProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);

  React.useEffect(() => {
    if (editing) {
      ref.current?.focus();
    }
  }, [editing]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setEditing(false);
    }
  };

  const onEdit = () => {
    setInputValue(value);
    setEditing(true);
  };

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    setEditing(false);

    const hasChanged = inputValue !== value;
    if (!hasChanged) {
      return;
    }

    const valid = validateTag(inputValue);
    if (!valid) {
      setInputValue(value);
      return;
    }
    onValueChange(inputValue);
  };

  return (
    <Wrapper>
      <div style={{ flex: 1 }}>
        {editing ? (
          <form onSubmit={onFormSubmit} onBlur={onFormSubmit}>
            <Input
              name="Tag name"
              ref={ref}
              value={inputValue}
              role="textbox"
              onKeyDown={onKeyDown}
              onChange={onChange}
              minLength={TAG_MIN_LENGTH}
              maxLength={TAG_MAX_LENGTH}
            />
          </form>
        ) : (
          <Value>{value}</Value>
        )}
      </div>

      <Button type="button" aria-label="Edit tag" onClick={onEdit}>
        <PencilIcon width={16} height={16} />
      </Button>
      <Button type="button" aria-label="Delete tag" onClick={onDelete}>
        <XMarkIcon width={16} height={16} />
      </Button>
    </Wrapper>
  );
}
