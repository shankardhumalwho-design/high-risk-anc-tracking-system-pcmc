// =====================================================
// EXPO / MOBILE API BRIDGE
// Keep your existing code.gs functions unchanged.
// Add this block to the same Apps Script project.
// =====================================================

function jsonOut_(data) {
  return ContentService
    .createTextOutput(JSON.stringify({ success: true, data: data }))
    .setMimeType(ContentService.MimeType.JSON);
}

function jsonErr_(message) {
  return ContentService
    .createTextOutput(JSON.stringify({ success: false, fatal: true, message: String(message) }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var body = e && e.postData && e.postData.contents
      ? JSON.parse(e.postData.contents)
      : {};

    var action = safeText(body.action);
    var result;

    switch (action) {
      case 'authenticateUser':
        result = authenticateUser(body.username, body.password); break;
      case 'resetUserPassword':
        result = resetUserPassword(body.username, body.oldPassword, body.newPassword); break;
      case 'getStaffDropdownData':
        result = getStaffDropdownData(body.zone, body.role); break;
      case 'getANCData':
        result = getANCData(body.zone, body.role); break;
      case 'checkMobileExists':
        result = checkMobileExists(body.mobile); break;
      case 'saveANCRegistration':
        result = saveANCRegistration(body.formData); break;
      case 'getANCRecordByMobile':
        result = getANCRecordByMobile(body.mobile); break;
      case 'updateANCRecord':
        result = updateANCRecord(body.updateData); break;
      case 'recordFollowupLog':
        result = recordFollowupLog(body.logData); break;
      case 'updatePregnancyOutcome':
        result = updatePregnancyOutcome(body.outcomeData); break;
      case 'getReportSummary':
        result = getReportSummary(body.zone, body.role); break;
      case 'getAllZones':
        result = getAllZones(); break;
      case 'registerZoneMaster':
        result = registerZoneMaster(body.formData); break;
      case 'registerHospitalMaster':
        result = registerHospitalMaster(body.formData); break;
      case 'registerStaffMaster':
        result = registerStaffMaster(body.formData); break;
      case 'registerAshaMaster':
        result = registerAshaMaster(body.formData); break;
      case 'getMyFacilityStaffData':
        result = getMyFacilityStaffData(body.username); break;
      case 'updateMyFacilityStaffData':
        result = updateMyFacilityStaffData(body.formData); break;
      case 'sendReportEmailWithPdf':
        result = sendReportEmailWithPdf(body.base64Data, body.zone, body.role, body.userZone, body.userEmail, body.userCC); break;
      case 'sendPendingFollowupEmailV2':
        result = sendPendingFollowupEmailV2(body.base64Data, body.zone, body.role, body.userEmail, body.userCC); break;
      default:
        throw new Error('Unknown API action: ' + action);
    }

    return jsonOut_(result);

  } catch (err) {
    return jsonErr_(err && err.stack ? err.stack : err.toString());
  }
}
