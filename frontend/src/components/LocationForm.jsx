import { useEffect, useState } from 'react';

const LocationForm = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [address, setAddress] = useState(initialData?.address || '');

  // Update state when initialData changes
  useEffect(() => {
    if (initialData) {
      setName(initialData.name ?? '');
      setAddress(initialData.address ?? '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address) return alert('Nama dan Alamat wajib diisi!');
    onSubmit({ name, address });
    setName('');
    setAddress('');
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
      className="w-full py-3 text-white bg-blue-600 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
    >
      {initialData ? "Perbarui" : "Simpan"}
    </button>
  </form>
  );
};

export default LocationForm;
