import Icon from '../utils/Icon';


// const menuItem = [
//     {
//         name: "Dashboard",
//         icon: <Icon name="MdOutlineDashboard" size={20} />,
//         path: "/",
//     },
//     {
//         name: "Manage Leads",
//         icon: <Icon name="IoMagnetOutline" size={20} />,
//         menuItems: [
//             {
//                 path: "/manage-leads/new-leads",
//                 name: "Leads",
//                 icon: <Icon name="RiAlbumLine" size={10} />,
//             },
//             {
//                 path: "/manage-leads/leads-verification",
//                 name: "Lead Verification",
//                 icon: <Icon name="RiAlbumLine" size={10} />,
//             },
//             {
//                 path: "/manage-leads/credit-assessment",
//                 name: "Credit Assessment",
//                 icon: <Icon name="RiAlbumLine" size={10} />,
//             },
//             {
//                 path: "/manage-leads/leads-in-kyc",
//                 name: "Leads KYC Status",
//                 icon: <Icon name="RiAlbumLine" size={10} />,
//             },
//         ]
//     },
//     {
//         name: "Manage Disbursal",
//         icon: <Icon name="RiMoneyRupeeCircleLine" size={20} />,
//         path: "/manage-leads/manage-disbursal",
//     },
//     {
//         name: "Active Loans",
//         icon: <Icon name="GiMoneyStack" size={20} />,
//         path: "/loan/loan-accounts"
//     },

//     {
//         name: "Manage Application",
//         icon: <Icon name="IoDocumentsOutline" size={20} />,
//         path: "/lead/rejected-leads",
//     },
//     {
//         name: "Loan Collection",
//         icon: <Icon name="GiTakeMyMoney" size={20} />,
//         menuItems: [
//             {
//                 name: "Current Due",
//                 icon: <Icon name="RiAlbumLine" size={10} />,
//                 path: "/collection/dues",
//             },
//             {
//                 name: "Overdue EMI",
//                 icon: <Icon name="RiAlbumLine" size={10} />,
//                 path: "/collection/overdues",
//             }
//         ]
//     },

//     {
//         name: "Reports",
//         icon: <Icon name="RiFileExcel2Line" size={20} />,
//         path: "/reports"
//     },
//     {
//         name: "Admin",
//         icon: <Icon name="RiUserSettingsLine" size={20} />,
//         menuItems: [
//             {
//                 path: "admin/manage-users",
//                 name: "Manage Users",
//                 icon: <Icon name="RiAlbumLine" size={10} />,
//             },
//             {
//                 path: "admin/manage-products",
//                 name: "Manage Products",
//                 icon: <Icon name="RiAlbumLine" size={10} />,
//             },
//             {
//                 path: "admin/manage-department",
//                 name: "Manage Department",
//                 icon: <Icon name="RiAlbumLine" size={10} />,
//             },
//             {
//                 path: "admin/manage-designation",
//                 name: "Manage Designation",
//                 icon: <Icon name="RiAlbumLine" size={10} />,
//             },
//             {
//                 path: "/admin/manage-branch",
//                 name: "Manage Branch",
//                 icon: <Icon name="RiAlbumLine" size={10} />,
//             },
//             {
//                 path: "/admin/manage-bank-accounts",
//                 name: "Manage Bank Accounts",
//                 icon: <Icon name="RiAlbumLine" size={10} />,
//             },

//         ]
//     },
//     {
//         name: "Administrator",
//         icon: <Icon name="RiUserSettingsLine" size={20} />,
//         menuItems: [

//             {
//                 path: "/administrator/manage-page-urls",
//                 name: "Manage Page URLs",
//                 icon: <Icon name="RiAlbumLine" size={10} />,
//             }
//         ]
//     },
// ];

const paymentType = [
    {label: "Full Payment", value: "fullPayment"},
    {label: "Part Payment", value: "partPayment"}
]

const notifyItems = [
    {
        href: '/path1',
        label: 'New Application',
        description: 'New loan application received 1m ago ',
        icon: <Icon name="IoNotificationsCircle" size={20} color="black" />
    },
    {
        onClick: () => alert('Clicked Item 2!'),
        href: '/path1',
        label: 'New Application',
        description: 'New loan application received 15m ago',
        icon: <Icon name="IoNotificationsCircle" size={20} color="black" />
    },
    {
        // onClick: () => alert('Clicked Item 2!'),
        href: '/path1',
        label: 'New Application',
        description: 'New loan application received 30m ago',
        icon: <Icon name="IoNotificationsCircle" size={20} color="black" />
    },
    {
        // onClick: () => alert('Clicked Item 2!'),
        href: '/path1',
        label: 'New Application',
        description: 'New loan application received 2h ago',
        icon: <Icon name="IoNotificationsCircle" size={20} color="black" />
    },
    {
        // onClick: () => alert('Clicked Item 2!'),
        href: '/path1',
        label: 'New Application',
        description: 'New loan application received 1d ago',
        icon: <Icon name="IoNotificationsCircle" size={20} color="black" />
    }
];

const steperItems = [
    { title: 'Personal' },
    { title: 'Employment' },
    { title: 'Address' },
    { title: 'KYC' },
    { title: 'Bank' },
]

const houseTypeOptions = [
    { label: "Rented", value: "Rented" },
    { label: "Owned", value: "Owned" },
]

const scorePlatform = [
    // { label: "Transunion", value: "Transunion" },
    // { label: "Experian", value: "Experian" },
    // { label: "Equifax", value: "Equifax" },
    { label: "Salora", value: "Salora" },
]


const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Others', label: 'Others' }
]

const maritalStatusOptions = [
    { label: "Married", value: "Married" },
    { label: "Unmarried", value: "Unmarried" },
]

const educationOptions = [
    { label: "Diploma", value: "Diploma" },
    { label: "Matric", value: "Matric" },
    { label: "Intermediate", value: "Intermediate" },
    { label: "Graduate", value: "Graduate" },
    { label: "Post Graduate", value: "PostGraduate" },
];


const features = [
    { id: 1, icon: "GiMoneyStack", text: "Instant Approval" },
    { id: 2, icon: "IoEyeOffOutline", text: "No Hidden Charges" },
    { id: 3, icon: "RiDiscountPercentLine", text: "Competitive Interest" },
    { id: 4, icon: "IoDocumentsOutline", text: "Minimal Documentation" },
];

const leadRemarks = [
    { label: "Interested", value: "Interested" },
    { label: "Follow-up", value: "Follow-up" },
    { label: "No Answer", value: "No Answer" },
    { label: "Not Eligible", value: "Not Eligible" },
    { label: "Not Interested", value: "Not Interested" },
    { label: "Fake Application", value: "Fake Application" },
    { label: "Incomplete Documents", value: "Incomplete Documents" },
];

const addRemarkOptions = [
    { label: "Follow-up", value: "Follow-up" },
    { label: "No Answer", value: "No Answer" },
    { label: "Number Not Available", value: "Number Not Available" },
    { label: "Number Not Reachable", value: "Number Not Reachable" },
    { label: "Switched Off", value: "Switched Off" },
    { label: "Call Disconnected", value: "Call Disconnected" },
    { label: "Wrong Number", value: "Wrong Number" },
    { label: "Requested Call Back", value: "Requested Call Back" },
];


const leadStep1 = [
    { label: "Interested", value: "Interested" },
    { label: "Not Eligible", value: "Not Eligible" },
    { label: "Not Interested", value: "Not Interested" },
    { label: "Fake Application", value: "Fake Application" },
    { label: "Incomplete Documents", value: "Incomplete Documents" },
]

const rejectLead = [
    { label: "Not Eligible", value: "Not Eligible" },
    { label: "Not Interested", value: "Not Interested" },
    { label: "Fake Application", value: "Fake Application" },
    { label: "Fake Aadhaar Card", value: "Fake Aadhaar Card" },
    { label: "Fake PAN Card", value: "Fake PAN Card" },
    { label: "Fake Salary Slip", value: "Fake Salary Slip" },
    { label: "Fake Bank Statement", value: "Fake Bank Statement" },
    { label: "Incomplete Documents", value: "Incomplete Documents" },
];

const eKYCRemarks = [
    { label: "Adhaar Unverified", value: "Adhaar Unverified" },
    { label: "PAN Unverified", value: "PAN Unverified" },
    { label: "eMandate not Activated", value: "eMandate not Activated" },
    { label: "Unverified Loan Consent", value: "Unverified Loan Consent" },
    { label: "eKYC could not finish ", value: "eKYC could not finish " },
]


const disbursedRemarks = [
    { label: "Bank Account Unverified", value: "Bank Account Unverified" },
    { label: "Suspicious Profile", value: "Suspicious Profile" },
    { label: "Hold Disbursement", value: "Hold Disbursement" },
]

const assessmentRemarks = [
    { label: "Low Credit Score", value: "Low Credit Score" },
    { label: "Mismatch in Documents", value: "Mismatch in Documents" },
    { label: "Unstable Employment", value: "Unstable Employment" },
    { label: "Poor Repayment History", value: "Poor Repayment History" },
    { label: "High Credit Utilization", value: "High Credit Utilization" },
    { label: "High Days Past Due (DPD)", value: "High Days Past Due (DPD)" },
    { label: "Multiple Active Loan Accounts", value: "Multiple Active Loan Accounts" },
];


const actionType = [
    { label: "Call", value: "Call" },
    { label: "QC Check", value: "QC Check" },
    { label: "Credit Check", value: "Credit Check" },
];

//Filter and search status options

const assignStatus = [
    { label: "Unassigned", value: "Unassigned" },
    { label: "Assigned", value: "Assigned" },
];

const disbursalStatus = [
    { label: "Pending-Disbursal", value: "Pending-Disbursal" },
    { label: "Hold-Disbursal", value: "Hold-Disbursal" },
];

const emiStatus = [
    { label: "Due", value: "Due" },
    { label: "Paid", value: "Paid" },
];

const manageApp = [
    { label: "Followup", value: "Followup" },
    { label: "Rejected", value: "Rejected" },
    { label: "Blacklisted", value: "Blacklisted" },
];
const branchList = [
    { label: "Active", value: "A" },
    { label: "Closed", value: "C" },
    { label: "Settled", value: "S" },
    { label: "NPA", value: "N" },
];



const qcStatus = [
    { label: "QC-Verified", value: "QC-Verified" },
    { label: "Followup", value: "Followup" },
    { label: "Reject", value: "Reject" },
    { label: "Blacklist", value: "Blacklist" },
];

const creditApprovalStatus = [
    { label: "Approved", value: "Approved" },
    { label: "Followup", value: "Followup" },
    { label: "Reject", value: "Reject" },
    { label: "Blacklist", value: "Blacklist" },
];

const creditApprovalRemarks = [
    { label: "Poor credit score", value: "Poor credit score" },
    { label: "Low credit score", value: "Low credit score" },
    { label: "Fair credit score", value: "Fair credit score" },
    { label: "Good credit score", value: "Good credit score" },
    { label: "Excellent credit score", value: "Excellent credit score" },
    { label: "Incomplete information", value: "Incomplete information" },
];

const leadStatus = [
    { label: "New", value: "New" },
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
];

const kycStatus = [
    { label: "Pending-KYC", value: "Pending-KYC" },
    { label: "Verified-KYC", value: "Verified-KYC" },
    { label: "Rejected", value: "Rejected" },
];

const loanStatus = [
    { label: "Active", value: "Active" },
    { label: "Hold", value: "Hold" },
];

const collectionStatus = [
    { label: "Paid", value: "10" },
    { label: "Settled", value: "12" },
    { label: "Partially", value: "6" },
    { label: "Foreclosure", value: "11" },
    { label: "NPA", value: "13" },
    { label: "Waive-Off", value: "15" },
];

const collectionPaymentMode = [
    { value: "NEFT", label: "NEFT" },
    { value: "RTGS", label: "RTGS" },
    { value: "IMPS", label: "IMPS" },
    { value: "UPI", label: "UPI" },
    { value: "CARD", label: "CARD" },
    { value: "CASH", label: "CASH" },
]

const paymentMode = [
    { label: "NEFT", value: "NEFT" },
    { label: "RTGS", value: "RTGS" },
    { label: "UPI", value: "UPI" },
    { label: "Cheque", value: "Cheque" }
]

const disburesementMode = [
    { label: "NEFT", value: "NEFT" },
    { label: "RTGS", value: "RTGS" },
    { label: "IMPS", value: "IMPS" }
]

const emiStaus = [
    { label: "Settled", value: "12" },
    { label: "Fully Paid", value: "10" },
    { label: "Write-Off", value: "13" },
    { label: "Partially Paid", value: "6" },
    { label: "Foreclosed", value: "11" },
]

const relationOptions = [
    { label: "Father", value: "Father" },
    { label: "Mother", value: "Mother" },
    { label: "Brother", value: "Brother" },
    { label: "Sister", value: "Sister" },
    { label: "Husband", value: "Husband" },
    { label: "Spouse", value: "Spouse" },
    { label: "Friend", value: "Friend" }
]

const userStatus = [
    { label: "Active", value: "1" },
    { label: "Inactive", value: "0" },
]

const emplyeeType = [
    { label: "Full-time", value: "Full-time" },
    { label: "Part-time", value: "Part-time" },
    { label: "Temporary", value: "Temporary" },
    { label: "Leased", value: "Leased" },
]

const userRole = [
    { label: "Admin", value: "1" },
    { label: "Executive", value: "2" },
    { label: "QC Manager", value: "3" },
    { label: "Credit Manager", value: "4" }
]

const productType = [
    { label: "Personal Loan", value: "Personal Loan" },
    { label: "Home Loan", value: "Home Loan" },
    { label: "Car Loan", value: "Car Loan" }
]

const repaymentFrequency = [
    { label: "Monthly", value: "Monthly" },
    { label: "Bi-Weekly", value: "Bi-Weekly" },
    { label: "Weekly", value: "Weekly" },
    { label: "Daily", value: "Daily" }
]

const loanTenure = [
    { label: "3 Months", value: "3 Months" },
    { label: "6 Months", value: "6 Months" },
    { label: "9 Months", value: "9 Months" },
    { label: "12 Months", value: "12 Months" },
    { label: "18 Months", value: "18 Months" },
    { label: "24 Months", value: "24 Months" },
    { label: "36 Months", value: "36 Months" },
]

const interestType = [
    { label: "Fixed", value: "Fixed" },
    { label: "Reducing", value: "Reducing" },
]

const nameTitle = [
    { label: "Mr", value: "Mr" },
    { label: "Mrs", value: "Mrs" },
    { label: "Ms", value: "Ms" },
    { label: "Miss", value: "Miss" }
]




const documentType = [
    { label: "Selfie", value: "Selfie" },
    { label: "ID Card", value: "idCard" },
    { label: "Water Bill", value: "WaterBill" },
    { label: "Salary Slip", value: "SalarySlip" },
    { label: "Credit Report", value: "CreditReport" },
    { label: "Bank Statement", value: "BankStatement" },
    { label: "Rent Agreement", value: "RentAgreement" },
    { label: "Electricity Bill", value: "ElectricityBill" },
    { label: "Postpaid Mobile Bill", value: "PostpaidMobileBill" },
    { label: "Video Kyc", value: "VideoKyc" },  // newly added Rohit
    { label: "Other Bank Statement", value: "OtherBankStatement" },  // newly added Rohit
    // { label: "Other", value: "Other" },
]

const exportDataType = [
    { label: "Rejected", value: "rejected" },
    { label: "Recovery", value: "recovery" },
    { label: "Master Data", value: "master" },
    { label: "Disbursement", value: "disbursement" },
]
const exportLeadSource = [
    { value: "0", label: "In-complete" },
    { value: "7", label: "Rejected" },
    { value: "2", label: "Verification" },
    { value: "3", label: "Assessment" },
    { value: "4", label: "Pending KYC" },
    { value: "5", label: "Disbursal" },
];

const exportStatusSource = [
    { value: "22", label: "Due" },
    { value: "23", label: "Overdue" },
    { value: "1", label: "Active Loan" },
    { value: "10", label: "Closed Loan" },
    { value: "15", label: "Writeoff" },
    { value: "11", label: "Foreclosed" },
];

const exportCollectionSource = [
    { value: "30", label: "DPD <30 Days" },
    { value: "60", label: "DPD <60 Days" },
    { value: "90", label: "DPD <90 Days" },
    { value: "91", label: "DPD >91 Days" },
];



export { paymentType, notifyItems, steperItems, houseTypeOptions, genderOptions, maritalStatusOptions, features, leadRemarks, actionType, branchList, assignStatus, kycStatus, disbursalStatus, emiStatus, collectionStatus, manageApp, qcStatus, leadStatus, creditApprovalStatus, creditApprovalRemarks, loanStatus, collectionPaymentMode, relationOptions, userStatus, userRole, nameTitle, assessmentRemarks, paymentMode, educationOptions, emplyeeType, productType, repaymentFrequency, loanTenure, interestType, scorePlatform, documentType, emiStaus, leadStep1, rejectLead, eKYCRemarks, disbursedRemarks, addRemarkOptions, exportDataType, exportLeadSource, exportStatusSource, exportCollectionSource, disburesementMode };
