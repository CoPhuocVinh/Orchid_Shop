"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function Fillter_Auction_Date({
  onChangeDate,
}: {
  onChangeDate: (dates: { startDate: String; endDate: String }[]) => void;
}) {
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [endDateSelected, setEndDateSelected] = React.useState<boolean>(false);

  const handleChangeDate = (type: string, value: Date) => {
    if (type === "start") {
      setStartDate(value);
    } else if (type === "end") {
      setEndDate(value);
      setEndDateSelected(true); // Đánh dấu là endDate đã được chọn
    }
  };

  const handleDateFilterClick = (e: any) => {
    e.preventDefault();
    if (startDate && endDate) {
      onChangeDate([
        {
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
        },
      ]);
    }
  };
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div className="flex mt-3">
        <div className="w-1/2 pr-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
                onChange={() => handleChangeDate("start", new Date())}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? (
                  format(startDate, "PPP")
                ) : (
                  <span>Pick Start Date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => handleChangeDate("start", date as Date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="w-1/2 pl-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
                onChange={() => handleChangeDate("end", new Date())}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>Pick End Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={(date) => handleChangeDate("end", date as Date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex-row mt-5 justify-center text-center ">
        <div className="w-full h-[50px]">
          <Button
            className="w-[140px] h-[40px] shadow-2xl
           bg-blue-300 outline outline-offset-2 outline-1
            outline-sky-600 hover:scale-[1.03] hover:outline-none
             duration-300 active:scale-[0.99]"
            onClick={handleDateFilterClick}
          >
            Date Filter
          </Button>
        </div>
      </div>
    </>
  );
}

export default Fillter_Auction_Date;
