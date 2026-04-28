
const HoldAction = ({setisOnHold, isOnHold}) => {
  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={() => setisOnHold(false)}
          className={`text-base font-semibold ${
            !isOnHold ? "bg-blue-900" : "bg-blue-300"
          } text-white px-2 sm:px-5 py-1 rounded-md shadow-lg flex items-center gap-1 w-fit`}
        >
          UnHold Leads
        </button>

        <button
          onClick={() => setisOnHold(true)}
          className={`text-base font-semibold ${
            isOnHold ? "bg-blue-900" : "bg-blue-300"
          } text-white px-2 sm:px-5 py-1 rounded-md shadow-lg flex items-center gap-1 w-fit`}
        >
          Hold Leads
        </button>
      </div>
    </>
  )
}

export default HoldAction
