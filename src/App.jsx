import { useState, useMemo, useCallback } from "react";
import "./App.css";
import { useForm } from "./hooks/useForm";
import { calculateBroadcastIP, calculateNetworkIP, calculateUtilsIPs, calculateUtilsIPsRange, determineIPClass, isPrivateIP, calculateNetworkAndHostPortion, generateIPByIndex } from "./utils/ipv4Service";

const IPList = ({ utilsIPs }) => {
  const [visibleStart, setVisibleStart] = useState(0);
  const itemsPerPage = 200; 
  const itemHeight = 40; 
  const containerHeight = 400; 
  
  const totalItems = utilsIPs.totalCount;
  const visibleEnd = Math.min(visibleStart + itemsPerPage, totalItems);
  
  // Generar las IPs visibles dinámicamente
  const visibleIPs = useMemo(() => {
    const ips = [];
    for (let i = visibleStart; i < visibleEnd; i++) {
      ips.push({
        index: i,
        ip: generateIPByIndex(utilsIPs.firstIPNum, i)
      });
    }
    return ips;
  }, [visibleStart, visibleEnd, utilsIPs.firstIPNum]);
  
  const handleNext = useCallback(() => {
    if (visibleEnd < totalItems) {
      setVisibleStart(prev => Math.min(prev + itemsPerPage, totalItems - itemsPerPage));
    }
  }, [visibleEnd, totalItems, itemsPerPage]);
  
  const handlePrev = useCallback(() => {
    setVisibleStart(prev => Math.max(prev - itemsPerPage, 0));
  }, [itemsPerPage]);
  
  const handleJumpToPage = useCallback((pageNumber) => {
    const newStart = (pageNumber - 1) * itemsPerPage;
    setVisibleStart(Math.max(0, Math.min(newStart, totalItems - itemsPerPage)));
  }, [itemsPerPage, totalItems]);
  
  const currentPage = Math.floor(visibleStart / itemsPerPage) + 1;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
        <div className="text-sm text-gray-600">
          Mostrando {visibleStart + 1} - {visibleEnd} de {totalItems.toLocaleString()} IPs
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={visibleStart === 0}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 text-sm"
          >
            ← Anterior
          </button>
          <span className="text-sm">
            Página {currentPage} de {totalPages.toLocaleString()}
          </span>
          <button
            onClick={handleNext}
            disabled={visibleEnd >= totalItems}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 text-sm"
          >
            Siguiente →
          </button>
        </div>
      </div>
      
      <div 
        className="border border-gray-300 rounded-lg"
        style={{ height: containerHeight, overflow: 'auto' }}
      >
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-1 p-2">
          {visibleIPs.map(({ index, ip }) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded p-2 text-center hover:bg-blue-50 transition-colors cursor-pointer"
              title={`IP #${index + 1}`}
            >
              <span className="text-xs font-mono text-gray-700">{ip}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-2 text-sm">
        <span>Ir a página:</span>
        <input
          type="number"
          min="1"
          max={totalPages}
          className="w-20 px-2 py-1 border rounded text-center"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              const pageNum = parseInt(e.target.value);
              if (pageNum >= 1 && pageNum <= totalPages) {
                handleJumpToPage(pageNum);
              }
            }
          }}
        />
        <span>de {totalPages.toLocaleString()}</span>
      </div>
    </div>
  );
};

function App() {
  const initialForm = {
    ip: "",
    subnetMask: "",
  };


  const { formState, setFormState, onInputChange, validateIP, validateSubnetMask } = useForm(initialForm);

  const { ip, subnetMask } = formState;

  const [networkIP, setNetworkIP] = useState("");
  const [broadcastIP, setBroadcastIP] = useState("");
  const [utilsIPs, setUtilsIPs] = useState([]);
  const [utilsIPsRange, setUtilsIPsRange] = useState("");
  const [IPClass, setIPClass] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [binaryData, setBinaryData] = useState(null);

  const sendResults = (ip, subnetMask) => {
    const newNetworkIP = calculateNetworkIP(ip, subnetMask);
    const newBroadcastIP = calculateBroadcastIP(ip, subnetMask);
    const newUtilsIPs = calculateUtilsIPs(newNetworkIP, newBroadcastIP);
    const newUtilsIPsRange = calculateUtilsIPsRange(newUtilsIPs);
    const newIPClass = determineIPClass(ip);
    const newIsPrivate = isPrivateIP(ip);
    const newBinaryData = calculateNetworkAndHostPortion(ip, subnetMask);

    setNetworkIP(newNetworkIP);
    setBroadcastIP(newBroadcastIP);
    setUtilsIPs(newUtilsIPs);
    setUtilsIPsRange(newUtilsIPsRange);
    setIPClass(newIPClass);
    setIsPrivate(newIsPrivate);
    setBinaryData(newBinaryData);

    setShowResults(true);

  };

  return (
    <main className="m-8">
      <h1 className="text-2xl font-bold">Calculadora de IPv4</h1>
      <div className="flex flex-col bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm gap-4">
        <div>
          <label htmlFor="ip">Dirección IP:</label>
          <input
            className="mx-2 border-[1px] rounded-md p-0.5"
            type="text"
            value={ip}
            name="ip"
            onChange={onInputChange}
          />
        </div>
        <div>
          <label htmlFor="ip">Máscara de subred:</label>
          <input
            className="mx-2 border-[1px] rounded-md p-0.5"
            type="text"
            value={subnetMask}
            name="subnetMask"
            onChange={onInputChange}
          />
        </div>
        <div>
          <button
            className="bg-green-600 p-3 rounded-lg cursor-pointer disabled:opacity-50"
            onClick={() => sendResults(ip, subnetMask)}
            disabled={!ip || !subnetMask || !validateIP(ip) || !validateSubnetMask(subnetMask)}
          >
            Calcular datos
          </button>
        </div>
      </div>
      {showResults && (
        <div className="mt-6 space-y-6">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
              Información de la IP
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-600 font-medium">IP de Red</p>
                <p className="text-lg font-mono text-blue-800">{networkIP}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <p className="text-sm text-purple-600 font-medium">IP de Broadcast</p>
                <p className="text-lg font-mono text-purple-800">{broadcastIP}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-sm text-green-600 font-medium">Rango de IPs Útiles</p>
                <p className="text-lg font-mono text-green-800">{utilsIPsRange}</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-600 font-medium">Clase de IP</p>
                <p className="text-lg font-semibold text-amber-800">Clase {IPClass}</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full border">
                <span className="text-sm font-medium mr-2">Tipo:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  isPrivate 
                    ? "bg-red-100 text-red-800 border border-red-300" 
                    : "bg-green-100 text-green-800 border border-green-300"
                }`}>
                  {isPrivate ? "IP Privada" : "IP Pública"}
                </span>
              </div>
            </div>
          </div>

          {utilsIPs && utilsIPs.totalCount > 0 && (
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                IPs Útiles ({utilsIPs.totalCount.toLocaleString()} disponibles)
              </h2>
              <IPList utilsIPs={utilsIPs} />
            </div>
          )}

          {binaryData && (
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                Representación Binaria
              </h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-700">Dirección IP: {ip}</h3>
                    <div className="flex gap-4 text-sm">
                      <span className="flex items-center">
                        <span className="w-3 h-3 bg-red-500 rounded mr-2"></span>
                        Red ({binaryData.networkBits} bits)
                      </span>
                      <span className="flex items-center">
                        <span className="w-3 h-3 bg-green-500 rounded mr-2"></span>
                        Host ({binaryData.hostBits} bits)
                      </span>
                    </div>
                  </div>
                  <div className="font-mono text-lg bg-white p-3 rounded border border-gray-300 tracking-wider">
                    <span className="text-red-600 font-bold bg-red-50 px-1 rounded">
                      {binaryData.networkPortion}
                    </span>
                    <span className="text-green-600 font-bold bg-green-50 px-1 rounded">
                      {binaryData.hostPortion}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-3">Máscara de Subred: {subnetMask}</h3>
                  <div className="font-mono text-lg bg-white p-3 rounded border border-gray-300 tracking-wider">
                    <span className="text-gray-800">{binaryData.maskBinary}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default App;
