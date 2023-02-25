export default function checkPremiumUsernameAccess(profile) {
  // console.log(profile.purchases);
  if (profile.purchases) {
    if (profile.purchases.premiumUsername) {
      return true;
    }
  }
  return false;
}
