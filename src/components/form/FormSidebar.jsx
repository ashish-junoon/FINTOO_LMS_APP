import { useEffect, useState } from "react";
import { useGetDocument } from "../../context/GetDocument"
import Loader from "../utils/Loader";

function FormSidebar() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);



    const { documents } = useGetDocument();
    return (
        <>
            {documents?.aadhaar_pan?.[0]?.pancard_data_url && !loading && (
                <div className="mb-5">
                    <span className="font-semibold bg-slate-200 px-5 py-1">PAN Card</span>
                    <div className="max-h-90">
                        <img src={documents.aadhaar_pan[0].pancard_data_url} alt="PAN Card" />
                    </div>
                </div>
            )}

            {documents?.aadhaar_pan?.[0]?.pancard_data_url && !loading && (
                <div className="mb-5">
                    <span className="font-semibold bg-slate-200 px-5 py-1">Aadhar Card</span>
                    <div className=" max-h-95 mb-5">
                        <img src={documents.aadhaar_pan[0].aadhar_front_data_url} alt="Aadhaar Card Front" />
                    </div>
                    <div className="max-h-95">
                        <img src={documents.aadhaar_pan[0].aadhar_back_data_url} alt="Aadhaar Card Back" />
                    </div>
                </div>
            )}
        </>
    )
}
export default FormSidebar