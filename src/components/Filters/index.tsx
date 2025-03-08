"use client";
import React, { useEffect } from "react";
import { useAppStore } from "@/store/app-store-provider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryState } from "nuqs";

const Filters = () => {
  const {
    selectedGender,
    setSelectedGender,
    setSelectedStatus,
    selectedStatus,
  } = useAppStore((state) => state);

  const [status, setStatus] = useQueryState("status");
  const [gender, setGender] = useQueryState("gender");

  useEffect(() => {
    if (status) {
      setSelectedStatus(status);
    }
    if (gender) {
      setSelectedGender(gender);
    }
  }, [status, gender]);

  const availableGenders = [
    {
      value: "all",
      label: "All",
    },
    {
      value: "male",
      label: "Male",
    },
    {
      value: "genderless",
      label: "Genderless",
    },
    {
      value: "unknown",
      label: "unknown",
    },
  ];

  const availableStatuses = [
    {
      value: "all",
      label: "All",
    },
    {
      value: "alive",
      label: "Alive",
    },
    {
      value: "dead",
      label: "Dead",
    },
    {
      value: "unknown",
      label: "unknown",
    },
  ];
  return (
    <div className="flex w-full flex-row justify-end">
      <div className="flex flex-row items-center gap-8">
        <div className="flex flex-row items-center">
          <label className="mr-2">Gender: </label>
          <Select
            onValueChange={(value: string) => {
              setSelectedGender(value);
              setGender(value);
            }}
            value={selectedGender}
          >
            <SelectTrigger className="min-w-[140px]">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {availableGenders.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-row items-center">
          <label className="mr-2">Status: </label>
          <Select
            onValueChange={(value) => {
              setSelectedStatus(value);
              setStatus(value);
            }}
            value={selectedStatus}
          >
            <SelectTrigger className="min-w-[120px]">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {availableStatuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
