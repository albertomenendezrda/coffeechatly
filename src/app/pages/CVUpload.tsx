import { Link } from "react-router";
import { Upload, FileText, X } from "lucide-react";
import { useState } from "react";

export default function CVUpload() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-1 bg-gray-900 rounded"></div>
            <div className="w-8 h-1 bg-gray-900 rounded"></div>
            <div className="w-8 h-1 bg-gray-300 rounded"></div>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Upload your CV (Optional)
          </h1>
          <p className="text-sm text-gray-600">
            Help us personalize your coffee chat strategy. You can upload this later.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white border border-gray-300 rounded-lg p-8 mb-6">
          {!uploadedFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                isDragging
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              
              <h3 className="text-base font-medium text-gray-900 mb-2">
                Drop your CV here, or click to browse
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Supports PDF, DOC, DOCX (Max 10MB)
              </p>

              <label
                htmlFor="file-upload"
                className="inline-block px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Choose File
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileSelect}
              />
            </div>
          ) : (
            <div className="border border-gray-300 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {uploadedFile.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {(uploadedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={removeFile}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Remove file"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          )}

          {/* Benefits */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Why upload your CV?
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Get personalized conversation talking points based on your experience</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Receive tailored questions that highlight your strengths</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Connect with contacts who have similar backgrounds</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4">
          <Link to="/onboarding/companies">
            <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              Back
            </button>
          </Link>
          
          <div className="flex items-center gap-3">
            <Link to="/">
              <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                Skip for now
              </button>
            </Link>
            <Link to="/">
              <button className="px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors">
                {uploadedFile ? "Complete Setup" : "Finish"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
