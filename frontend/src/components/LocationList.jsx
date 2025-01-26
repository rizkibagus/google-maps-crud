import { FiEdit, FiTrash2 } from "react-icons/fi";
const LocationList = ({ locations, onEdit, onDelete }) => {
    return (
      <div className="mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Daftar Lokasi
      </h2>
      {locations.length === 0 ? (
        <p className="text-gray-500 text-center">Belum ada lokasi yang ditambahkan.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <div
              key={location._id}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {location.name}
                </h3>
                <p className="text-sm text-gray-600">{location.address}</p>
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => onEdit(location)}
                  className="w-1/2 mr-2 px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all flex items-center justify-center gap-2"
                >
                    <FiEdit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => onDelete(location._id)}
                  className="w-1/2 ml-2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all flex items-center justify-center gap-2"
                >
                   <FiTrash2 size={16} />
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    );
  };
  
  export default LocationList;
  