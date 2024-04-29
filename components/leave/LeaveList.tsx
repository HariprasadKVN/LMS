import { useState } from "react";
import { boolean, string } from "zod";
import UCCard from "../ui/card";
import UCTable from "../ui/table/table";
import UCTableHeader from "../ui/table/thead";
import UCTableRow from "../ui/table/tr";
import UCTableHeaderCell from "../ui/table/th";
import UCTableBody from "../ui/table/tbody";
import UCTableCell from "../ui/table/td";

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
          <UCTable >
            <UCTableHeader >
              <UCTableRow >
                <UCTableHeaderCell >Start Date</UCTableHeaderCell>
                <UCTableHeaderCell >End Date</UCTableHeaderCell>
                <UCTableHeaderCell >Day</UCTableHeaderCell>
                <UCTableHeaderCell >Reason</UCTableHeaderCell>
                <UCTableHeaderCell >Cancel</UCTableHeaderCell>
              </UCTableRow>
            </UCTableHeader>
            <UCTableBody >
              {item.details?.map((detail, index) => (
                <UCTableRow key={index}>
                  <UCTableCell >{detail.StartDate}</UCTableCell>
                  <UCTableCell >{detail.EndDate}</UCTableCell>
                  <UCTableCell >{detail.Day}</UCTableCell>
                  <UCTableCell >{detail.Reason}</UCTableCell>
                  <UCTableCell >s</UCTableCell>
                </UCTableRow>
              ))}
            </UCTableBody>
          </UCTable>
        </UCCard>
      ))}
      
    </>
  );
};

export default LeaveList;
