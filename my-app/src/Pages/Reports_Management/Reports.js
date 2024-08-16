import React, { useState, useEffect, useCallback, useContext } from 'react';
import SideMenu from '../../components/SideMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMagnifyingGlass,faSackDollar,faBoxesStacked,faChartLine } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { User } from '../Context/UserContext';
import ReportsDetails from './ReportsDetails';

function Reports() {
  const [isDetailsOpen, setDetailsOpen] = useState(false);
  const [detailsReportId, setDetailsReportId] = useState(null);
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false); 
  const [selectedReportType, setSelectedReportType] = useState('');

  const context = useContext(User);
  const token = context.auth.token;

  const fetchReportsData = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/reports/', {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      setReports(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = '/login';
      } else {
        console.error("Error fetching reports data:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    fetchReportsData();
  }, [fetchReportsData]);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  const handleViewDetails = (id) => {
    setDetailsReportId(id);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setDetailsReportId(null);
  };

  const handleGenerateReportsClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleSelectReportType = (type) => {
    setSelectedReportType(type);
    setDropdownOpen(false);
  };

  useEffect(() => {
    if (selectedReportType) {
      const generateReport = async () => {
        try {
          await axios.post(
            'http://127.0.0.1:8000/api/reports/generate/',
            { report_type: selectedReportType },
            {
              headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );
          fetchReportsData();
        } catch (error) {
          console.error("Error generating report:", error);
        }
      };

      generateReport();
    }
  }, [selectedReportType, token, fetchReportsData]);

  const filteredReports = reports.filter(report =>
    report.report_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('.dropdown-list') === null && event.target.closest('.link-p') === null) {
        setDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div style={{ display: 'flex' }}>
      <SideMenu />
      <div className='table'>
        <div className='table-header'>
          <h4>All Reports</h4>
          <div style={{ display: 'flex' }}>
            <div className='home-search' style={{ backgroundColor: 'rgb(240, 240, 240)' }}>
              <label>
                <input 
                  type='text' 
                  placeholder='search here...' 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} className='fa' />
              </label>
            </div>
            <div style={{ position: 'relative', backgroundColor: 'rgb(240, 240, 240)' }}>
              <button
                className='link-p'
                style={{ width: '210px', backgroundColor: '#0079c1', color: '#ffffff' }}
                onClick={handleGenerateReportsClick}
              >
                Generate Reports
                {isDropdownOpen && (
                <div 
                  className='dropdown-list' 
                  style={{ 
                    position: 'absolute', 
                    width:'170px',
                    top: '100%', 
                    left: 0, 
                    zIndex: 1, 
                    backgroundColor: '#fff', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px', 
                    padding: '5px', 
                    boxShadow: '0px 8px 16px rgba(0,0,0,0.2)' 
                  }}
                >
                  <p onClick={() => handleSelectReportType('sales')} style={{ margin: '5px 0px ', cursor: 'pointer',padding:'10px' ,borderBottom:'1px solid #ccc'}}> <FontAwesomeIcon icon={faSackDollar} style={{ margin:'0px 7px',padding:' 0px 3px ' }} />Sales</p>
                  <p onClick={() => handleSelectReportType('activity')} style={{ margin: '5px 0px', cursor: 'pointer',padding:'10px',borderBottom:'1px solid #ccc' }}><FontAwesomeIcon icon={faChartLine} style={{ margin:'0px 7px',padding:' 0px 3px' }}/>Activity</p>
                  <p onClick={() => handleSelectReportType('inventory')} style={{ margin: '5px 0px', cursor: 'pointer',padding:'10px' }}><FontAwesomeIcon icon={faBoxesStacked} style={{ margin:'0px 7px',padding:' 0px 3px' }} />Inventory</p>
                </div>
              )}
              </button>
              
            </div>
          </div>
        </div>

        <div className='shipments-list'>
          {filteredReports.map(report => (
            <div key={report.id} className='shipment-card'>
              <p>Report Type: {report.report_type}</p>
              <p title={report.generated_at}>Generated At: {truncateText(report.generated_at, 10)}</p>
              <div className='shipment-card-actions'>
                <button onClick={() => handleViewDetails(report.id)} className='details-btn'>
                  View More Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isDetailsOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={handleCloseDetails}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
            <ReportsDetails reportId={detailsReportId} onClose={handleCloseDetails} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;



// import React, { useState, useEffect, useCallback, useContext } from 'react';
// import SideMenu from '../../components/SideMenu';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import { User } from '../Context/UserContext';
// import ReportsDetails from './ReportsDetails';

// function Reports() {
//   const [isDetailsOpen, setDetailsOpen] = useState(false);
//   const [detailsReportId, setDetailsReportId] = useState(null);
//   const [reports, setReports] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isDropdownOpen, setDropdownOpen] = useState(false); 
//   const [selectedReportType, setSelectedReportType] = useState(''); // التحكم بالنوع المختار من القائمة

//   const context = useContext(User);
//   const token = context.auth.token;

//   const fetchReportsData = useCallback(async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/reports/', {
//         headers: {
//           Accept: "application/json",
//           Authorization: "Bearer " + token,
//         },
//       });
//       setReports(response.data);
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         window.location.href = '/login';
//       } else {
//         console.error("Error fetching reports data:", error);
//       }
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchReportsData();
//   }, [fetchReportsData]);

//   const truncateText = (text, maxLength) => {
//     if (text.length > maxLength) {
//       return text.slice(0, maxLength) + '...';
//     }
//     return text;
//   };

//   const handleViewDetails = (id) => {
//     setDetailsReportId(id);
//     setDetailsOpen(true);
//   };

//   const handleCloseDetails = () => {
//     setDetailsOpen(false);
//     setDetailsReportId(null);
//   };

//   const handleGenerateReportsClick = () => {
//     setDropdownOpen(!isDropdownOpen); // تبديل حالة القائمة المنسدلة عند الضغط على الزر
//   };

//   const handleSelectReportType = (type) => {
//     setSelectedReportType(type);
//     setDropdownOpen(false); // إخفاء القائمة بعد الاختيار
//   };

//   useEffect(() => {
//     if (selectedReportType) {
//       const generateReport = async () => {
//         try {
//           await axios.post(
//             'http://127.0.0.1:8000/api/reports/generate/',
//             { report_type: selectedReportType },
//             {
//               headers: {
//                 Accept: "application/json",
//                 Authorization: "Bearer " + token,
//               },
//             }
//           );
//           // تحديث قائمة التقارير بعد التوليد
//           fetchReportsData();
//         } catch (error) {
//           console.error("Error generating report:", error);
//         }
//       };

//       generateReport();
//     }
//   }, [selectedReportType, token, fetchReportsData]);

//   const filteredReports = reports.filter(report =>
//     report.report_type.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div style={{ display: 'flex' }}>
//       <SideMenu />
//       <div className='table'>
//         <div className='table-header'>
//           <h4>All Reports</h4>
//           <div style={{ display: 'flex' }}>
//             <div className='home-search' style={{ backgroundColor: 'rgb(240, 240, 240)' }}>
//               <label>
//                 <input 
//                   type='text' 
//                   placeholder='search here...' 
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <FontAwesomeIcon icon={faMagnifyingGlass} className='fa' />
//               </label>
//             </div>
//             <div style={{ position: 'relative' }}>
//               <button
//                 className='link-p'
//                 style={{ width: '210px', backgroundColor: '#0079c1', color: '#ffffff' }}
//                 onClick={handleGenerateReportsClick}
//               >
//                 Generate Reports
//               </button>
//               {isDropdownOpen && (
//                 <div 
//                 className='dropdown-list' 
//                 style={{ 
//                   position: 'absolute', 
//                   top: '100%', 
//                   left: 0, 
//                   zIndex: 1, 
//                   backgroundColor: 'rgb(240, 240, 240)', /* لون خلفية الهيدر */
//                   border: '1px solid #ccc', 
//                   borderRadius: '4px', 
//                   padding: '10px', 
//                   boxShadow: '0px 8px 16px rgba(0,0,0,0.2)' 
//                 }}
//               >
//                   <p onClick={() => handleSelectReportType('sales')} style={{ margin: '5px 0', cursor: 'pointer' }}>Sales</p>
//                   <p onClick={() => handleSelectReportType('activity')} style={{ margin: '5px 0', cursor: 'pointer' }}>Activity</p>
//                   <p onClick={() => handleSelectReportType('inventory')} style={{ margin: '5px 0', cursor: 'pointer' }}>Inventory</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className='shipments-list'>
//           {filteredReports.map(report => (
//             <div key={report.id} className='shipment-card'>
//               <p>Report Type: {report.report_type}</p>
//               <p title={report.generated_at}>Generated At: {truncateText(report.generated_at, 10)}</p>
//               <div className='shipment-card-actions'>
//                 <button onClick={() => handleViewDetails(report.id)} className='details-btn'>
//                   View More Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {isDetailsOpen && (
//         <div className='modal'>
//           <div className='modal-content'>
//             <span className='close' onClick={handleCloseDetails}>
//               <FontAwesomeIcon icon={faTimes} />
//             </span>
//             <ReportsDetails reportId={detailsReportId} onClose={handleCloseDetails} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Reports;


// import React, { useState, useEffect, useCallback, useContext } from 'react';
// import SideMenu from '../../components/SideMenu';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import { User } from '../Context/UserContext';
// import ReportsDetails from './ReportsDetails';

// function Reports() {
//   const [isDetailsOpen, setDetailsOpen] = useState(false);
//   const [detailsReportId, setDetailsReportId] = useState(null);
//   const [reports, setReports] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isDropdownOpen, setDropdownOpen] = useState(false); // التحكم بظهور القائمة المنسدلة
//   const [selectedReportType, setSelectedReportType] = useState(''); // التحكم بالنوع المختار من القائمة

//   const context = useContext(User);
//   const token = context.auth.token;

//   const fetchReportsData = useCallback(async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/reports/', {
//         headers: {
//           Accept: "application/json",
//           Authorization: "Bearer " + token,
//         },
//       });
//       setReports(response.data);
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         window.location.href = '/login';
//       } else {
//         console.error("Error fetching reports data:", error);
//       }
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchReportsData();
//   }, [fetchReportsData]);

//   const truncateText = (text, maxLength) => {
//     if (text.length > maxLength) {
//       return text.slice(0, maxLength) + '...';
//     }
//     return text;
//   };

//   const handleViewDetails = (id) => {
//     setDetailsReportId(id);
//     setDetailsOpen(true);
//   };

//   const handleCloseDetails = () => {
//     setDetailsOpen(false);
//     setDetailsReportId(null);
//   };

//   const handleGenerateReportsClick = () => {
//     setDropdownOpen(!isDropdownOpen); // تبديل حالة القائمة المنسدلة عند الضغط على الزر
//   };

//   const handleSelectReportType = async (type) => {
//     setSelectedReportType(type);
//     setDropdownOpen(false); // إخفاء القائمة بعد الاختيار

//     try {
//       const response = await axios.post(
//         'http://127.0.0.1:8000/api/reports/generate/',
//         { report_type: type },
//         {
//           headers: {
//             Accept: "application/json",
//             Authorization: "Bearer " + token,
//           },
//         }
//       );
//       console.log(response);
//       // قم بتحديث قائمة التقارير بعد التوليد إذا كان ذلك مطلوبًا
//       fetchReportsData();
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         window.location.href = '/login';
//       } else {
//         console.error("Error fetching reports data:", error);
//       }
//     }
//   };

//   const filteredReports = reports.filter(report =>
//     report.report_type.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div style={{ display: 'flex' }}>
//       <SideMenu />
//       <div className='table'>
//         <div className='table-header'>
//           <p>All Reports</p>
//           <div style={{ display: 'flex' }}>
//             <div className='home-search' style={{ backgroundColor: 'rgb(240, 240, 240)' }}>
//               <label>
//                 <input 
//                   type='text' 
//                   placeholder='search here...' 
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <FontAwesomeIcon icon={faMagnifyingGlass} className='fa' />
//               </label>
//             </div>
//             <div style={{ position: 'relative' }}>
//               <button
//                 className='link-p'
//                 style={{ width: '210px', backgroundColor: '#0079c1', color: '#ffffff' }}
//                 onClick={handleGenerateReportsClick}
//               >
//                 Generate Reports
//               </button>
//               {isDropdownOpen && (
//                 <div className='dropdown-list' style={{ position: 'absolute', top: '100%', left: 0, zIndex: 1, backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px', padding: '10px', boxShadow: '0px 8px 16px rgba(0,0,0,0.2)' }}>
//                   <p onClick={() => handleSelectReportType('sales')} style={{ margin: '5px 0', cursor: 'pointer' }}>Sales</p>
//                   <p onClick={() => handleSelectReportType('activity')} style={{ margin: '5px 0', cursor: 'pointer' }}>Activity</p>
//                   <p onClick={() => handleSelectReportType('inventory')} style={{ margin: '5px 0', cursor: 'pointer' }}>Inventory</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className='shipments-list'>
//           {filteredReports.map(report => (
//             <div key={report.id} className='shipment-card'>
//               <p>Report Type: {report.report_type}</p>
//               <p title={report.generated_at}>Generated At: {truncateText(report.generated_at, 10)}</p>
//               <div className='shipment-card-actions'>
//                 <button onClick={() => handleViewDetails(report.id)} className='details-btn'>
//                   View More Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {isDetailsOpen && (
//         <div className='modal'>
//           <div className='modal-content'>
//             <span className='close' onClick={handleCloseDetails}>
//               <FontAwesomeIcon icon={faTimes} />
//             </span>
//             <ReportsDetails reportId={detailsReportId} onClose={handleCloseDetails} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Reports;

// import React, { useState, useEffect, useCallback, useContext } from 'react';
// import SideMenu from '../../components/SideMenu';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import { User } from '../Context/UserContext';
// import ReportsDetails from './ReportsDetails';

// function Reports() {
//   const [isDetailsOpen, setDetailsOpen] = useState(false);
//   const [detailsReportId, setDetailsReportId] = useState(null);
//   const [reports, setReports] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(''); // حالة البحث
//   const context = useContext(User);
//   const token = context.auth.token;

//   const fetchReportsData = useCallback(async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/reports/', {
//         headers: {
//           Accept: "application/json",
//           Authorization: "Bearer " + token,
//         },
//       });
//       setReports(response.data);
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         window.location.href = '/login';
//       } else {
//         console.error("Error fetching reports data:", error);
//       }
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchReportsData();
//   }, [fetchReportsData]);

//   const truncateText = (text, maxLength) => {
//     if (text.length > maxLength) {
//       return text.slice(0, maxLength) + '...';
//     }
//     return text;
//   };

//   const handleViewDetails = (id) => {
//     setDetailsReportId(id);
//     setDetailsOpen(true);
//   };

//   const handleCloseDetails = () => {
//     setDetailsOpen(false);
//     setDetailsReportId(null);
//   };

//   // تصفية التقارير بناءً على نص البحث
//   const filteredReports = reports.filter(report =>
//     report.report_type.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div style={{ display: 'flex' }}>
//       <SideMenu />
//       <div className='table'>
//         <div className='table-header'>
//           <p>All Reports</p>
//           <div style={{ display: 'flex' }}>
//             <div className='home-search' style={{ backgroundColor: 'rgb(240, 240, 240)' }}>
//               <label>
//                 <input 
//                   type='text' 
//                   placeholder='search here...' 
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)} // تحديث نص البحث
//                 />
//                 <FontAwesomeIcon icon={faMagnifyingGlass} className='fa' />
//               </label>
//             </div>
//             <button
//               className='link-p'
//               style={{ width: '210px', backgroundColor: '#0079c1', color: '#ffffff' }}
//             >
//               Generate Reports
//             </button>
//           </div>
//         </div>

//         <div className='shipments-list'>
//           {filteredReports.map(report => (
//             <div key={report.id} className='shipment-card'>
//               <p>Report Type: {report.report_type}</p>
//               <p title={report.generated_at}>Generated At: {truncateText(report.generated_at, 10)}</p>
//               <div className='shipment-card-actions'>
//                 <button onClick={() => handleViewDetails(report.id)} className='details-btn'>
//                   View More Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {isDetailsOpen && (
//         <div className='modal'>
//           <div className='modal-content'>
//             <span className='close' onClick={handleCloseDetails}>
//               <FontAwesomeIcon icon={faTimes} />
//             </span>
//             <ReportsDetails reportId={detailsReportId} onClose={handleCloseDetails} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Reports;



// import React, { useState, useEffect, useCallback, useContext } from 'react';
// import SideMenu from '../../components/SideMenu';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import { User } from '../Context/UserContext';
// import ReportsDetails from './ReportsDetails';

// function Reports() {
//   const [isDetailsOpen, setDetailsOpen] = useState(false);
//   const [detailsReportId, setDetailsReportId] = useState(null);
//   const [reports, setReports] = useState([]);
//   const context = useContext(User);
//   const token = context.auth.token;

//   const fetchReportsData = useCallback(async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/reports/', {
//         headers: {
//           Accept: "application/json",
//           Authorization: "Bearer " + token,
//         },
//       });
//       setReports(response.data);
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         window.location.href = '/login';
//       } else {
//         console.error("Error fetching shipment data:", error);
//       }
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchReportsData();
//   }, [fetchReportsData]);

//   const truncateText = (text, maxLength) => {
//     if (text.length > maxLength) {
//       return text.slice(0, maxLength) + '...';
//     }
//     return text;
//   };

//   const handleViewDetails = (id) => {
//     setDetailsReportId(id);
//     setDetailsOpen(true);
//   };

//   const handleCloseDetails = () => {
//     setDetailsOpen(false);
//     setDetailsReportId(null);
//   };

//   return (
//     <div style={{ display: 'flex' }}>
//       <SideMenu />
//       <div className='table'>
//         <div className='table-header'>
//           <p>All Reports</p>
//           <div style={{ display: 'flex' }}>
//             <div className='home-search' style={{ backgroundColor: 'rgb(240, 240, 240)' }}>
//               <label>
//                 <input type='text' placeholder='search here ...' />
//                 <FontAwesomeIcon icon={faMagnifyingGlass} className='fa' />
//               </label>
//             </div>
//             <button
//               className='link-p'
//               style={{ width: '210px', backgroundColor: '#0079c1', color: '#ffffff' }}
//             >
//               Generate Reports
//             </button>
//           </div>
//         </div>

//         <div className='shipments-list'>
//           {reports.map(report => (
//             <div key={report.id} className='shipment-card'>
//               <p>Report_Type: {report.report_type}</p>
//               <p title={report.generated_at}>Generated_At: {truncateText(report.generated_at, 10)}</p>
//               <div className='shipment-card-actions'>
//                 <button onClick={() => handleViewDetails(report.id)} className='details-btn'>
//                   View More Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {isDetailsOpen && (
//         <div className='modal'>
//           <div className='modal-content'>
//             <span className='close' onClick={handleCloseDetails}>
//               <FontAwesomeIcon icon={faTimes} />
//             </span>
//             <ReportsDetails reportId={detailsReportId} onClose={handleCloseDetails} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Reports;

// import React, { useState, useEffect, useCallback, useContext } from 'react';
// import SideMenu from '../../components/SideMenu';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes, faEye,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import { User } from '../Context/UserContext';
// import ReportsDetails from './ReportsDetails';

// function Reports() {
//   const [isDetailsOpen, setDetailsOpen] = useState(false);
//   const [detailsReportId, setDetailsReportId] = useState(null);
//   const [reports, setReports] = useState([]);
//   const context = useContext(User);
//   const token = context.auth.token;

//   const fetchReportsData = useCallback(async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/reports/', {
//         headers: {
//           Accept: "application/json",
//           Authorization: "Bearer " + token,
//         },
//       });
//       setReports(response.data);
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         window.location.href = '/login';
//       } else {
//         console.error("Error fetching shipment data:", error);
//       }
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchReportsData();
//   }, [fetchReportsData]);

//   const truncateText = (text, maxLength) => {
//     if (text.length > maxLength) {
//       return text.slice(0, maxLength) + '...';
//     }
//     return text;
//   };


//   const handleViewDetails = (id) => {
//     setDetailsReportId(id);
//     setDetailsOpen(true);
//   };
//   return (
//     <div style={{ display: 'flex' }}>
//       <SideMenu />
//       <div className='table'>
//         <div className='table-header'>
//           <p>All Reports</p>
//           <div style={{ display: 'flex' }}>
//           <div className='home-search' style={{ backgroundColor:'rgb(240, 240, 240)' }}>
//                 <label>
//                   <input type='text' placeholder='search here ...'/>
//                   <FontAwesomeIcon icon={faMagnifyingGlass} className='fa'/>
//                 </label>
//               </div>
//             <button
//               className='link-p'
//               style={{ width: '210px', backgroundColor: '#0079c1', color: '#ffffff' }}
//             >
//               Generate Reports
//             </button>
//           </div>
//         </div>
        
//         <div className='shipments-list'>
//           {reports.map(reports => (
//             <div key={reports.id} className='shipment-card'>
            
//               <p>Report_Type: {reports.report_type}</p>

//               <p title={reports.generated_at}>Generated_At: {truncateText(reports.generated_at, 10)}</p>
//               <div className='shipment-card-actions'>
//                 <button onClick={() => handleViewDetails(reports.id)} className='details-btn'>
//                   View More Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
      

//       {isDetailsOpen && (
//         <div className='modal'>
//           <div className='modal-content'>
//             <span className='close' onClick={() => setDetailsOpen(false)}>
//               <FontAwesomeIcon icon={faTimes} />
//             </span>
//             <ReportsDetails reportId={detailsReportId} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Reports;