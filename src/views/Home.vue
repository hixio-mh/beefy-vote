<template>
  <div>
    <Container :slim="true">
      <router-link
        v-for="space in web3.spaces"
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
