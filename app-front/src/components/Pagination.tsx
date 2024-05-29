"use client";

import { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { useMarkersStore } from "@/store";
import { IconButton, LeftIcon, RightIcon } from "@/components";

export const limits = [1, 3, 5] as const;
type Limit = (typeof limits)[number];

export function Pagination() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState<Limit>(3);
  const [paginateStr, setPaginateStr] = useState("");
  const { total, loading, getMarkers, markers } = useMarkersStore();

  const [allowedLeftPagination, setAllowedLeftPagination] = useState(false);
  const [allowedRightPagination, setAllowedRightPagination] = useState(false);

  useEffect(() => {
    setAllowedLeftPagination(offset > 0);
  }, [offset]);

  useEffect(() => {
    setAllowedRightPagination(offset + limit < total);
    setPaginateStr(`${offset / limit + 1} / ${Math.ceil(total / limit)}`);
  }, [offset, limit, total]);

  const increaseOffset = () => {
    setOffset((pre) => pre + limit);
  };

  const decreaseOffset = () => {
    setOffset((pre) => (pre - limit < 0 ? 0 : pre - limit));
  };

  useEffect(() => {
    (async () => {
      await getMarkers({
        offset: String(offset),
        limit: String(limit),
      });
    })();
  }, [offset, limit, getMarkers]);

  return (
    <div className="flex justify-evenly">
      {total && markers.length ? (
        <>
          <Select
            label="Select limit"
            className="max-w-[150px]"
            selectedKeys={[String(limit)]}
            onChange={(e) => {
              setOffset(0);
              setLimit(Number(e.target.value) as Limit);
            }}
          >
            {limits.map((limitItem) => (
              <SelectItem key={limitItem}>{String(limitItem)}</SelectItem>
            ))}
          </Select>
          <div className="flex items-center">
            <span className="pr-2">pages:</span>
            <IconButton
              disabled={loading || !allowedLeftPagination}
              onClick={decreaseOffset}
            >
              <LeftIcon />
            </IconButton>
            <span className="px-2">{paginateStr}</span>
            <IconButton
              disabled={loading || !allowedRightPagination}
              onClick={increaseOffset}
            >
              <RightIcon />
            </IconButton>
          </div>
        </>
      ) : <p>empty db</p>}
    </div>
  );
}
