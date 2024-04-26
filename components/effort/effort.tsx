const Effort:React.FC = () =>{
return (<>
<div className="flex flex-row">
  <div className="basis-1/4 bg-blue-300">01</div>
  <div className="basis-1/4 bg-blue-600">02</div>
  <div className="basis-1/2 bg-blue-900">03</div>
</div>
<table>
    <thead>
        <tr>
            <td>Task</td>
            <td>Mon</td>
            <td>Tue</td>
            <td>Wed</td>
            <td>Thu</td>
            <td>Fri</td>
            <td>Sat</td>
            <td>Sun</td>
            <td>Done</td>
            <td>Total</td>
        </tr>
    </thead>
    <tbody>
        <tr></tr>
    </tbody>
    <tfoot>
        <tr>

        </tr>
    </tfoot>
</table>
</>)

}

export default Effort;