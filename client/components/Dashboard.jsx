import { useVoting } from "../contexts/VotingContext";
import { Trash2, Trophy, Users, TrendingUp, Edit3 } from "lucide-react";

function Dashboard() {
  const {
    state: { candidates, votes },
    deleteVote,
    deleteCandidate,
    setEditingCandidate,
  } = useVoting();

  const getCandidateVotes = (candidateId) => {
    return votes.filter((vote) => vote.candidateId === candidateId);
  };

  const getCandidateWithStats = () => {
    return candidates
      .map((candidate) => {
        const candidateVotes = getCandidateVotes(candidate.id);
        return {
          ...candidate,
          voteCount: candidateVotes.length,
          voters: candidateVotes,
        };
      })
      .sort((a, b) => b.voteCount - a.voteCount);
  };

  const candidatesWithStats = getCandidateWithStats();
  const totalVotes = votes.length;
  const winner = candidatesWithStats[0];

  const handleDeleteVote = (voteId) => {
    if (window.confirm("Are you sure you want to delete this vote?")) {
      deleteVote(voteId);
    }
  };

  const handleEditCandidate = (candidate) => {
    setEditingCandidate(candidate);
  };

  const handleDeleteCandidate = (candidateId, candidateName) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${candidateName}"? This will also delete all votes for this candidate.`,
      )
    ) {
      deleteCandidate(candidateId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Votes</p>
              <p className="text-2xl font-bold text-gray-900">{totalVotes}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Candidates</p>
              <p className="text-2xl font-bold text-gray-900">
                {candidates.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Leading</p>
              <p className="text-lg font-bold text-gray-900 truncate">
                {winner ? winner.name : "No votes yet"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {candidatesWithStats.map((candidate, index) => (
          <div
            key={candidate.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {index === 0 && candidate.voteCount > 0 && (
                    <Trophy className="w-5 h-5 text-yellow-500" />
                  )}
                  <h3 className="text-lg font-semibold text-gray-900">
                    {candidate.name}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      {candidate.voteCount}
                    </p>
                    <p className="text-sm text-gray-500">
                      {candidate.voteCount === 1 ? "vote" : "votes"}
                    </p>
                  </div>
                  <div className="flex gap-1 ml-3">
                    <button
                      onClick={() => handleEditCandidate(candidate)}
                      className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit candidate"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteCandidate(candidate.id, candidate.name)
                      }
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete candidate"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

         
            </div>

            {candidate.voters.length > 0 && (
              <div className="p-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Voters ({candidate.voters.length})
                </h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {candidate.voters.map((vote) => (
                    <div
                      key={vote.id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {vote.voterName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(vote.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteVote(vote.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                        title="Delete vote"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {candidate.voters.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                <Users className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm">No votes yet</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
