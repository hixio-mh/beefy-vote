const requireSpace = require.context('./spaces/', true, /[\w-]+\.json$/);
const requireSkin = require.context('./spaces/', true, /[\w-]+\.scss$/);

requireSkin.keys().map(file => requireSkin(file));

const spaces = Object.fromEntries(
  requireSpace
    .keys()
    .filter(file => !['./homepage.json', './example/index.json'].includes(file))
    .map(file => {
      const space = requireSpace(file);
      return [space.key, space];
    })
);

console.log(spaces);

const spacesByChainId = {};
Object.entries(spaces).forEach((space: any) => {
  if (!spacesByChainId[space[1].chainId]) spacesByChainId[space[1].chainId] = {};
  spacesByChainId[space[1].chainId][space[0]] = space[1];
});

export default spacesByChainId;
