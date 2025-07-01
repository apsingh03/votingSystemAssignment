import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  candidates: [
    { id: "1", name: "Ajay Pratap Singh" },
    { id: "2", name: "Uday Pratap Singh" },
    { id: "3", name: "Vijay Singh" },
    { id: "4", name: "Nakul Sharma" },
    { id: "5", name: "Rinku Singh" },
  ],
  votes: [],
  isModalOpen: false,
  selectedCandidateId: "",
  voterName: "",
  isCandidateModalOpen: false,
  editingCandidate: null,
};



function votingReducer(state, action) {
  switch (action.type) {
    case "OPEN_MODAL":
      return { ...state, isModalOpen: true };

    case "CLOSE_MODAL":
      return {
        ...state,
        isModalOpen: false,
        selectedCandidateId: "",
        voterName: "",
      };

    case "SET_SELECTED_CANDIDATE":
      return { ...state, selectedCandidateId: action.payload };

    case "SET_VOTER_NAME":
      return { ...state, voterName: action.payload };

    case "ADD_VOTE":
      const newVote = {
        id: Date.now().toString(),
        voterName: action.payload.voterName,
        candidateId: action.payload.candidateId,
        timestamp: Date.now(),
      };
      return {
        ...state,
        votes: [...state.votes, newVote],
        isModalOpen: false,
        selectedCandidateId: "",
        voterName: "",
      };

    case "DELETE_VOTE":
      return {
        ...state,
        votes: state.votes.filter((vote) => vote.id !== action.payload),
      };

    case "OPEN_CANDIDATE_MODAL":
      return {
        ...state,
        isCandidateModalOpen: true,
        editingCandidate: null,
      };

    case "CLOSE_CANDIDATE_MODAL":
      return {
        ...state,
        isCandidateModalOpen: false,
        editingCandidate: null,
      };

    case "SET_EDITING_CANDIDATE":
      return {
        ...state,
        editingCandidate: action.payload,
        isCandidateModalOpen: true,
      };

    case "ADD_CANDIDATE":
      const newCandidate = {
        id: Date.now().toString(),
        name: action.payload.trim(),
      };
      return {
        ...state,
        candidates: [...state.candidates, newCandidate],
        isCandidateModalOpen: false,
        editingCandidate: null,
      };

    case "UPDATE_CANDIDATE":
      return {
        ...state,
        candidates: state.candidates.map((candidate) =>
          candidate.id === action.payload.id
            ? { ...candidate, name: action.payload.name.trim() }
            : candidate,
        ),
        isCandidateModalOpen: false,
        editingCandidate: null,
      };

    case "DELETE_CANDIDATE":
      return {
        ...state,
        candidates: state.candidates.filter(
          (candidate) => candidate.id !== action.payload,
        ),
        votes: state.votes.filter(
          (vote) => vote.candidateId !== action.payload,
        ),
      };

    default:
      return state;
  }
}

const VotingContext = createContext();

export function VotingProvider({ children }) {
  const [state, dispatch] = useReducer(votingReducer, initialState);

  const contextValue = {
    state,
    openModal: () => dispatch({ type: "OPEN_MODAL" }),
    closeModal: () => dispatch({ type: "CLOSE_MODAL" }),
    setSelectedCandidate: (candidateId) =>
      dispatch({ type: "SET_SELECTED_CANDIDATE", payload: candidateId }),
    setVoterName: (name) => dispatch({ type: "SET_VOTER_NAME", payload: name }),
    addVote: (candidateId, voterName) =>
      dispatch({ type: "ADD_VOTE", payload: { candidateId, voterName } }),
    deleteVote: (voteId) => dispatch({ type: "DELETE_VOTE", payload: voteId }),
    openCandidateModal: () => dispatch({ type: "OPEN_CANDIDATE_MODAL" }),
    closeCandidateModal: () => dispatch({ type: "CLOSE_CANDIDATE_MODAL" }),
    setEditingCandidate: (candidate) =>
      dispatch({ type: "SET_EDITING_CANDIDATE", payload: candidate }),
    addCandidate: (name) => dispatch({ type: "ADD_CANDIDATE", payload: name }),
    updateCandidate: (id, name) =>
      dispatch({ type: "UPDATE_CANDIDATE", payload: { id, name } }),
    deleteCandidate: (candidateId) =>
      dispatch({ type: "DELETE_CANDIDATE", payload: candidateId }),
  };

  return (
    <VotingContext.Provider value={contextValue}>
      {children}
    </VotingContext.Provider>
  );
}

export function useVoting() {
  const context = useContext(VotingContext);

  return context;
}
