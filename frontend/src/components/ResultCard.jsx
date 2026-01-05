import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, Download, Activity, FileText } from 'lucide-react';

const ResultCard = ({ data, onReset }) => {
    const { class: diseaseClass, confidence } = data;

    // Logic to determine style based on disease
    let status = {
        label: 'Unknown',
        color: 'text-gray-200',
        gradient: 'from-gray-700 to-gray-800',
        shadow: 'shadow-gray-500/20',
        icon: <AlertTriangle className="w-10 h-10" />,
        description: "Unable to classify patterns."
    };

    if (diseaseClass.includes('Early_blight')) {
        status = {
            label: 'Early Blight Detected',
            color: 'text-amber-200',
            gradient: 'from-amber-600 to-amber-800',
            shadow: 'shadow-amber-500/30',
            progress: 'bg-amber-400',
            icon: <AlertTriangle className="w-10 h-10 text-white" />,
            description: "Fungal infection characterized by concentric rings on older leaves."
        };
    } else if (diseaseClass.includes('Late_blight')) {
        status = {
            label: 'Late Blight Detected',
            color: 'text-rose-200',
            gradient: 'from-rose-600 to-rose-800',
            shadow: 'shadow-rose-500/30',
            progress: 'bg-rose-400',
            icon: <XCircle className="w-10 h-10 text-white" />,
            description: "Severe disease causing black/brown lesions. Urgent action recommended."
        };
    } else if (diseaseClass.includes('healthy')) {
        status = {
            label: 'Healthy Plant',
            color: 'text-emerald-100',
            gradient: 'from-emerald-500 to-emerald-700',
            shadow: 'shadow-emerald-500/30',
            progress: 'bg-emerald-400',
            icon: <CheckCircle2 className="w-10 h-10 text-white" />,
            description: "No signs of disease detected. Plant appears vibrant and healthy."
        };
    }

    const confidencePercent = (confidence * 100).toFixed(1);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass-panel rounded-3xl overflow-hidden relative"
        >
            {/* Dynamic Header */}
            <div className={`p-8 bg-gradient-to-br ${status.gradient} relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>

                <div className="relative z-10 flex items-center gap-6">
                    <div className={`p-3 rounded-2xl bg-white/20 backdrop-blur-md shadow-lg`}>
                        {status.icon}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-wide">{status.label}</h2>
                        <p className={`mt-1 font-medium ${status.color} opacity-90`}>Automated Diagnosis</p>
                    </div>
                </div>
            </div>

            <div className="p-8 space-y-8 bg-black/20">

                {/* Confidence Section */}
                <div className="space-y-3">
                    <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2 text-gray-300">
                            <Activity size={18} className="text-emerald-400" />
                            <span className="text-sm font-medium uppercase tracking-wider">Confidence Level</span>
                        </div>
                        <span className="text-3xl font-bold text-white">{confidencePercent}%</span>
                    </div>

                    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${confidencePercent}%` }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className={`h-full rounded-full ${status.progress} shadow-[0_0_15px_rgba(255,255,255,0.4)]`}
                        />
                    </div>
                </div>

                {/* Description Box */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                        <FileText size={16} /> Analysis Report
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm">
                        {status.description} The system has analyzed texture patterns and discoloration markers to arrive at this conclusion.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4 border-t border-white/10">
                    <button
                        onClick={onReset}
                        className="flex-1 py-3 px-6 rounded-xl bg-white text-emerald-900 font-bold hover:bg-emerald-50 transition shadow-lg shadow-white/10"
                    >
                        Scan New Leaf
                    </button>
                    <button
                        className="px-6 rounded-xl border border-white/20 text-white font-medium hover:bg-white/10 transition flex items-center gap-2"
                        onClick={() => alert("PDF Report generation initiated...")}
                    >
                        <Download size={18} /> Save
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ResultCard;
