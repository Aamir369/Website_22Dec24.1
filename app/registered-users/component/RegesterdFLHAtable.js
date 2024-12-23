import { useAuth } from "@/components/providers/AuthProvider";
import { db } from "@/lib/firebase/firebaseInit";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { DateTimeUtility } from "@/lib/utils/DateTimeUtility";
import { exportToExcel, exportToPDF } from "./export";

const RegesterdFLHATable = ({
  currentCompanyName,
  admin,
  sortBy = "name",
  sortDirection = "asc",
}) => {
  const [items, setItems] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const  environmentalHazards = [
    'Work area clean and house keeping',
    'Material storage identified',
    'Dust/Mist/Fumes',
    'Noise in area',
    'Extreme temperatures',
    'Spill potential',
    'Waste Properly Managed',
    'Excavation Permit Required',
    'Other Workers In Area',
    'Weather Conditions',
    'MSDS Reviewed',
  ];

  const ergonomicsHazards = [
    'Awkward body Position',
    'Over extension',
    'Prolonged twisting/bending motion',
    'Working in tight area',
    'List too heavy / awkward to lift',
    'Hands not in line of sight',
    'Working above your head'
  ];

  const accessEgressHazards = [
    'Site Access/ road conditions',
    'Scaffold',
    'Ladders (tied off)',
    'Slips / Trips',
    'Hoisting (tools, equipment etc)',
    'Excavation (alarms, routes, ph#)',
    'Confined space entry permit required'
  ];

   const overHeadUnderGroundHazards = [
    'Barricades & signs in place',
    'Scaffold',
    'Ladders (tied off)',
    'Slips / Trips',
    'Hoisting (tools, equipment etc)',
    'Excavation (alarms, routes, ph#)',
    'Confined space entry permit required'
  ];

   const equipmentVacTruckHazards = [
  "Proper tools for the the job",
  "Equipment / tools inspected",
  "Tank plumbing",
  "Hoses inspected",
  "High pressure",
  "High temperature fluids",
  ];

   const personalLimitationsHazards = [
    "Procedure not available for task",
    "Confusing instructions",
    "No training for task or tools to be used",
    "First time performing the task",
    "Working alone",
    "PPE inspected / used properly",
  ];

  const sortData = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      if (sortBy === "name") {
        return sortDirection === "asc"
          ? a.user_name.localeCompare(b.user_name)
          : b.user_name.localeCompare(a.user_name);
      } else if (sortBy === "date") {
        const dateA = new Date(a.data.date);
        const dateB = new Date(b.data.date);
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });
    return sortedData;
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "FLHA"));
        const flhaData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id, // Optionally include document ID
        }));

        let updatedSelectedData = flhaData;
        if (!admin && currentCompanyName) {
          updatedSelectedData = flhaData.filter(
            (item) => item.company_name === currentCompanyName
          );
        }

        // Sort the data
        updatedSelectedData = sortData(updatedSelectedData);

        setItems(flhaData);
        setSelectedData(updatedSelectedData);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchItems();
  }, [admin, currentCompanyName, sortBy, sortDirection]);

  return (
    <div className="overflow-x-auto">
      <div class="flex justify-between items-center py-4">
      <h2 class="text-lg font-semibold">User FLHA Informatione</h2>
      <button onclick="exportHtmlToPdf('flha-table', 'FLHA')">Download PDF</button>
    </div>
      <table className="min-w-full divide-y divide-gray-200 border border-gray-100" id="flha-table">
        <thead className="bg-yellow-100 w-full">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name & Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              PPE Inspected
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Submitted Date and Time
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider bg-gray-500"
            >
             Environmental Hazard
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
              Ergonomics Hazards
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-gray-500"
            >
             Access Egress Hazards
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
            Over Head Under Ground Hazards
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-gray-500"
            >
            Equipment Vac Truck Hazards
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
             Personal Limitations Hazards
            </th>

            <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider bg-gray-500"
            >
            All Hazard Remaining
            </th>
            <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider bg-gray-500"
            >
            All Permits Closed Out
            </th>
            <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider bg-gray-500"
            >
            Any Incident
            </th>
            <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider bg-gray-500"
            >
            Area Cleaned Up At End
            </th>
            <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider bg-gray-500"
            >
            Master Point Location
            </th>
            <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider bg-gray-500"
            >
            Signature
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {selectedData.map((flha, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white border-b" : "bg-gray-50 border-b"}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {flha.user_name} <br />
                  {flha.user_email}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {flha.data.ppe_inspected ? "True" : "False"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  <DateTimeUtility timestamp={flha.submitted_at}></DateTimeUtility>
                </div>
              </td>
              <td className="p-4">
              {flha.data.flhf.map((item, index) => (
                <ul key={index} className="px-4 whitespace-nowrap list-disc list-inside">
                  <li className="text-sm font-medium text-gray-900">
                   {environmentalHazards[index]} : {item}
                  </li>
                </ul>
              ))}
              </td>

              <td className="p-4">
              {flha.data.ergonomics.map((item, index) => (
                 <ul key={index} className="px-4 whitespace-nowrap list-disc list-inside">
                  <li className="text-sm font-medium text-gray-900">
                   {ergonomicsHazards[index]} : {item}
                  </li>
                </ul>
              ))}
              </td>
              
              <td className="p-4">
              {flha.data.aeHazards.map((item, index) => (
                 <ul key={index} className="px-4 whitespace-nowrap list-disc list-inside">
                  <li className="text-sm font-medium text-gray-900">
                  {accessEgressHazards[index]} :{item}
                  </li>
                </ul>
              ))}
              </td>
              <td className="p-4">
                {flha.data.ouHazards.map((item, index) => (
                 <ul key={index} className="px-4 whitespace-nowrap list-disc list-inside">
                  <li className="text-sm font-medium text-gray-900">
                    {overHeadUnderGroundHazards[index]} : {item}
                  </li>
                </ul>
              ))}
              </td>

              <td className="p-4">
               {flha.data.evtHazards.map((item, index) => (
                 <ul key={index} className="px-4 whitespace-nowrap list-disc list-inside">
                  <li className="text-sm font-medium text-gray-900">
                   {equipmentVacTruckHazards[index]}  : {item}
                  </li>
                </ul>
              ))}
               </td>
               
               <td className="p-4">
               {flha.data.plHazards.slice(0,-1).map((item, index) => (
                <ul key={index} className="px-4 whitespace-nowrap list-disc list-inside">
                  <li className="text-sm font-medium text-gray-900">
                    {personalLimitationsHazards[index]} : {item}
                  </li>
                </ul>
              ))}
               </td>

               <td  className="px-6 py-4 whitespace-nowrap">
                 <div className="text-sm font-medium text-gray-900">
                    {flha.data.job_completion.all_hazard_remaining ? "True" : "False"}
                 </div>
               </td>
               <td  className="px-6 py-4 whitespace-nowrap">
                 <div className="text-sm font-medium text-gray-900">
                    {flha.data.job_completion.all_permits_closed_out ? "True" : "False"}
                 </div>
               </td>
               <td  className="px-6 py-4 whitespace-nowrap">
                 <div className="text-sm font-medium text-gray-900">
                    {flha.data.job_completion.any_incident ? "True" : "False"}
                 </div>
               </td>
               <td  className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                     {flha.data.job_completion.area_cleaned_up_at_end ? "True" : "False"}
                  </div>
               </td>
               <td  className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                     {flha.data.master_point_location}
                  </div>
               </td>
               <td  className="px-6 py-4 whitespace-nowrap">
              <img src={flha.data.signature_url} alt={flha.data.signature_url} style={{ width: '100px', height: '50px' }} />
               </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegesterdFLHATable;
