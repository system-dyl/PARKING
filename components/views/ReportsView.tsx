
import React, { useState, useCallback } from 'react';
import { generateReport } from '../../services/parkingService';
import { generateReportSummary } from '../../services/geminiService';
import { Vehicle } from '../../types';

const ReportsView: React.FC = () => {
  const [reportData, setReportData] = useState<Vehicle[] | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  const handleGenerateReport = useCallback(() => {
    setIsLoading(true);
    setSummary('');
    generateReport().then(data => {
      setReportData(data);
      setIsLoading(false);
    });
  }, []);

  const handleGenerateSummary = useCallback(async () => {
    if (!reportData) return;
    setIsSummaryLoading(true);
    const reportJsonString = JSON.stringify(reportData.slice(0, 50).map(v => ({ plate: v.plate, entryTime: v.entryTime.toISOString(), type: v.type })), null, 2);
    const result = await generateReportSummary(reportJsonString);
    setSummary(result);
    setIsSummaryLoading(false);
  }, [reportData]);
  
  return (
    <div className="space-y-6">
      <div className="bg-secondary p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-text-primary">Generador de Informes</h3>
        <p className="text-text-secondary mb-4">
          Genere un informe de actividad para un período seleccionado.
        </p>
        <button
          onClick={handleGenerateReport}
          disabled={isLoading}
          className="bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-400 transition-colors disabled:bg-gray-500"
        >
          {isLoading ? 'Generando...' : 'Generar Informe Diario'}
        </button>
      </div>

      {reportData && (
        <div className="bg-secondary p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-text-primary">Informe de Actividad</h3>
            <button 
              onClick={handleGenerateSummary}
              disabled={isSummaryLoading}
              className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-500 transition-colors disabled:bg-gray-500 flex items-center"
            >
                {isSummaryLoading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>}
              {isSummaryLoading ? 'Analizando...' : 'Generar Resumen con IA'}
            </button>
          </div>
          
          {summary && (
            <div className="bg-primary p-4 rounded-lg mb-6 border border-highlight">
              <h4 className="font-semibold text-accent mb-2">Resumen de IA</h4>
              <p className="text-text-secondary whitespace-pre-wrap">{summary}</p>
            </div>
          )}

          <div className="overflow-auto max-h-96">
            <table className="w-full text-left">
              <thead className="border-b border-highlight sticky top-0 bg-secondary">
                <tr>
                  <th className="p-4 text-text-secondary font-semibold">Matrícula</th>
                  <th className="p-4 text-text-secondary font-semibold">Tipo</th>
                  <th className="p-4 text-text-secondary font-semibold">Hora de Entrada</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((vehicle, index) => (
                  <tr key={index} className="border-b border-highlight hover:bg-highlight/50">
                    <td className="p-4 font-mono text-text-primary">{vehicle.plate}</td>
                    <td className="p-4 text-text-secondary">{vehicle.type}</td>
                    <td className="p-4 text-text-secondary">{vehicle.entryTime.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsView;
