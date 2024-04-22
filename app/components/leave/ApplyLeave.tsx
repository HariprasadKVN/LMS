import Checkbox from "../UI/checkbox";
import Date from "../UI/date";
import Select from "../UI/select";
import Input from "../input";

const ApplyLeave: React.FC = ({

}) => {
  return (
    <>
      <div className="p-2">
        <form>
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-row items-center">
              <div>
                {/* <label
                  className="block text-xs font-bold uppercase tracking-wide text-gray-700/80 pl-1"
                  htmlFor="Leave type">
                  Leave Type
                </label>
                <select className = "dark:bg-inherit border border-slate-400/50 rounded-md px-2 py-1">
                  <option>Casual</option>
                  <option>Optional</option>
                  <option>Special</option>
                </select> */}
                <Select name="Leave Type" options={['Casual', 'Optional']}></Select>
              </div>

              <div>                
                <Date name="Start Date"/>
              </div>

              <div>                
                <Date name="End Date"></Date>
              </div>

              <div>                
                <Checkbox value="Half" name="Halfday" caption="Duration" /> Half Day
              </div>
            </div>
            <div className="flex flex-row">
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-wide text-gray-700"
                  htmlFor=" Leave Reason">
                  Leave Reason
                </label>
                <input name="Reason" type="text"></input>
              </div>
              <div className="col-span-1 content-around">
                <button
                  className="flex-shrink-0 rounded border-4 border-teal-500 bg-teal-500 px-2 py-1 text-sm text-white hover:border-teal-700 hover:bg-teal-700"
                  type="button">
                  Apply Leave
                </button>
              </div>

            </div>

          </div>
        </form>
      </div>
    </>
  )
}

export default ApplyLeave;