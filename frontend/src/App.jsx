import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sprout, ScanLine, Sparkles } from 'lucide-react';
import DropZone from './components/DropZone';
import ResultCard from './components/ResultCard';

const API_URL = "http://localhost:8000/predict";

function App() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleFileSelected = (selectedFile) => {
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        setResult(null);
    };

    const handlePredict = async () => {
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            // Artistic delay for "scanning" effect
            await new Promise(r => setTimeout(r, 1500));

            const response = await axios.post(API_URL, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setResult(response.data);
            toast.success("Analysis Complete!", {
                style: { background: '#10b981', color: '#fff' },
                iconTheme: { primary: '#fff', secondary: '#10b981' }
            });
        } catch (error) {
            console.error(error);
            toast.error("Connection Failed. Is Backend running?", {
                style: { background: '#ef4444', color: '#fff' }
            });
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setPreview(null);
        setResult(null);
    };

    return (
        <div className="min-h-screen text-white relative overflow-hidden selection:bg-emerald-500/30">
            <Toaster position="top-right" toastOptions={{ className: 'glass-panel text-white' }} />

            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-teal-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">

                {/* Header */}
                <motion.header
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex items-center justify-between mb-16"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl shadow-lg shadow-emerald-500/20">
                            <Sprout size={32} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                                PotatoGuard <span className="text-emerald-400">AI</span>
                            </h1>
                            <p className="text-emerald-200/60 text-sm font-medium tracking-wide uppercase">
                                Advanced Phytopathology System
                            </p>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 glass-panel rounded-full text-sm text-emerald-100/70">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        System Online
                    </div>
                </motion.header>

                <main className="grid lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Interaction */}
                    <div className="lg:col-span-5 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="prose prose-invert"
                        >
                            <h2 className="text-4xl font-bold mb-4 leading-tight">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-white to-emerald-200">
                                    Instant Disease Detection
                                </span>
                            </h2>
                            <p className="text-lg text-gray-300/80 leading-relaxed">
                                Leveraging Convolutional Neural Networks to diagnose <span className="text-emerald-400">Early Blight</span>, <span className="text-red-400">Late Blight</span>, or confirm crop health with 98% accuracy.
                            </p>
                        </motion.div>

                        <div className="glass-panel p-1 rounded-[2rem]">
                            <div className="bg-[#0f291e]/50 rounded-[1.8rem] p-6 transition-all">
                                {!preview ? (
                                    <DropZone onFileSelected={handleFileSelected} />
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="relative rounded-2xl overflow-hidden aspect-square border border-white/10 group shadow-2xl"
                                    >
                                        <img src={preview} alt="Analysis Target" className="w-full h-full object-cover" />

                                        {/* Scanning Overlay */}
                                        {loading && (
                                            <motion.div
                                                className="absolute inset-0 bg-emerald-500/10 z-10"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                <motion.div
                                                    className="w-full h-1 bg-emerald-400/80 shadow-[0_0_15px_rgba(52,211,153,0.8)]"
                                                    animate={{ top: ['0%', '100%', '0%'] }}
                                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                    style={{ position: 'absolute', left: 0 }}
                                                />
                                                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
                                                    {[...Array(36)].map((_, i) => (
                                                        <div key={i} className="border-[0.5px] border-emerald-500/20" />
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}

                                        {!loading && !result && (
                                            <button
                                                onClick={handleReset}
                                                className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-black/80 transition opacity-0 group-hover:opacity-100"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        {!result && preview && (
                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(16, 185, 129, 0.4)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handlePredict}
                                disabled={loading}
                                className="w-full py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-emerald-900/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" /> Neural Network Processing...
                                    </>
                                ) : (
                                    <>
                                        <ScanLine size={24} /> Start Analysis
                                    </>
                                )}
                            </motion.button>
                        )}
                    </div>

                    {/* Right Column: Visualization */}
                    <div className="lg:col-span-7 relative min-h-[500px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {/* Empty State */}
                            {!result && !loading && (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center space-y-6 opacity-40 select-none"
                                >
                                    <div className="w-48 h-48 mx-auto border-2 border-dashed border-white/20 rounded-full flex items-center justify-center">
                                        <Sparkles size={64} className="text-white/50" />
                                    </div>
                                    <p className="text-xl font-light tracking-wide">Ready for Specimen</p>
                                </motion.div>
                            )}

                            {/* Loading State Metrics */}
                            {loading && (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="w-full max-w-md space-y-6"
                                >
                                    {['Analyzing Texture', 'Checking Discoloration', 'Comparing with 5000+ Samples', 'Finalizing Diagnosis'].map((text, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.4 }}
                                            className="flex items-center gap-4 text-emerald-100/80"
                                        >
                                            <Loader2 size={16} className="animate-spin text-emerald-400" />
                                            <span className="font-mono text-sm tracking-wider">{text}...</span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}

                            {/* Result */}
                            {result && (
                                <motion.div key="result" className="w-full">
                                    <ResultCard data={result} onReset={handleReset} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default App;
