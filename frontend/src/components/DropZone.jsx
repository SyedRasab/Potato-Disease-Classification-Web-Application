import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';
import { clsx } from 'clsx';

const DropZone = ({ onFileSelected }) => {
    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles?.length > 0) {
            onFileSelected(acceptedFiles[0]);
        }
    }, [onFileSelected]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png']
        },
        maxFiles: 1
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            {...getRootProps()}
            className={clsx(
                "cursor-pointer border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 relative overflow-hidden group",
                isDragActive
                    ? "border-emerald-400 bg-emerald-500/10 scale-[1.02]"
                    : "border-gray-600 hover:border-emerald-400/50 hover:bg-white/5"
            )}
        >
            <input {...getInputProps()} />

            <div className="relative z-10 flex flex-col items-center gap-6">
                <div className={clsx(
                    "w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg",
                    isDragActive ? "bg-emerald-500 text-white" : "bg-gray-800 text-gray-400 group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110"
                )}>
                    {isDragActive ? <UploadCloud size={40} /> : <ImageIcon size={40} />}
                </div>

                <div className="space-y-2">
                    <p className="text-xl font-semibold text-gray-200 group-hover:text-white transition-colors">
                        {isDragActive ? "Drop the leaf here!" : "Drag & Drop Leaf Image"}
                    </p>
                    <p className="text-gray-400 text-sm">
                        or <span className="text-emerald-400 font-bold hover:underline cursor-pointer">browse files</span> to upload
                    </p>
                </div>

                <p className="text-xs text-gray-500 mt-2 uppercase tracking-widest">
                    Supports JPG, PNG • Max 10MB
                </p>
            </div>

            {/* Decorative Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </motion.div>
    );
};

export default DropZone;
