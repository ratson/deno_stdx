export const isCI = !!(
  Deno.env.get("CI") || // Travis CI, CircleCI, Cirrus CI, Gitlab CI, Appveyor, CodeShip, dsari
  Deno.env.get("CONTINUOUS_INTEGRATION") || // Travis CI, Cirrus CI
  Deno.env.get("BUILD_NUMBER") || // Jenkins, TeamCity
  Deno.env.get("RUN_ID") || // TaskCluster, dsari
  false
);
