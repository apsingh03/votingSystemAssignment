import { useVoting } from "../contexts/VotingContext";
import { X, UserPlus, Edit3 } from "lucide-react";
import { useState, useEffect } from "react";

function CandidateModal() {
  const {
    state: { isCandidateModalOpen, editingCandidate },
    closeCandidateModal,
    addCandidate,
    updateCandidate,
  } = useVoting();
  const [candidateName, setCandidateName] = useState("");

  useEffect(() => {
    if (editingCandidate) {
      setCandidateName(editingCandidate.name);
    } else {
      setCandidateName("");
    }
  }, [editingCandidate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (candidateName.trim()) {
      if (editingCandidate) {
        updateCandidate(editingCandidate.id, candidateName);
      } else {
        addCandidate(candidateName);
      }
      setCandidateName("");
    }
  };

  const handleClose = () => {
    closeCandidateModal();
    setCandidateName("");
  };

  if (!isCandidateModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              {editingCandidate ? (
                <Edit3 className="w-5 h-5 text-green-600" />
              ) : (
                <UserPlus className="w-5 h-5 text-green-600" />
              )}
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {editingCandidate ? "Edit Candidate" : "Add New Candidate"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Candidate Name
            </label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="Enter candidate's full name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              required
              autoFocus
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!candidateName.trim()}
              className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {editingCandidate ? (
                <>
                  <Edit3 className="w-4 h-4" />
                  Update
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Add Candidate
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CandidateModal;
