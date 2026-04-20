import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../utils/Button';
import { toast } from 'react-toastify';
import { ScoreFromTransunion, ScoreFromExperian, ScoreFromEquiFax, UploadCreditReport, ScoreFromSalora, pushMasterDataToSalora } from '../../api/ApiFunction';
import Loader from './Loader';
import SelectInput from '../fields/SelectInput';
import TextInput from '../fields/TextInput';
import ErrorMsg from './ErrorMsg';
import { scorePlatform } from '../content/Data'
import { useOpenLeadContext } from '../../context/OpenLeadContext'
import { useAuth } from '../../context/AuthContext';
import Modal from '../utils/Modal';
import { maskData } from './maskData';
import LoginPageFinder from './LoginPageFinder';
import { use } from 'react';

const GetScore = ({ btnEnable = false }) => {
    const [loading, setLoading] = useState(false);
    const [isUplaod, setIsUplaod] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false);
    const { leadInfo, setLeadInfo } = useOpenLeadContext()
    // console.log("lead_info ",leadInfo)
    const { adminUser } = useAuth();


    const scoreData = leadInfo?.cibilCreditScores
    console.log("score data, ", scoreData)
    const score = parseInt(leadInfo?.cibilCreditScores?.[0]?.credit_score) || 0;
    const funder = adminUser.role === 'Funder' ? true : false

    const pageAccess = LoginPageFinder('page_display_name', 'credit assessment');
    const permission = pageAccess?.[0].read_write_permission;


    useEffect(() => {
        if (score >= 1 || score <= -1) {
            setIsSuccess(true);
        } else {
            setIsSuccess(false);
        }
    }, [score]);

    const creditPlatform = useFormik({
        initialValues: {
            platform: ''
        },
        validationSchema: Yup.object({
            platform: Yup.string().required('Select Platform'),
        }),
        onSubmit: async (values) => {

            if (values.platform === "Equifax") {
                getEquiFaxScore();
            } else if (values.platform === "Experian") {
                getExperianScore();
            } else if (values.platform === "Transunion") {
                getTransUnionScore();
            } else if (values.platform === "Salora") {
                getSaloraCreditScore();
            }
        },
    });


    const uploadCR = useFormik({
        initialValues: {
            name: leadInfo?.personalInfo[0]?.full_name,
            panNumber: leadInfo?.kycInfo[0]?.pan_card_number,
            creditScore: '',
            provider: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Select Platform'),
            panNumber: Yup.string().required('Select Platform'),
            creditScore: Yup.string().required('Select Platform'),
            provider: Yup.string().required('Select Platform'),
        }),
        onSubmit: async (values) => {
            const req = {
                user_id: leadInfo?.user_id,
                lead_id: leadInfo?.lead_id,
                name: values.name,
                mobile: leadInfo?.mobile_number,
                pan_number: values.panNumber,
                credit_score: values.creditScore,
                provider: values.provider
            }
            try {
                const response = await UploadCreditReport(req);
                if (response.status) {
                    setLeadInfo(prev => ({
                        ...prev,
                        cibilCreditScores: [
                            {
                                name: req.name,
                                mobile: req.mobile,
                                pan_number: req.pan_number,
                                credit_score: req.credit_score, // "510"
                                credit_report_link: "", // PDF link
                                provider: req.provider, // "EXPERIAN"
                            }
                        ]
                    }));

                    setIsUplaod(false)
                    toast.success(response.message);
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("An error occurred while fetching data.");
            }
        },
    });

    const fullName = leadInfo?.personalInfo[0]?.full_name?.trim();
    const nameParts = fullName ? fullName.split(' ') : [];

    let firstName = '';
    let middleName = '';
    let lastName = '';
    const dob = leadInfo?.personalInfo[0].dob;

    const formattedDOB = dob
        ? dob.split('-').reverse().join('-')
        : '';


    if (nameParts.length === 1) {
        firstName = nameParts[0];
    } else if (nameParts.length === 2) {
        [firstName, lastName] = nameParts;
    } else if (nameParts.length >= 3) {
        firstName = nameParts[0];
        lastName = nameParts[nameParts.length - 1];
        middleName = nameParts.slice(1, -1).join(' ');
    }


    const getExperianScore = async () => {
        setLoading(true);
        const req = {
            user_id: leadInfo?.user_id,
            lead_id: leadInfo?.lead_id,
            name: leadInfo?.personalInfo[0].full_name,
            mobile: leadInfo?.mobile_number,
            panNumber: leadInfo?.kycInfo[0].pan_card_number,
            rsType: "PDF",
            company_id: import.meta.env.VITE_COMPANY_ID,
            productName: import.meta.env.VITE_PRODUCT_NAME
        };

        try {
            const response = await ScoreFromExperian(req);
            if (response.status === "success") {
                setLeadInfo(prev => {
                    const updatedScores = [...(prev.cibilCreditScores || [])];

                    updatedScores[0] = {
                        name: response.data.name,
                        mobile: response.data.mobile,
                        pan_number: response.data.pan,
                        credit_score: response.data.credit_score,
                        credit_report_link: response.data.credit_report_link,
                        provider: response.provider,
                    };

                    return {
                        ...prev,
                        cibilCreditScores: updatedScores
                    };
                });

                setLoading(false)
                toast.success(response.message);
            } else {
                toast.error(response?.message || "Something went wrong!");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("An error occurred while fetching data.");
        }
        setLoading(false);
    };

    const getEquiFaxScore = async () => {
        setLoading(true);
        const req = {
            user_id: leadInfo?.user_id,
            lead_id: leadInfo?.lead_id,
            rsType: "JSON",
            reportType: "IDCR",
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            dob: formattedDOB,
            address: leadInfo?.addressInfo[0].address,
            stateCode: leadInfo?.addressInfo[0].state_code,
            postal: leadInfo?.addressInfo[0].zip_code,
            mobile: leadInfo?.mobile_number,
            idType: "PANCARD",
            idValue: leadInfo?.kycInfo[0].pan_card_number,
            productName: import.meta.env.VITE_PRODUCT_NAME,
            company_id: import.meta.env.VITE_COMPANY_ID
        };

        try {
            const response = await ScoreFromEquiFax(req);
            if (response.success) {
                setLeadInfo(prev => {
                    const updatedScores = [...(prev.cibilCreditScores || [])];

                    updatedScores[0] = {
                        name: response.data.name,
                        mobile: response.data.mobile,
                        pan_number: response.data.pan,
                        credit_score: response.data.credit_score,
                        credit_report_link: response.data.credit_report_link,
                        provider: response.provider,
                    };

                    return {
                        ...prev,
                        cibilCreditScores: updatedScores
                    };
                });

                setLoading(false)
                toast.success(response.message);
            } else {
                toast.error(response.message || "An error occurred while fetching data.");
                setLoading(false)
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("An error occurred while fetching data.");
        }
    };

    const getTransUnionScore = async () => {
        setLoading(true);
        const req = {
            customerInfo: {
                name: {
                    forename: firstName,
                    surname: lastName,
                },
                identificationNumber: {
                    identifierName: leadInfo?.kycInfo[0].pan_card_number
                },
                address: {
                    streetAddress: leadInfo?.addressInfo[0]?.address,
                    city: leadInfo?.addressInfo[0]?.district,
                    postalCode: leadInfo?.addressInfo[0]?.zip_code
                },
                emailID: leadInfo?.personalInfo[0]?.email_id,
                dateOfBirth: leadInfo?.personalInfo[0]?.dob,
                phoneNumber: {
                    number: leadInfo?.mobile_number
                },
                gender: leadInfo?.personalInfo[0]?.gender
            },
            productName: import.meta.env.VITE_COMPANY_ID,
            companyName: import.meta.env.VITE_PRODUCT_NAME,
            user_id: leadInfo?.user_id,
            lead_id: leadInfo?.lead_id
        }

        try {
            const response = await ScoreFromTransunion(req);
            if (response.success) {
                setLeadInfo(prev => {
                    const updatedScores = [...(prev.cibilCreditScores || [])];

                    updatedScores[0] = response;

                    return {
                        ...prev,
                        cibilCreditScores: updatedScores
                    };
                });
                setLoading(false)
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("An error occurred while fetching data.");
        }
        setLoading(false);
    }

    const getSaloraCreditScore = async () => {
        setLoading(true);

        const req = {
            firstName: firstName,
            // middleName: middleName,
            lastName: lastName || firstName,
            dob: formattedDOB.replaceAll("-", ""), //ddmmyyyy fixed
            pan: leadInfo?.kycInfo[0].pan_card_number,
            mobile: leadInfo?.mobile_number,
            city: "Delhi", //*
            state: "07",
            pinCode: leadInfo?.addressInfo[0]?.zip_code,
            comapny_id: import.meta.env.VITE_COMPANY_ID,
            product_name: import.meta.env.VITE_PRODUCT_NAME,
            user_id: leadInfo?.user_id,
            lead_id: leadInfo?.lead_id,
            created_by: adminUser?.emp_code,
            // amount: leadInfo?.selectedproduct?.loan_amount,
            amount: "20000",
        }

        try {
            const response = await ScoreFromSalora(req);

            if (response?.data?.bureauScore) {
                setLeadInfo(prev => {
                    const updatedScores = [...(prev.cibilCreditScores || [])];

                    updatedScores[1] = {
                        name: `${response?.data?.applicant?.firstName} ${response?.data?.applicant?.lastName}`,
                        mobile: response?.data?.applicant?.mobile,
                        pan_number: response?.data?.applicant?.pan,
                        credit_score: response?.data?.bureauScore,
                        credit_report_link: response?.pdfUrl,
                        // provider: response.provider,
                        provider: "SALORA",
                    };

                    // console.log("updated salora score, ", updatedScores)

                    return {
                        ...prev,
                        cibilCreditScores: updatedScores
                    };
                });
                setLoading(false)
                // console.log("Res saved from salora API", leadInfo)
                toast.success(response.message);

                // push master data to salora -phase 1
                await pushMasterDataToSalora({
                    user_id: leadInfo?.user_id,
                    lead_id: leadInfo?.lead_id,
                })
            } else {
                // toast.error(response.message);
                toast.error(response?.data?.userMessage || "CIBIL Data not found");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("An error occurred while fetching data.");
        }
        setLoading(false);
    }


    if (loading) {
        return <Loader />
    }

    // alert(JSON.stringify(parseInt(score)))

    return (
        <div className="my-8">

            <div className='grid grid-cols-2 gap-5'>
                {/* Get Credit Score section */}
                {permission && !funder && (
                    <div className='col-span-1 shadow rounded-t-xl'>
                        <div className=''>
                            <div className='bg-gray-600 px-5 py-0.5 font-semibold text-white rounded-t-xl'>Get Credit Score</div>
                            <div className='grid grid-cols-3 px-5 py-5'>
                                <div className='col-span-2 flex gap-5 border-r-2 border-r-gray-300 '>
                                    <form onSubmit={creditPlatform.handleSubmit} className="flex gap-5">
                                        <div>
                                            <SelectInput
                                                label=""
                                                placeholder="Select Platform"
                                                icon="IoSpeedometerOutline"
                                                name="platform"
                                                id="platform"
                                                disabled={!permission || funder}
                                                options={scorePlatform}
                                                onChange={creditPlatform.handleChange}
                                                onBlur={creditPlatform.handleBlur}
                                                value={creditPlatform.values.platform}
                                            />
                                            {creditPlatform.touched.platform && creditPlatform.errors.platform && (
                                                <ErrorMsg error={creditPlatform.errors.platform} />
                                            )}
                                        </div>

                                        <div className='mt-1'>
                                            <Button
                                                btnName="Get Score"
                                                disabled={!permission || funder || btnEnable}
                                                type="submit"
                                                btnIcon="IoCheckmarkCircleOutline"
                                                style="bg-primary text-white hover:shadow-2xl min-w-[120px]"
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className='col-span-1 mt-1'>
                                    <div className='flex justify-center items-center'>
                                        <Button
                                            btnName="Upload Score"
                                            type="button"
                                            disabled={!permission || funder || btnEnable}
                                            onClick={() => setIsUplaod(true)}
                                            btnIcon="IoCheckmarkCircleOutline"
                                            style="bg-primary text-white hover:shadow-2xl min-w-[120px]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {/* Credit Report section */}
                <div className='col-span-1 shadow'>
                    <div className=''>
                        <div className='bg-gray-600 px-5 py-0.5 font-semibold text-white rounded-t-xl'>
                            Credit Report
                        </div>

                        {/* {(!isSuccess) ? ( */}
                        {(true) ? (
                            <>
                                {scoreData?.[0]?.provider && <div className='grid grid-cols-5 ps-2 py-1.5 gap-5'>
                                    {/* <h2>Credit Score by </h2> */}
                                    {/* Score Display */}
                                    <div className='col-span-1 mt-1'>
                                        <div className='flex justify-center items-center'>
                                            <div
                                                className={`${!score || score <= 0
                                                    ? "bg-white text-primary"
                                                    : score >= 675
                                                        ? "bg-green-100 text-green-500"
                                                        : score >= 600
                                                            ? "bg-yellow-100 text-yellow-500"
                                                            : "bg-red-100 text-red-500"
                                                    } border border-gray-300 p-5 py-1 font-semibold rounded-lg shadow`}
                                            >
                                                <span className='text-4xl font-bold'>
                                                    {scoreData?.[0]?.credit_score || 'N/A'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Report Details */}
                                    <div className='col-span-4 flex gap-5'>

                                        {/* Provider & PAN */}
                                        <div className="grid grid-cols-2 gap-0 mb-6 ms-0">
                                            <div>
                                                <p className="text-sm text-gray-900">Platform</p>
                                                <p className="font-medium text-primary">{scoreData?.[0]?.provider || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-900">PAN Number</p>
                                                <p className="font-medium text-primary">
                                                    {funder ? maskData(scoreData?.[0]?.pan_number, 'pan') : scoreData?.[0]?.pan_number || "N/A"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Download Button */}
                                        <div className="flex justify-center items-center">
                                            {scoreData?.[0]?.credit_report_link ? (
                                                <div className='flex flex-col gap-2'>
                                                    <a
                                                        href={scoreData?.[0].credit_report_link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block w-full text-center bg-primary text-white font-semibold py-1 px-4 rounded"
                                                    >
                                                        Download Report
                                                    </a>
                                                    <span className='text-xs text-red-500 italic font-semibold'>
                                                        Report link expires on refresh
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="mb-6">
                                                    <p className="text-sm text-gray-900">Generated On</p>
                                                    <p className="font-medium text-primary">
                                                        {scoreData?.[0]?.generate_date || "N/A"}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>}
                                <hr />
                                {scoreData?.[1]?.provider && <div className='grid grid-cols-5 ps-2 py-1.5 gap-5'>
                                    {/* <h2>Credit Score by </h2> */}
                                    {/* Score Display */}
                                    <div className='col-span-1 mt-1'>
                                        <div className='flex justify-center items-center'>
                                            <div
                                                className={`${!score || score <= 0
                                                    ? "bg-white text-primary"
                                                    : score >= 675
                                                        ? "bg-green-100 text-green-500"
                                                        : score >= 600
                                                            ? "bg-yellow-100 text-yellow-500"
                                                            : "bg-red-100 text-red-500"
                                                    } border border-gray-300 p-5 py-1 font-semibold rounded-lg shadow`}
                                            >
                                                <span className='text-4xl font-bold'>
                                                    {scoreData?.[1]?.credit_score
                                                        ? Number(scoreData[1].credit_score)
                                                        : 'N/A'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Report Details */}
                                    <div className='col-span-4 flex gap-5'>

                                        {/* Provider & PAN */}
                                        <div className="grid grid-cols-2 gap-0 mb-6 ms-0">
                                            <div>
                                                <p className="text-sm text-gray-900">Platform</p>
                                                <p className="font-medium text-primary">{scoreData?.[1]?.provider || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-900">PAN Number</p>
                                                <p className="font-medium text-primary">
                                                    {funder ? maskData(scoreData?.[1]?.pan_number, 'pan') : scoreData?.[1]?.pan_number || "N/A"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Download Button */}
                                        <div className="flex justify-center items-center">
                                            {scoreData?.[1]?.credit_report_link ? (
                                                <div className='flex flex-col gap-2'>
                                                    <a
                                                        href={scoreData?.[1].credit_report_link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block w-full text-center bg-primary text-white font-semibold py-1 px-4 rounded"
                                                    >
                                                        Download Report
                                                    </a>
                                                    <span className='text-xs text-red-500 italic font-semibold'>
                                                        Report link expires on refresh
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="mb-6">
                                                    <p className="text-sm text-gray-900">Generated On</p>
                                                    <p className="font-medium text-primary">
                                                        {scoreData?.[1]?.generate_date || "N/A"}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>}
                            </>
                        ) : (
                            <div className='flex flex-col justify-center items-center py-5'>
                                <h1 className='font-semibold italic text-gray-800'>Score Not Found</h1>
                                <p className='text-xs font-semibold italic text-red-400'>
                                    Please get score again or upload score
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Upload Credit Report Modal */}
            <Modal
                isOpen={isUplaod}
                onClose={() => setIsUplaod(false)}
                heading={"Upload Credit Report"}
            >
                <div className='px-5'>
                    <form className='my-4' onSubmit={uploadCR.handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <TextInput
                                    label="Applicant Name"
                                    icon="IoPersonOutline"
                                    placeholder="Applicant Name"
                                    name="name"
                                    disabled={true}
                                    id="name"
                                    onChange={uploadCR.handleChange}
                                    onBlur={uploadCR.handleBlur}
                                    value={uploadCR.values.name}
                                />
                                {uploadCR.touched.name && uploadCR.errors.name && (
                                    <ErrorMsg error={uploadCR.errors.name} />
                                )}
                            </div>
                            <div className="col-span-1">
                                <TextInput
                                    label="PAN Number"
                                    icon="CiCreditCard1"
                                    placeholder="PAN Number"
                                    name="panNumber"
                                    disabled={true}
                                    id="panNumber"
                                    style={" uppercase "}
                                    onChange={uploadCR.handleChange}
                                    onBlur={uploadCR.handleBlur}
                                    value={uploadCR.values.panNumber}
                                />
                                {uploadCR.touched.panNumber && uploadCR.errors.panNumber && (
                                    <ErrorMsg error={uploadCR.errors.panNumber} />
                                )}
                            </div>
                            <div className="col-span-1">
                                <SelectInput
                                    label="Select Platform"
                                    placeholder="Select"
                                    icon="GiGlobe"
                                    name="provider"
                                    id="provider"
                                    options={scorePlatform}
                                    onChange={uploadCR.handleChange}
                                    onBlur={uploadCR.handleBlur}
                                    value={uploadCR.values.provider}
                                />
                                {uploadCR.touched.provider && uploadCR.errors.provider && (
                                    <ErrorMsg error={uploadCR.errors.provider} />
                                )}
                            </div>

                            <div className="col-span-1">
                                <TextInput
                                    label="Credit Score"
                                    icon="PiSpeedometer"
                                    placeholder="800"
                                    name="creditScore"
                                    maxLength={3}
                                    id="creditScore"
                                    onChange={uploadCR.handleChange}
                                    onBlur={uploadCR.handleBlur}
                                    value={uploadCR.values.creditScore}
                                />
                                {uploadCR.touched.creditScore && uploadCR.errors.creditScore && (
                                    <ErrorMsg error={uploadCR.errors.creditScore} />
                                )}
                            </div>

                        </div>
                        <div className="flex justify-end gap-4 mt-2">

                            <Button
                                btnName="Update"
                                btnIcon="IoCheckmarkCircleSharp"
                                type="submit"
                                style="min-w-[100px] md:w-auto text-xs font-semibold mt-4 py-1 px-4 border border-primary text-primary border hover:border-success hover:bg-success hover:text-white hover:font-bold italic"
                            />

                            <Button
                                btnName={"Cancel"}
                                btnIcon={"IoCloseCircleOutline"}
                                type={"button"}
                                onClick={() => setIsUplaod(false)}
                                style="min-w-[100px] md:w-auto text-xs font-semibold mt-4 py-1 px-4 border border-primary text-primary border hover:border-danger hover:bg-danger hover:text-black hover:font-bold italic"
                            />
                        </div>

                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default GetScore;
