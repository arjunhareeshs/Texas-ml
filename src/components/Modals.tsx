import React from 'react';
import { X, ExternalLink, ShieldCheck, FileSpreadsheet, Send, Info, BookOpen } from 'lucide-react';
import { ActiveTab } from '../types';

interface ModalsProps {
  activeModal: string | null;
  onClose: () => void;
  infoTab?: ActiveTab;
}

export const Modals: React.FC<ModalsProps> = ({ activeModal, onClose, infoTab }) => {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150 select-none">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="h-14 bg-[#2C3E50] px-5 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="font-bold text-base">
              {activeModal === 'about' && 'About TDIS'}
              {activeModal === 'projects' && 'TDIS Projects & Tools List'}
              {activeModal === 'intake' && 'Application Intake'}
              {activeModal === 'contact' && 'Contact TDIS'}
              {activeModal === 'disclaimer' && 'Terms of Use & Data Disclaimer'}
              {activeModal === 'info' && 'Layer Technical Specification'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-slate-700 text-sm leading-relaxed">
          {activeModal === 'about' && (
            <>
              <p>
                The <strong>Texas Disaster Information System (TDIS)</strong> is an initiative spearheaded by the Texas Division of Emergency Management (TDEM) in collaboration with Texas A&amp;M University and state research partners.
              </p>
              <p>
                TDIS bridges cutting-edge data science, GIS spatial analytics, and emergency management workflows to deliver actionable intelligence before, during, and after major disaster events across Texas.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">Key Objectives:</h4>
                <ul className="list-disc pl-4 space-y-1 text-xs text-slate-600">
                  <li>Standardize hazard risk models across 254 Texas counties.</li>
                  <li>Provide sub-county flash flood and hazard severity indices.</li>
                  <li>Aggregate utility outage feeds into real-time operational layers.</li>
                </ul>
              </div>
            </>
          )}

          {activeModal === 'projects' && (
            <>
              <p className="text-xs text-slate-500">
                Active GIS and modeling tools developed under the TDIS emergency intelligence suite:
              </p>
              <div className="space-y-2.5">
                {[
                  { name: 'Hazard Severity Index (HSI)', desc: 'Short-term predictive metric for rainfall and severe weather threats calibrated to emergency planning thresholds.' },
                  { name: 'Texas Impact Forecast (TIF/LTS)', desc: 'H3-indexed high-resolution flash flood inundation outlook engine.' },
                  { name: 'Infrastructure Situational Awareness (ISA)', desc: 'Automated electric grid and utility outage monitoring dashboard.' },
                  { name: 'Flood Hub Coastal Surge Model', desc: 'ADCIRC hydrodynamic surge simulations for Texas coastal waterways.' }
                ].map((item, i) => (
                  <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="font-bold text-slate-800 text-sm flex items-center justify-between">
                      <span>{item.name}</span>
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">Active</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeModal === 'intake' && (
            <>
              <p>
                Authorized local government officials, emergency coordinators, and university partners can submit requests for custom GIS data layers or analytical modeling support.
              </p>
              <form onSubmit={(e) => { e.preventDefault(); alert('Request submitted successfully to TDIS portal.'); onClose(); }} className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Agency / Jurisdiction</label>
                  <input type="text" required placeholder="e.g., Harris County Office of Emergency Management" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Point of Contact Email</label>
                  <input type="email" required placeholder="name@agency.texas.gov" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Project Description &amp; Scope</label>
                  <textarea rows={3} placeholder="Describe the disaster management dataset or layer required..." className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs" />
                </div>
                <button type="submit" className="w-full py-2 bg-[#2C3E50] text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors">
                  Submit Intake Application
                </button>
              </form>
            </>
          )}

          {activeModal === 'contact' && (
            <div className="space-y-3">
              <p>For operational inquiries or data questions:</p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <div>
                  <span className="font-bold text-slate-800 block">Texas Disaster Information System Support</span>
                  <span className="text-slate-500">Email: support@tdis.texas.gov</span>
                </div>
                <div>
                  <span className="font-bold text-slate-800 block">Texas A&amp;M University GIS Operations</span>
                  <span className="text-slate-500">College Station, TX 77843</span>
                </div>
              </div>
            </div>
          )}

          {activeModal === 'disclaimer' && (
            <>
              <h4 className="font-bold text-slate-900">Terms of Use &amp; Limitations of Data</h4>
              <p className="text-xs text-slate-600">
                Data presented on this map is generated for situational awareness and emergency management planning purposes only.
              </p>
              <p className="text-xs text-slate-600">
                Model outputs, weather feeds, and utility outage reports reflect asynchronous updates from upstream data providers and may include latency or incomplete reporting.
              </p>
              <p className="text-xs text-slate-600">
                This dashboard does not supersede or replace official National Weather Service (NWS) watches, warnings, or evacuation orders issued by local and state emergency management authorities.
              </p>
            </>
          )}

          {activeModal === 'info' && (
            <>
              {infoTab === 'hazard' && (
                <>
                  <h4 className="font-bold text-slate-900">Hazard Severity Index (HSI) Methodology</h4>
                  <p className="text-xs text-slate-600">
                    HSI layers synthesize multi-sensor precipitation observations, radar-derived quantitative precipitation estimates (QPE), and hydrological antecedent moisture indices.
                  </p>
                  <p className="text-xs text-slate-600">
                    The values are dimensionless indices normalized across Texas climates. A value of <strong>~1.0</strong> denotes a significant planning threshold where localized drainage systems approach capacity. Values exceeding <strong>2.0</strong> indicate extreme events with high probabilities of widespread structural and infrastructure compromise.
                  </p>
                </>
              )}
              {infoTab === 'impact' && (
                <>
                  <h4 className="font-bold text-slate-900">Texas Impact Forecast (TIF / LTS) Methodology</h4>
                  <p className="text-xs text-slate-600">
                    The LTS (Local Threat Severity) flash flood outlook identifies projected impacts on discrete Uber H3 hexagonal spatial units (Resolution 8).
                  </p>
                  <p className="text-xs text-slate-600">
                    Severity ratings 4 (Potentially High) and 5 (Potentially Very High) indicate rapid runoff velocity intersecting with critical asset points such as electrical substations, hospital access routes, and residential structures.
                  </p>
                </>
              )}
              {infoTab === 'infrastructure' && (
                <>
                  <h4 className="font-bold text-slate-900">Power Outage Data Pipeline</h4>
                  <p className="text-xs text-slate-600">
                    Power outage metrics are compiled directly from utility company Automated Metering Infrastructure (AMI) and public utility outage portals (CenterPoint Energy, Oncor, CPS Energy, AEP Texas, Entergy, and local electric cooperatives).
                  </p>
                  <p className="text-xs text-slate-600">
                    Data updates on automated 15-minute polling cycles. Total tracked customers represents meters within covered service territories across Texas.
                  </p>
                </>
              )}
              {infoTab === 'weather' && (
                <>
                  <h4 className="font-bold text-slate-900">NEXRAD Doppler Radar Network</h4>
                  <p className="text-xs text-slate-600">
                    Composited base reflectivity layers derived from WSR-88D dual-polarization Doppler radar stations located across Texas (KHGX Houston, KEWX Austin/San Antonio, KFWS Dallas/Fort Worth, KAMA Amarillo, KMAF Midland, and KBRO Brownsville).
                  </p>
                </>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#2C3E50] text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
