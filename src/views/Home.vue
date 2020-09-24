<template>
  <div>
    <Container :slim="true">
      <router-link
        v-for="space in spaces"
        :key="space.address"
        :to="{ name: 'proposals', params: { key: space.key } }"
      >
        <Block class="text-center extra-icon-container">
          <Token
            :space="space.key"
            symbolIndex="space"
            size="88"
            class="mb-3"
          />
          <StatefulIcon
            :on="space.favorite"
            onName="star"
            offName="star1"
            @click="toggleFavorite(space.key)"
          />
          <div>
            <h2>
              {{ space.name }}
              <span class="text-gray">{{ space.symbol }}</span>
            </h2>
          </div>
        </Block>
      </router-link>
    </Container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import orderBy from 'lodash/orderBy';
import homepage from '@bonustrack/snapshot-spaces/spaces/homepage.json';

export default {
  data() {
    return {
      domains
    };
  },
  computed: {
    spaces() {
      const spaces =
        this.web3.network.chainId === 1
          ? homepage
          : Object.keys(this.web3.spaces);
      const list = spaces.map(key => ({
        ...this.web3.spaces[key],
        favorite: !!this.favoriteSpaces.favorites[key]
      }));
      return orderBy(list, ['favorite'], ['desc']);
    }
  },
  methods: {
    ...mapActions([
      'loadFavoriteSpaces',
      'addFavoriteSpace',
      'removeFavoriteSpace'
    ]),
    toggleFavorite(spaceId) {
      if (this.favoriteSpaces.favorites[spaceId]) {
        this.removeFavoriteSpace(spaceId);
      } else {
        this.addFavoriteSpace(spaceId);
      }
    }
  },
  created() {
    this.loadFavoriteSpaces();
  }
};
</script>
