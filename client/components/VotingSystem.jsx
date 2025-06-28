import { useVoting } from "../contexts/VotingContext";
import VotingModal from "./VotingModal";
import CandidateModal from "./CandidateModal";
import Dashboard from "./Dashboard";
import { Vote, Users, Trophy, UserPlus } from "lucide-react";

function VotingSystem() {
  const { openModal, openCandidateModal } = useVoting();

  const handleOpenModal = () => {
    openModal();
  };

  const handleOpenCandidateModal = () => {
    openCandidateModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Trophy className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Class Monitor Election
                </h1>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleOpenCandidateModal}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors shadow-sm"
              >
                <UserPlus className="w-4 h-4" />
                Manage Candidates
              </button>
              <button
                onClick={handleOpenModal}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
              >
                <Vote className="w-4 h-4" />
                Give Vote
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Election Dashboard
          </h2>
          <p className="text-gray-600">
            View real-time voting results and manage the election process.
          </p>
        </div>

        <Dashboard />
      </div>

      <VotingModal />
      <CandidateModal />
    </div>
  );
}

export default VotingSystem;
