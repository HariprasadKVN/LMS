import { useState } from "react";
import { boolean, string } from "zod";

const LeaveList: React.FC = ({}) => {
  const [show, setShow] = useState<{[key:string]:boolean}>({});

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
    const x = {...show,[leaveType]:!show[leaveType]};
    //x.splice(index, 1, !show[index]);
    setShow(x);
    console.log(x);
  };

  return (
    <>
      {mockData.map((item, index) => (
        <div className="rounded-lg border border-blue-700" key={index}>
          <div className=" font-thick rounded-lg bg-blue-300 p-2 text-xl">
            {item.type}
            <button onClick={() => ExpandWindow(item.type)}>+</button>
            <div className="text-sm">
              {" "}
              Alloted-{item.Allotted} Utilized-{item.Utilized} Balance-
              {item.Balance}{" "}
            </div>
          </div>
          {show[item.type] && (
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
                  {item.details?.map((detail, index) => (
                    <tr key={index}>
                      <td>{detail.StartDate}</td>
                      <td>{detail.EndDate}</td>
                      <td>{detail.Day}</td>
                      <td>{detail.Reason}</td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
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
