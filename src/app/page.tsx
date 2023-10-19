"use client";
import React, { useEffect } from "react";
import { Tag } from "@/components/tag";
import { TagForm } from "@/components/tag-form";
import { getTags } from "@/data/api";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 24px;
`;

const TagList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  width: 240px;
`;

export default function Home() {
  const [loading, setLoading] = React.useState(false);
  const [tags, setTags] = React.useState<string[]>([]);

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    setLoading(true);
    const { tags } = await getTags();
    setTags(tags);
    setLoading(false);
  };

  const addTag = (value: string) => {
    setTags([...tags, value]);
  };

  const updateTag = (index: number, value: string) => {
    setTags((tags) => {
      const newTags = [...tags];
      newTags[index] = value;
      return newTags;
    });
  };

  const deleteTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <Container>
      <TagForm onSubmit={addTag} />
      {loading ? (
        <p>Loading your tags...</p>
      ) : (
        <TagList>
          {tags.map((tag, index) => (
            <li key={index}>
              <Tag
                value={tag}
                onValueChange={(newValue) => updateTag(index, newValue)}
                onDelete={() => deleteTag(index)}
              />
            </li>
          ))}
        </TagList>
      )}
    </Container>
  );
}
