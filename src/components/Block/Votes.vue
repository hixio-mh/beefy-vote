<template>
  <Block
    v-if="sortedVotes.length > 0"
    title="Votes"
    :counter="sortedVotes.length"
    :slim="true"
  >
    <div
      v-for="(kv, i) in visibleVotes"
      :key="i"
      :style="i === 0 && 'border: 0 !important;'"
      class="px-4 py-3 border-top d-flex"
    >
      <User :address="kv[0]" :space="space" class="column" />
      <div
        v-text="proposal.msg.payload.choices[kv[1].msg.payload.choice - 1]"
        class="flex-auto text-center text-white"
      />
      <div class="column text-right text-white">
        <span class="tooltipped tooltipped-n" :aria-label="kv[1].score">
          {{ `${_numeral(kv[1].score)} ${_shorten(space.symbol, 'symbol')}` }}
        </span>
        <a
          @click="openReceiptModal(kv[1])"
          target="_blank"
          class="ml-2 text-gray"
          title="Receipt"
        >
          <Icon name="signature" />
        </a>
      </div>
    </div>
    <a
      v-if="!showAllVotes && sortedVotes.length > 10"
      @click="showAllVotes = true"
      class="px-4 py-3 border-top text-center d-block header-bg"
    >
      See more
    </a>
    <ModalReceipt
      :open="modalReceiptOpen"
      @close="modalReceiptOpen = false"
      :authorIpfsHash="authorIpfsHash"
      :relayerIpfsHash="relayerIpfsHash"
    />
  </Block>
</template>

<script>
export default {
  props: ['space', 'proposal', 'votes'],
  data() {
    return {
      showAllVotes: false,
      authorIpfsHash: '',
      relayerIpfsHash: '',
      modalReceiptOpen: false,
    };
  },
  computed: {
    sortedVotes() {
      return Object.entries(this.votes).sort((a, b) => b[1].score - a[1].score);
    },
    visibleVotes() {
      return this.showAllVotes ? this.sortedVotes : this.sortedVotes.slice(0, 10);
    },
    titles() {
      return [this.space.symbol];
    },
  },
  methods: {
    openReceiptModal(vote) {
      this.authorIpfsHash = vote.authorIpfsHash;
      this.relayerIpfsHash = vote.relayerIpfsHash;
      this.modalReceiptOpen = true;
    },
  },
};
</script>
