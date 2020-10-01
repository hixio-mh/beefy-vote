import client from '@/helpers/client';
import ipfs from '@/helpers/ipfs';
import rpcProvider from '@/helpers/rpc';
import { formatProposal, formatProposals, isEmpty } from '@/helpers/utils';
import { version } from '@/../package.json';
import { Contract } from '@ethersproject/contracts';
import { formatUnits, parseUnits } from '@ethersproject/units';
import abi from '@/helpers/abi/bep2e.json';

export async function getScore(contract, address, decimals) {
  const bep2e = new Contract(contract, abi, rpcProvider);
  const balance = await bep2e.balanceOf(address);
  return parseFloat(formatUnits(balance.toString(), decimals));
}

const mutations = {
  SEND_REQUEST() {
    console.debug('SEND_REQUEST');
  },
  SEND_SUCCESS() {
    console.debug('SEND_SUCCESS');
  },
  SEND_FAILURE(_state, payload) {
    console.debug('SEND_FAILURE', payload);
  },
  GET_PROPOSALS_REQUEST() {
    console.debug('GET_PROPOSALS_REQUEST');
  },
  GET_PROPOSALS_SUCCESS() {
    console.debug('GET_PROPOSALS_SUCCESS');
  },
  GET_PROPOSALS_FAILURE(_state, payload) {
    console.debug('GET_PROPOSALS_FAILURE', payload);
  },
  GET_PROPOSAL_REQUEST() {
    console.debug('GET_PROPOSAL_REQUEST');
  },
  GET_PROPOSAL_SUCCESS() {
    console.debug('GET_PROPOSAL_SUCCESS');
  },
  GET_PROPOSAL_FAILURE(_state, payload) {
    console.debug('GET_PROPOSAL_FAILURE', payload);
  },
  GET_POWER_REQUEST() {
    console.debug('GET_POWER_REQUEST');
  },
  GET_POWER_SUCCESS() {
    console.debug('GET_POWER_SUCCESS');
  },
  GET_POWER_FAILURE(_state, payload) {
    console.debug('GET_POWER_FAILURE', payload);
  },
};

const actions = {
  send: async ({ commit, dispatch, rootState }, { token, type, payload }) => {
    commit('SEND_REQUEST');
    try {
      const msg: any = {
        address: rootState.web3.account,
        msg: JSON.stringify({
          version,
          timestamp: (Date.now() / 1e3).toFixed(),
          token,
          type,
          payload,
        }),
      };
      msg.sig = await dispatch('signMessage', msg.msg);
      const result = await client.request('message', msg);
      commit('SEND_SUCCESS');
      dispatch('notify', ['green', `Your ${type} is in!`]);
      return result;
    } catch (e) {
      commit('SEND_FAILURE', e);
      const errorMessage =
        e && e.error_description
          ? `Oops, ${e.error_description}`
          : 'Oops, something went wrong!';

      dispatch('notify', ['red', errorMessage]);
      return;
    }
  },

  getProposals: async ({ commit, rootState }, space) => {
    commit('GET_PROPOSALS_REQUEST');
    try {
      const proposals: any = await client.request(`${space.address}/proposals`);

      if (proposals && !isEmpty(proposals)) {
        Object.keys(proposals).forEach(k => { 
          proposals[k].score = proposals[k].score || 0;
        });
      }

      commit('GET_PROPOSALS_SUCCESS');
      return formatProposals(proposals);
    } catch (e) {
      commit('GET_PROPOSALS_FAILURE', e);
    }
  },

  getProposal: async ({ commit, rootState }, payload) => {
    commit('GET_PROPOSAL_REQUEST');
    try {
      const result: any = {};
      const [proposal, votes] = await Promise.all([
        ipfs.get(payload.id),
        client.request(`${payload.space.address}/proposal/${payload.id}`),
      ]);
      result.proposal = formatProposal(proposal);
      result.proposal.ipfsHash = payload.id;
      result.votes = votes;

      console.log('>>>>>>>>>', 'votes', votes);
        
      // TODO: implement BSC scores
      const scores: any = [];

      // TODO: implement scores
      // result.votes = Object.fromEntries(
      //   Object.entries(result.votes)
      //     .map((vote: any) => {
      //       vote[1].scores = 0; // FIXME: make this 0 once BSC scores have been implemented
      //       vote[1].balance = 0; 
      //       return vote;
      //     })
      //     .sort((a, b) => b[1].balance - a[1].balance)
      //     .filter(vote => vote[1].balance > 0)
      // );

      result.results = {
        totalVotes: result.proposal.msg.payload.choices.map(
          (choice, i) =>
            Object.values(result.votes).filter(
              (vote: any) => vote.msg.payload.choice === i + 1
            ).length
        ),
        totalBalances: result.proposal.msg.payload.choices.map((choice, i) =>
          Object.values(result.votes)
            .filter((vote: any) => vote.msg.payload.choice === i + 1)
            .reduce((a, b: any) => a + b.balance, 0)
        ),
        totalScores: result.proposal.msg.payload.choices.map((choice, i) => 7),
        totalVotesBalances: Object.values(result.votes).reduce(
          (a, b: any) => a + b.balance,
          0
        ),
      };
      commit('GET_PROPOSAL_SUCCESS');
      return result;
    } catch (e) {
      commit('GET_PROPOSAL_FAILURE', e);
    }
  },
  getPower: async ({ commit, rootState }, { space, address, snapshot }) => {
    commit('GET_POWER_REQUEST');
    try {
      // FIXME: remove this post pilot
      snapshot = 'pilot.json';

      const res: any = await client.request(`${space.token}/snapshot/${snapshot}`);
      const scores = await ipfs.get(res[snapshot]);
      
      // FIXME: BigNum to avoid parse issues
      Object.keys(scores).forEach(k => scores[k] = parseFloat(scores[k]));

      commit('GET_POWER_SUCCESS');
      return {
        scores: scores,
        totalScore: Object.values(scores).reduce((a, b: any) => a + b, 0),
      };
    } catch (e) {
      commit('GET_POWER_FAILURE', e);
    }
  },
};

export default {
  mutations,
  actions,
};
