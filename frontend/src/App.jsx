import Home from './pages/Home';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Home />
      <ToastContainer className="max-w-md w-full p-3 m-2 text-sm  text-white rounded-lg transition-all" position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={true} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default App;
