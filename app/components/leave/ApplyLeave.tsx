const ApplyLeave:React.FC =({

}) =>{
    return(
        <> This is Apply leave Page
        <form>
            <div className="grid grid-cols-6  gap-1">
                <div>
            <label
              className="block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="Leave type">
              Leave Type
            </label>
                <select>
                    <option>Casual</option>
                    <option>Optional</option>
                    <option>Special</option>
                </select>
                </div>
                <div>
            <label
              className="block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="Start Date">
              Start Date
            </label>
                <input name="Start Date" type="date"></input>
                </div>
                <div>
            <label
              className="block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="End Date">
              End Date
            </label>
                <input name="End Date" type="date"></input>
                </div>
                <div>
            <label
              className="block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor=" Leave Reason">
              Leave Reason
            </label>
                <input name="Reason" type="text"></input>
                </div>
                
                <div>
                <label
              className="block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor=" Leave Option">
              Duration
            </label>
                    <input type="checkbox" value="Half" name="Halfday" /> Half Day
                </div>
                <div className="col-span-1 content-around">
            <button
              className="flex-shrink-0 rounded border-4 border-teal-500 bg-teal-500 px-2 py-1 text-sm text-white hover:border-teal-700 hover:bg-teal-700"
              type="button">
              Apply Leave
            </button>
          </div>
            </div>
        </form>
        </>
    )
}

export default ApplyLeave;