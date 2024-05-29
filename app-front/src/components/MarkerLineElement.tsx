"use client";

import { useState } from "react";
import { Input } from "@nextui-org/react";
import {
  EditIcon,
  CloseIcon,
  CheckIcon,
  DeleteIcon,
  MyLocationIcon,
  IconButton,
} from "./shared";
import type { MarkerItem } from "@/types";
import type { MarkerPatchRequestData } from "@/store";

interface Props extends Pick<MarkerItem, "description" | "id"> {
  deleteHandler: () => Promise<void>;
  updateHandler: (data: Omit<MarkerPatchRequestData, "id">) => Promise<void>;
  centreHandler: () => void;
}

export function MarkerLineElement({
  id,
  description,
  deleteHandler,
  updateHandler,
  centreHandler,
}: Props) {
  const [editMode, setEditMode] = useState(false);
  const [descriptionState, setDescriptionState] = useState<string>("");

  return (
    <div className="flex items-center gap-2">
      <IconButton onClick={centreHandler}>
        <MyLocationIcon />
      </IconButton>
      {editMode ? (
        <>
          <Input
            label=""
            placeholder="marker name"
            value={descriptionState}
            onChange={(e) => {
              setDescriptionState(e.target.value);
            }}
          />
          <IconButton
            onClick={async () => {
              await updateHandler({
                description: descriptionState,
              });
              setEditMode(false);
              setDescriptionState("");
            }}
          >
            <CheckIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setDescriptionState("");
              setEditMode(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </>
      ) : (
        <>
          <p className="w-full">
            <strong>
              {id}
              {": "}
            </strong>
            {description}
          </p>
          <IconButton
            onClick={() => {
              setDescriptionState(description);
              setEditMode(true);
            }}
          >
            <EditIcon />
          </IconButton>
        </>
      )}
      <IconButton onClick={deleteHandler}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
