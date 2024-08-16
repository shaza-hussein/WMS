
import React, { useContext, useEffect, useState } from 'react';
import { User } from '../Context/UserContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ReportsDetails({ reportId, onClose }) {
  const context = useContext(User);
  const token = context.auth.token;
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/reports/${reportId}/`, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        });
        setReport(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          window.location.href = '/login';
        } else {
          console.error("Error fetching report details:", error);
        }
      }
    };

    fetchReportDetails();
  }, [reportId, token]);

  if (!report) {
    return <p>Loading...</p>;
  }

  const jsonToPlainText = (json) => {
    try {
      const obj = JSON.parse(json);
      let plainText = '';

      const formatValue = (key, value) => {
        if (typeof value === 'object' && value !== null) {
          let formatted = `${key}:\n`;
          for (const subKey in value) {
            formatted += `  ${subKey}: ${value[subKey]}\n`;
          }
          return formatted;
        } else {
          return `${key}: ${value}\n`;
        }
      };

      for (const key in obj) {
        plainText += formatValue(key, obj[key]);
      }

      return plainText.trim();

    } catch (error) {
      return json;
    }
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        <p><strong>Report Id: </strong>{report.id}</p>
        <p><strong>Report Type:</strong> {report.report_type}</p>
        <p><strong>Generated At:</strong> {report.generated_at}</p>
        <p><strong>Report Content:</strong></p>
        <p>{jsonToPlainText(report.data)}</p> {/* عرض النص العادي */}
      </div>
    </div>
  );
}

export default ReportsDetails;



// import React, { useContext, useEffect, useState } from 'react';
// import { User } from '../Context/UserContext';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';

// function ReportsDetails({ reportId, onClose }) {
//   const context = useContext(User);
//   const token = context.auth.token;
//   const [report, setReport] = useState(null);

//   useEffect(() => {
//     const fetchReportDetails = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/api/reports/${reportId}/`, {
//           headers: {
//             Accept: "application/json",
//             Authorization: "Bearer " + token,
//           },
//         });
//         setReport(response.data);
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           window.location.href = '/login';
//         } else {
//           console.error("Error fetching report details:", error);
//         }
//       }
//     };

//     fetchReportDetails();
//   }, [reportId, token]);

//   if (!report) {
//     return <p>Loading...</p>;
//   }

//   const jsonToPlainText = (json) => {
//     try {
//       const obj = JSON.parse(String); // تحويل JSON إلى كائن JavaScript
//       let plainText = '';

//       const recurse = (obj, indentLevel = 0) => {
//         const indent = ' '.repeat(indentLevel * 2); // التحكم في المسافة البادئة لكل مستوى
//         for (const key in obj) {
//           if (typeof obj[key] === 'object' && obj[key] !== null) {
//             plainText += `${indent}${key}:\n`;
//             recurse(obj[key], indentLevel + 1); // استدعاء الدالة نفسها بشكل متكرر لكل كائن داخلي
//           } else {
//             plainText += `${indent}${key}: ${obj[key]}\n`;
//           }
//         }
//       };

//       recurse(obj);
//       return plainText.trim(); // إرجاع النص النهائي مع إزالة الفراغات الزائدة

//     } catch (error) {
//       return json; // إعادة النص الأصلي إذا لم يكن JSON صالحًا
//     }
//   };

//   return (
//     <div className='modal'>
//       <div className='modal-content'>
//         <span className='close' onClick={onClose}>
//           <FontAwesomeIcon icon={faTimes} />
//         </span>
//         <p><strong>Report Id: </strong>{report.id}</p>
//         <p><strong>Report Type:</strong> {report.report_type}</p>
//         <p><strong>Generated At:</strong> {report.generated_at}</p>
//         <p><strong>Report Content:</strong></p>
//         <p>{jsonToPlainText(report.data)}</p> {/* عرض النص العادي */}
//       </div>
//     </div>
//   );
// }

// export default ReportsDetails;


// import React, { useContext, useEffect, useState } from 'react';
// import { User } from '../Context/UserContext';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';

// function ReportsDetails({ reportId, onClose }) {
//   const context = useContext(User);
//   const token = context.auth.token;
//   const [report, setReport] = useState(null);

//   useEffect(() => {
//     const fetchReportDetails = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/api/reports/${reportId}/`, {
//           headers: {
//             Accept: "application/json",
//             Authorization: "Bearer " + token,
//           },
//         });
//         setReport(response.data);
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           window.location.href = '/login';
//         } else {
//           console.error("Error fetching report details:", error);
//         }
//       }
//     };

//     fetchReportDetails();
//   }, [reportId, token]);

//   if (!report) {
//     return <p>Loading...</p>;
//   }

//   const formatJson = (json) => {
//     try {
//       return JSON.stringify(JSON.parse(json), null, 2); // Converts JSON to a formatted string
//     } catch (error) {
//       return json; // Return the original data if it's not valid JSON
//     }
//   };

//   return (
//     <div className='modal'>
//       <div className='modal-content'>
//         <span className='close' onClick={onClose}>
//           <FontAwesomeIcon icon={faTimes} />
//         </span>
//         <p><strong>Report Id: </strong>{report.id}</p>
//         <p><strong>Report Type:</strong> {report.report_type}</p>
//         <p><strong>Generated At:</strong> {report.generated_at}</p>
//         <p><strong>Report Content:</strong></p>
//         <p>{formatJson(report.data)}</p> {/* Display formatted JSON */}
//       </div>
//     </div>
//   );
// }

// export default ReportsDetails;


// import React, { useContext, useEffect, useState } from 'react';
// import { User } from '../Context/UserContext';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';

// function ReportsDetails({ reportId, onClose }) {
//   const context = useContext(User);
//   const token = context.auth.token;
//   const [report, setReport] = useState(null);

//   useEffect(() => {
//     const fetchReportDetails = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/api/reports/${reportId}/`, {
//           headers: {
//             Accept: "application/json",
//             Authorization: "Bearer " + token,
//           },
//         });
//         setReport(response.data);
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           window.location.href = '/login';
//         } else {
//           console.error("Error fetching report details:", error);
//         }
//       }
//     };

//     fetchReportDetails();
//   }, [reportId, token]);

//   if (!report) {
//     return <p>Loading...</p>;
//   }

//   const truncateText = (text, maxLength) => {
//     if (text.length > maxLength) {
//       return text.slice(0, maxLength) + '...';
//     }
//     return text;
//   };

//   return (
//     <div className='modal'>
//       <div className='modal-content'>
//         <span className='close' onClick={onClose}>
//           <FontAwesomeIcon icon={faTimes} />
//         </span>
//         <p><strong>Report Id: </strong>{report.id}</p>
//         <p><strong>Report Type:</strong> {report.report_type}</p>
//         <p><strong>Generated At:</strong> {report.generated_at}</p>
//         <p title={report.data}><strong>Report Content:</strong> {truncateText(report.data, 500)}</p>
//       </div>
//     </div>
//   );
// }

// export default ReportsDetails;



// import React, { useContext, useEffect, useState } from 'react';
// import { User } from '../Context/UserContext';
// import axios from 'axios';
// //  import './Product.css'; // أضف الأنماط المناسبة
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';

// function ReportsDetails({ reportId , onClose }) {
//     const context = useContext(User);
//     const token = context.auth.token;
//     const [report, setReport] = useState(null);
  
//     useEffect(() => {
//       const fetchReportDetails = async () => {
//         try {
//           const response = await axios.get(`http://127.0.0.1:8000/api/reports/${reportId}/`, {
//             headers: {
//               Accept: "application/json",
//               Authorization: "Bearer " + token,
//             },
//           });
//           setReport(response.data);
//         } catch (error) {
//           if (error.response && error.response.status === 401) {
//             window.location.href = '/login';
//           } else {
//             console.error("Error fetching report details:", error);
//           }
//         }
//       };
  
//       fetchReportDetails();
//     }, [reportId, token]);
  
//     if (!report) {
//       return <p>Loading...</p>;
//     }

//     const truncateText = (text, maxLength) => {
//         if (text.length > maxLength) {
//           return text.slice(0, maxLength) + '...';
//         }
//         return text;
//       };
//   return (
//     <div className='modal'>
//     <div className='modal-content'>
//       <span className='close' onClick={onClose}><FontAwesomeIcon icon={faTimes} /></span>
//       <p><strong>Report Id: </strong>{report.id}</p>
//       <p><strong>Report Type:</strong> {report.report_type}</p>
//       <p><strong>Generated At:</strong> {report.generated_at}</p>

//       <p title={report.data}><strong>Report Content:</strong> {truncateText(report.data, 50)}</p>
    
      
      
      
//     </div>
//   </div>
//   )
// }

// export default ReportsDetails;