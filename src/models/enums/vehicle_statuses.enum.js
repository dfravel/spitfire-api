const VehicleStatuses = Object.freeze({
  ORDERED: 'Ordered',
  IN_PRODUCTION: 'In Production',
  MID_BUILD_INSPECTION: 'Mid-Build Inspection',
  FINAL_INSPECTION: 'Final Inspection',
  IN_TRANSIT_FRANKFURT: 'In Transit - Frankfurt',
  ACCEPTED_ON_HAND_FRANKFURT: 'Accepted - On Hand - Frankfurt',
  REJECTED_FRANKFURT: 'Rejected - Frankfurt',
  IN_TRANSIT_POST: 'In Transit - Post',
  ACCEPTED_AT_POST: 'Accepted at Post',
  OPERATIONAL: 'Operational',
  NON_OPERATIONAL: 'Non-Operational',
  DESTROYED: 'Destroyed',
});


module.exports = {
  VehicleStatuses,
};
