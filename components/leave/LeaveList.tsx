import { useState } from "react";
import { boolean, string } from "zod";
import UCCard from "../ui/card";

const LeaveList: React.FC = ({ }) => {
  const [show, setShow] = useState<{ [key: string]: boolean }>({});

  const mockData = [
    {
      type: "Casual",
      Allotted: "10",
      Utilized: "6",
      Balance: "4",
      details: [
        {
          StartDate: "01/04/2024",
          EndDate: "06/04/2024",
          Day: "3",
          Reason: "Vacation1",
        },
        {
          StartDate: "01/04/2024",
          EndDate: "05/04/2024",
          Day: "3",
          Reason: "Vacation",
        },
      ],
    },
    { type: "Optional", Allotted: "6", Utilized: "2", Balance: "4" },
    { type: "Special", Allotted: "1", Utilized: "0", Balance: "1" },

    // [{StartDate:"01/04/2024", EndDate:"05/04/2024", Day:"3", Reason:"Vacation"},
    // {StartDate:"01/04/2024", EndDate:"05/04/2024", Day:"3", Reason:"Vacation"}
  ];

  const ExpandWindow = (leaveType: string) => {
    const x = { ...show, [leaveType]: !show[leaveType] };
    //x.splice(index, 1, !show[index]);
    setShow(x);
    console.log(x);
  };

  return (
    <>
      {mockData.map((item, index) => (
        <UCCard key={index} title={item.type} subTitle={`Alloted-${item.Allotted} Utilized-${item.Utilized} Balance-${item.Balance}`}>
          <table className="table-auto divide-y divide-slate-500 rounded dark:bg-slate-50 w-full">
            <thead className="rounded dark:bg-teal-500/60">
              <tr className="text-left">
                <th className="px-4 py-2 text-left text-xs font-medium titlecase tracking-wider text-gray-900">Start Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium titlecase tracking-wider text-gray-900">End Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium titlecase tracking-wider text-gray-900">Day</th>
                <th className="px-4 py-2 text-left text-xs font-medium titlecase tracking-wider text-gray-900">Reason</th>
                <th className="px-4 py-2 text-left text-xs font-medium titlecase tracking-wider text-gray-900">Cancel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300 ">
              {item.details?.map((detail, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-2 py-1 text-sm text-gray-500">{detail.StartDate}</td>
                  <td className="whitespace-nowrap px-2 py-1 text-sm text-gray-500">{detail.EndDate}</td>
                  <td className="whitespace-nowrap px-2 py-1 text-sm text-gray-500">{detail.Day}</td>
                  <td className="whitespace-nowrap px-2 py-1 text-sm text-gray-500">{detail.Reason}</td>
                  <td className="whitespace-nowrap px-2 py-1 text-sm text-gray-500"></td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <div className="rounded-lg border border-blue-700" key={index}>
            <div className=" font-thick rounded-lg bg-blue-300 p-2 text-xl">
              {item.type}
              <button onClick={() => ExpandWindow(item.type)}>+</button>
              <div className="text-sm">
                Alloted-{item.Allotted} Utilized-{item.Utilized} Balance-
                {item.Balance}
              </div>
            </div>
            {show[item.type] && (
              <div className="ml-4">
                
              </div>
            )}
          </div> */}
        </UCCard>
      ))}
      {/* <div className="border rounded-lg">
        <div className="m-2 bg-blue-300 font-thick text-xl">
                Optional: Alloted - 6 Utilized-2 Balance-4 
            </div>
            <div className="ml-4">
            <table className="w-full">
                            <thead>
                                <tr className="text-left">
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Day</th>
                                    <th>Reason</th>
                                    <th>Cancel</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>25/04/2024</td>
                                    <td>30/04/2024</td>
                                    <td>3</td>
                                    <td>Vacation</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>27/04/2024</td>
                                    <td>30/04/2024</td>
                                    <td>2</td>
                                    <td>Vacation</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
            </div>
        </div> */}
    </>
  );
};

export default LeaveList;
