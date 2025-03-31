 
 
'use client'

import { employees } from "@/data/employees";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import React, { useState } from "react";

export default function CustomTable() {
  const columnNames = employees?.length ? Object.keys(employees[0]).filter(key => key !== 'id') : []
  const [count, setCount] = useState<number>(1)

  // useEffect(() => {
  //   console.log(count)
  //   console.log(columnNames.length)
  // }, [count])

  return (
    <table className="table-fixed border-x border-t border-[#EFEFEF] w-full">
      <thead>
        <tr className="border-b border-[#EFEFEF]">
          <th className="w-1/3 p-2 text-xs text-left text-muted-foreground select-none">{columnNames[count - 1]}</th>
          <th className="w-1/3 p-2 text-xs text-left text-muted-foreground select-none">{columnNames[count]}</th>

          <th className="w-1/3 p-2">
            <div className="flex gap-2 justify-end">
              <span className="flex w-6 h-6 bg-[#F5F7F9] rounded-full items-center justify-center cursor-pointer">
                <ChevronLeft className={`${count === 1 ? 'opacity-20' : 'opacity-100'} size-4`} onClick={() => {
                  if (count > 1) setCount(count - 1);
                }} />
              </span>
              
              <span className="flex w-6 h-6 bg-[#F5F7F9] rounded-full items-center justify-center cursor-pointer">
                <ChevronRight className={`${count < columnNames.length - 1 ? 'opacity-100' : 'opacity-20'} size-4`} onClick={() => {
                  if (count < columnNames.length - 1) setCount(count + 1);
                }} />
              </span>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
      {employees.map((e, i) => {
        return(
          <tr className="border-b border-[#EFEFEF]" key={i}>
            <td className="p-2 text-xs text-left text-muted-foreground select-none">{e[columnNames[count - 1] as keyof typeof e]}</td>
            <td className="p-2 text-xs text-left text-muted-foreground select-none">{e[columnNames[count] as keyof typeof e]}</td>
            <td className="flex justify-end">
              <span className="border border-[#EFEFEF] p-2 rounded-sm m-2 hover:bg-[#F3F4F6] cursor-pointer">
                <Eye className="size-4" />
              </span>
            </td>
          </tr>
        )
      })}
      </tbody>
    </table>
  );
}
