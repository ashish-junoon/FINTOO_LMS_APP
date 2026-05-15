import { useEffect, useState } from "react";
import { cancelEmandateSalora, getMandateHistory } from "../../api/ApiFunction";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import Modal from './Modal';
import TextInput from "../fields/TextInput";
import { useAuth } from "../../context/AuthContext";

const MandateHistory = () => {
  const [historyData, setHistoryData] = useState(null);
  const [loading, setIsLoading] = useState(null);
  const [cancelMandate, setCancelMandate] = useState(null);

  const { adminUser } = useAuth();

  const location = useLocation();
  const lead_id = location?.state?.lead_id;
  const user_id = location?.state?.user_id

  const fetchMandateHistory = async () => {
    const req = { lead_id: lead_id };
    // const req = {lead_id : "JRE6453"} // To test Only

    try {
      setIsLoading(true);
      const response = await getMandateHistory(req);

      if (response.status) {
        setHistoryData(response?.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("An error occurred while fetching data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMandateHistory();
  }, []);

  const LowerCaseConvert = (value) => {
    return value?.toLowerCase().trim().replaceAll(" ", "");
  };

  // cancel mandate by salora
  const handleCancelMandate = async () => {
    console.log("mandate details: ", cancelMandate)
    try {
      const queryParams = {
        Customer_id: cancelMandate?.mandate_id,
        Token_id: cancelMandate?.transaction_id,
        comapny_id: import.meta.env.VITE_COMPANY_ID,
        product_name: import.meta.env.VITE_PRODUCT_NAME,
        user_id: user_id,
        lead_id: lead_id,
        created_by: adminUser.emp_code,
      }

      const res = await cancelEmandateSalora(queryParams);
      // console.log("res", res)
      if (res?.status === "SUCCESS") {
        toast.info("eMandate cancel request success");
      } else {
        toast.error(res?.message || "something went wrong cancelling eMandate")
      }
    } catch (error) {
      console.error("error in cancel mandate, ", error);
      toast.error("An error occurred while fetching data.");
    } finally {
      setCancelMandate(false);
    }
  }

  if (loading) {
    return <Loader />;
  }

  //   if (!historyData) {
  //     return <div className="text-center py-10">No data available</div>;
  //   }

  return (
    <>
      <div>
        <div>
          {historyData?.length > 0 ? (
            <div className="w-full mt-5 overflow-x-auto">
              <table className="min-w-max w-full border border-gray-300 bg-white shadow-md">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="border px-2 py-2 text-xs text-left">#</th>
                    <th className="border px-2 py-2 text-xs text-left">
                      Lead Id
                    </th>
                    <th className="border px-2 py-2 text-xs text-left">
                      Customer Name
                    </th>
                    <th className="border px-2 py-2 text-xs text-left">
                      Account Type
                    </th>
                    <th className="border px-2 py-2 text-xs text-left">
                      Bank Name
                    </th>
                    <th className="border px-2 py-2 text-xs text-left">
                      Account No.
                    </th>
                    <th className="border px-2 py-2 text-xs text-left">
                      IFSC Code
                    </th>
                    <th className="border px-2 py-2 text-xs text-left">
                      Mandate Id
                    </th>
                    <th className="border px-2 py-2 text-xs text-left">
                      Transaction Id
                    </th>
                    {/* <th className="border px-2 py-2 text-xs text-left">
                      Mandate Status
                    </th> */}
                    <th className="border px-2 py-2 text-xs text-left">
                      Status
                    </th>
                    <th className="border px-2 py-2 text-xs text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {historyData?.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="border px-2 py-1 text-xs">{index + 1}</td>
                      <td className="border px-2 py-1 text-xs">
                        {item?.lead_id}
                      </td>
                      <td className="border px-2 py-1 text-xs">
                        {item?.customer_name}
                      </td>
                      <td className="border px-2 py-1 text-xs">
                        {item?.account_type === 1 ? "Primary" : "Secondary"}
                      </td>
                      <td className="border px-2 py-1 text-xs">
                        {item?.bank_name}
                      </td>
                      <td className="border px-2 py-1 text-xs">
                        {item?.customer_account_number}
                      </td>
                      <td className="border px-2 py-1 text-xs">
                        {item?.customer_ifsc}
                      </td>
                      <td className="border px-2 py-1 text-xs">
                        {item?.mandate_id}
                      </td>
                      <td className="border px-2 py-1 text-xs">
                        {item?.transaction_id}
                      </td>
                      {/* <td className="border px-2 py-1 text-xs">
                        <p
                          className={`${item?.is_e_nach_created ? "bg-success/40" : "bg-amber-200"} py-1 px-5 w-fit uppercase rounded-3xl font-semibold text-black m-auto`}
                        >
                          {item?.is_e_nach_created ? "True" : "False"}
                        </p>
                      </td> */}
                      <td className="border px-2 py-1 text-[10px]">
                        {/* <p className={`bg-green-300 py-1 px-5 w-fit uppercase rounded-3xl font-semibold text-black m-auto${
                            (LowerCaseConvert(item?.status) === "pending" && "bg-amber-100 text-amber-500") ||
                            (LowerCaseConvert(item?.status) === "initiate" && "bg-blue-100 text-blue-500") ||
                            (LowerCaseConvert(item?.status) === "pending" && "bg-success/20 text-success") ||
                            (LowerCaseConvert(item?.status) === "bounced" && "bg-success/20 text-success")
                            }`}> */}
                        <p
                          className={`bg-gray-300 py-1 px-5 w-fit uppercase rounded-3xl font-semibold text-black m-auto`}
                        >
                          {item?.status}
                        </p>
                      </td>
                      <td className="border px-2 py-1 text-xs">
                        <button
                          onClick={() => setCancelMandate(item)}
                          className="text-red-600 font-bold w-full"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-full mt-5 overflow-x-auto">
              <h1 className="text-center">No History Found</h1>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={!!cancelMandate} onClose={() => setCancelMandate(null)}>
        <div className="py-6 border border-gray-200 rounded flex flex-col items-center justify-center">
          {true && (
            <div className="flex flex-col justify-center">
              <h2 className="text-lg font-semibold italic text-amber-500">
                Are you sure to cancel the mandate?
              </h2>
              <div>

              </div>

              <h6 className="text-base font-semibold text-gray-800 my-2 border-b max-w-32">
                Mandate Details
              </h6>

              <div className="bg-white mb-4">
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">

                  <div className="text-gray-500">Customer Name</div>
                  <div className="text-gray-800 font-medium">
                    {cancelMandate?.customer_name || "-"}
                  </div>

                  <div className="text-gray-500">Bank Name</div>
                  <div className="text-gray-800 font-medium">
                    {cancelMandate?.bank_name || "-"}
                  </div>

                  <div className="text-gray-500">Account Type</div>
                  <div className="text-gray-800 font-medium">
                    {cancelMandate?.account_type === 1 ? "Primary" : "Secondary"}
                  </div>

                  <div className="text-gray-500">Current Status</div>
                  <div className="text-gray-800 font-medium">
                    {cancelMandate?.status || "-"}
                  </div>

                </div>
              </div>

              <h6 className=" text-xs text-gray-500 mt-2">
                This action will cancel the existing eMandate.
              </h6>

              <div className="grid grid-cols-2 gap-3 my-2">
                <button
                  className="px-8 mt-4 shadow-md text-primary border border-primary hover:bg-primary hover:text-white text-xs w-full font-bold py-2 rounded"
                  onClick={handleCancelMandate}
                >
                  Yes
                </button>
                <button
                  className="px-8 mt-4 shadow-md text-primary border border-primary hover:bg-primary hover:text-white text-xs w-full font-bold py-2 rounded"
                  onClick={() => setCancelMandate(false)}
                >
                  No
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default MandateHistory;
