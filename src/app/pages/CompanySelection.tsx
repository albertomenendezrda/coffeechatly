import { Link } from "react-router";
import { Check } from "lucide-react";
import { useState } from "react";

const industries = [
  { id: "consulting", name: "Consulting" },
  { id: "banking", name: "Banking" },
  { id: "tech", name: "Big Tech" },
  { id: "pe", name: "Private Equity" },
  { id: "vc", name: "Venture Capital" },
  { id: "other", name: "Other" }
];

const companies = {
  consulting: [
    { id: "mckinsey", name: "McKinsey & Company", logo: "🏢" },
    { id: "bain", name: "Bain & Company", logo: "💼" },
    { id: "bcg", name: "Boston Consulting Group", logo: "📊" },
    { id: "deloitte", name: "Deloitte", logo: "🏛️" },
    { id: "accenture", name: "Accenture", logo: "⚡" },
    { id: "pwc", name: "PwC Strategy&", logo: "🔷" }
  ],
  banking: [
    { id: "goldman", name: "Goldman Sachs", logo: "💰" },
    { id: "jpmorgan", name: "JP Morgan", logo: "🏦" },
    { id: "morgan-stanley", name: "Morgan Stanley", logo: "🏛️" },
    { id: "citi", name: "Citi", logo: "🏢" },
    { id: "bofa", name: "Bank of America", logo: "🇺🇸" },
    { id: "barclays", name: "Barclays", logo: "🦅" }
  ],
  tech: [
    { id: "google", name: "Google", logo: "🔍" },
    { id: "meta", name: "Meta", logo: "📘" },
    { id: "apple", name: "Apple", logo: "🍎" },
    { id: "amazon", name: "Amazon", logo: "📦" },
    { id: "microsoft", name: "Microsoft", logo: "🪟" },
    { id: "netflix", name: "Netflix", logo: "🎬" }
  ],
  pe: [
    { id: "bain-capital", name: "Bain Capital", logo: "💎" },
    { id: "kkr", name: "KKR", logo: "👔" },
    { id: "blackstone", name: "Blackstone", logo: "⚫" },
    { id: "carlyle", name: "The Carlyle Group", logo: "🏰" },
    { id: "tpg", name: "TPG Capital", logo: "📈" },
    { id: "apollo", name: "Apollo Global", logo: "🌟" }
  ],
  vc: [
    { id: "a16z", name: "Andreessen Horowitz", logo: "🚀" },
    { id: "sequoia", name: "Sequoia Capital", logo: "🌲" },
    { id: "accel", name: "Accel", logo: "⚡" },
    { id: "greylock", name: "Greylock Partners", logo: "🔒" },
    { id: "benchmark", name: "Benchmark", logo: "📊" },
    { id: "nea", name: "NEA", logo: "🎯" }
  ],
  other: [
    { id: "nike", name: "Nike", logo: "👟" },
    { id: "p&g", name: "Procter & Gamble", logo: "🧴" },
    { id: "disney", name: "Disney", logo: "🏰" },
    { id: "tesla", name: "Tesla", logo: "⚡" },
    { id: "spacex", name: "SpaceX", logo: "🚀" },
    { id: "airbnb", name: "Airbnb", logo: "🏠" }
  ]
};

export default function CompanySelection() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("consulting");
  const [selectedCompanies, setSelectedCompanies] = useState<Set<string>>(new Set());

  const toggleCompany = (companyId: string) => {
    const newSelected = new Set(selectedCompanies);
    if (newSelected.has(companyId)) {
      newSelected.delete(companyId);
    } else {
      newSelected.add(companyId);
    }
    setSelectedCompanies(newSelected);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-1 bg-gray-900 rounded"></div>
            <div className="w-8 h-1 bg-gray-300 rounded"></div>
            <div className="w-8 h-1 bg-gray-300 rounded"></div>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Which companies interest you?
          </h1>
          <p className="text-sm text-gray-600">
            Select the companies you're considering. You can always change this later.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          {/* Industry Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-gray-200">
            {industries.map(industry => (
              <button
                key={industry.id}
                onClick={() => setSelectedIndustry(industry.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedIndustry === industry.id
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {industry.name}
              </button>
            ))}
          </div>

          {/* Company Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {companies[selectedIndustry as keyof typeof companies].map(company => {
              const isSelected = selectedCompanies.has(company.id);
              return (
                <button
                  key={company.id}
                  onClick={() => toggleCompany(company.id)}
                  className={`relative p-4 border-2 rounded-lg transition-all ${
                    isSelected
                      ? "border-gray-900 bg-gray-50"
                      : "border-gray-300 hover:border-gray-400 bg-white"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div className="text-3xl mb-2">{company.logo}</div>
                  <div className="text-sm text-gray-900 font-medium text-center">
                    {company.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Count */}
          {selectedCompanies.size > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                {selectedCompanies.size} {selectedCompanies.size === 1 ? "company" : "companies"} selected
              </p>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4">
          <Link to="/register">
            <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              Back
            </button>
          </Link>
          
          <div className="flex items-center gap-3">
            <Link to="/onboarding/cv">
              <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                Skip for now
              </button>
            </Link>
            <Link to="/onboarding/cv">
              <button
                disabled={selectedCompanies.size === 0}
                className={`px-6 py-2.5 rounded-lg text-sm transition-colors ${
                  selectedCompanies.size === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                Continue
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
