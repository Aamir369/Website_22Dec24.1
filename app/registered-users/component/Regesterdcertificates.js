const Regesterdcertificates = ({ certificates }) => {
  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">User Certiicates Information</h2>
      <table className="min-w-full divide-y divide-gray-200 border border-gray-100">
        <thead className="bg-yellow-100 w-full">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Hotwork
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              approved at
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              uploadedat
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              validity
            </th>   
          </tr>
        </thead>
        {/* <tbody className="divide-y divide-gray-200">
          {certificates.map((certificate, index) => (
            <tr
              key={certificate.user.Hotwork.approvedat}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {certificate.user.Hotwork.approvedat}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {certificate.user.Hotwork.link}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {certificate.user.Hotwork.uploadedat}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {certificate.user.Hotwork.validity}
                </div>
              </td> 
            </tr>
          ))}
        </tbody> */}
      </table>
    </div>
  );
};

export default Regesterdcertificates;