import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS Toast

const LocationForm = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [address, setAddress] = useState(initialData?.address || '');
  const [loading, setLoading] = useState(false); // Added state loading

  // Update state when initialData changes
  useEffect(() => {
    if (initialData) {
      setName(initialData.name ?? '');
      setAddress(initialData.address ?? '');
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validasi input
    if (!name.trim()) {
      toast.error('Nama lokasi tidak boleh kosong!'); // toast error
      return;
    }
    if (!address.trim()) {
      toast.error('Alamat wajib diisi!'); // toast error
      return;
    }
    setLoading(true); //  Set loading when submit form
    try {
      await onSubmit({ name, address });
      setName('');
      setAddress('');
      toast.success('Lokasi berhasil disimpan!'); // toast success
    } catch (error) {
      toast.error('Gagal menyimpan lokasi!'); // toast error
    }
    setLoading(false);
  };

  return (
    <form
    onSubmit={handleSubmit}
    className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
      {initialData ? "Edit Lokasi" : "Tambah Lokasi"}
    </h2>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Nama Lokasi
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        placeholder="Masukkan Nama Lokasi"
      />
       <p className="italic text-sm text-gray-500 mt-1">
    * Contoh: Monas (Monumen Nasional)
  </p>
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Alamat
      </label>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        placeholder="Masukkan Alamat"
      />
       <p className="italic text-sm text-gray-500 mt-1">
    * Contoh: Merdeka Square, Jakarta, Jalan Lapangan Monas, Gambir, Central Jakarta City, Jakarta 10110
  </p>
    </div>
    <button
        type="submit"
        disabled={loading} // Disable button when loading
        className={`w-full py-3 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? (
          <>
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
            Memproses...
          </>
        ) : (
          initialData ? "Perbarui" : "Simpan"
        )}
      </button>
  </form>
  );
};

export default LocationForm;
