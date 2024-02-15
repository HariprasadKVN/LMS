'use client'
import Calendar from "@/components/Calendar";
import Associate from "@/components/associate";

import Image from "next/image";
const onte=(date:Date)=>{

}
const Day: React.FC<{ children: Date }> =
  ({ children }) => {
    return <div className="rounded-full hover:bg-blue-300 w-10 h-10 flex items-center justify-center">
      <p className="text-center" onMouseOver={()=>{
        onte(new Date());
      }}>{children.toLocaleDateString('en-IN', { day: 'numeric' })}</p>
    </div>
  }

export default function Home() {
  const date: Date = new Date();
  const dates: Date[] = [];
  let text: string = '';

  for (let index = 0; index < 41; index++) {
    const tempDate = new Date(date);
    tempDate.setDate(tempDate.getDate() + index);
    dates.push(tempDate);
  }


  return (
    <>
      <Calendar></Calendar>
      {/* <div className="flex flex-row">
        <div>
          test
        </div>
        <div className="grid grid-cols-7 w-auto">
          {dates.map((item, key) => <Day key={key} >{item}</Day>)}
          <Day>{new Date()}</Day>
        </div>
      </div>
      <div>
        {text}
      </div> */}
    </>
  );
}
