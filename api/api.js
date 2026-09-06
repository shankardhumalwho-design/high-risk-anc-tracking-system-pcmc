import { API_CONFIG } from "../constants/theme"; 
const API_URL = API_CONFIG.BASE_URL;

function makeError(message) {
  return new Error(
    message || "API request failed."
  );
}

async function readResponse(response) {
  var text = "";

  try {
    text = await response.text();
  } catch (error) {
    throw makeError(
      "Unable to read server response."
    );
  }

  var result = null;

  try {
    result = JSON.parse(text);
  } catch (error) {
    console.log(
      "SERVER RESPONSE:",
      text
    );

    throw makeError(
      "Server returned an invalid response."
    );
  }

  if (!response.ok) {
    throw makeError(
      result && result.message
        ? result.message
        : "Server request failed."
    );
  }

  if (
    result &&
    result.success === false
  ) {
    throw makeError(
      result.message ||
        "Server operation failed."
    );
  }

  return result;
}

async function postRequest(
  action,
  payload
) {
  var body = {
    action: action
  };

  if (payload) {
    Object.assign(
      body,
      payload
    );
  }

  var response;

  try {
    response = await fetch(
      API_URL,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "text/plain;charset=utf-8"
        },

        body: JSON.stringify(
          body
        )
      }
    );
  } catch (error) {
    console.log(
      "NETWORK ERROR:",
      error
    );

    throw makeError(
      "Unable to connect to Google Apps Script."
    );
  }

  return readResponse(
    response
  );
}

async function getRequest(
  action
) {
  var requestUrl =
    API_URL +
    "?action=" +
    encodeURIComponent(
      action
    );

  var response;

  try {
    response = await fetch(
      requestUrl,
      {
        method: "GET"
      }
    );
  } catch (error) {
    console.log(
      "NETWORK ERROR:",
      error
    );

    throw makeError(
      "Unable to connect to Google Apps Script."
    );
  }

  return readResponse(
    response
  );
}

export async function authenticateUser(
  username,
  password
) {
  return postRequest(
    "authenticateUser",
    {
      username:
        String(
          username || ""
        ).trim(),

      password:
        String(
          password || ""
        )
    }
  );
}

export async function resetUserPassword(
  username,
  oldPassword,
  newPassword
) {
  return postRequest(
    "resetUserPassword",
    {
      username:
        String(
          username || ""
        ).trim(),

      oldPassword:
        String(
          oldPassword || ""
        ),

      newPassword:
        String(
          newPassword || ""
        )
    }
  );
}

export async function getStaffDropdownData(
  userZone,
  role
) {
  return postRequest(
    "getStaffDropdownData",
    {
      userZone:
        String(
          userZone || ""
        ).trim(),

      role:
        String(
          role || "User"
        ).trim()
    }
  );
}

export async function getActiveZones() {
  return postRequest(
    "getActiveZones"
  );
}

export async function getAllZones() {
  return postRequest(
    "getAllZones"
  );
}

export async function registerZoneMaster(
  data
) {
  return postRequest(
    "registerZoneMaster",
    {
      data:
        data || {}
    }
  );
}

export async function registerHospitalMaster(
  data
) {
  return postRequest(
    "registerHospitalMaster",
    {
      data:
        data || {}
    }
  );
}

export async function registerStaffMaster(
  data
) {
  return postRequest(
    "registerStaffMaster",
    {
      data:
        data || {}
    }
  );
}

export async function registerAshaMaster(
  data
) {
  return postRequest(
    "registerAshaMaster",
    {
      data:
        data || {}
    }
  );
}

export async function checkMobileExists(
  mobile
) {
  return postRequest(
    "checkMobileExists",
    {
      mobile:
        String(
          mobile || ""
        ).trim()
    }
  );
}

export async function getANCData(
  zone,
  role
) {
  var result =
    await postRequest(
      "getANCData",
      {
        zone:
          String(
            zone || ""
          ).trim(),

        role:
          String(
            role || "User"
          ).trim()
      }
    );

  if (
    result &&
    Array.isArray(
      result.data
    )
  ) {
    return result.data;
  }

  if (Array.isArray(result)) {
    return result;
  }

  return [];
}

export async function getANCRecordByMobile(
  mobile
) {
  return postRequest(
    "getANCRecordByMobile",
    {
      mobile:
        String(
          mobile || ""
        ).trim()
    }
  );
}

export async function saveANCRegistration(
  formData
) {
  return postRequest(
    "saveANCRegistration",
    {
      formData:
        formData || {}
    }
  );
}

export async function updateANCRecord(
  updateData
) {
  return postRequest(
    "updateANCRecord",
    {
      updateData:
        updateData || {}
    }
  );
}

export async function recordFollowupLog(
  logData
) {
  return postRequest(
    "recordFollowupLog",
    {
      logData:
        logData || {}
    }
  );
}

export async function updatePregnancyOutcome(
  outcomeData
) {
  return postRequest(
    "updatePregnancyOutcome",
    {
      outcomeData:
        outcomeData || {}
    }
  );
}

export async function getReportSummary(
  zone,
  role
) {
  return postRequest(
    "getReportSummary",
    {
      zone:
        String(
          zone || ""
        ).trim(),

      role:
        String(
          role || "User"
        ).trim()
    }
  );
}

export async function getMyFacilityStaffData(
  username
) {
  return postRequest(
    "getMyFacilityStaffData",
    {
      username:
        String(
          username || ""
        ).trim()
    }
  );
}

export async function updateMyFacilityStaffData(
  data
) {
  return postRequest(
    "updateMyFacilityStaffData",
    {
      data:
        data || {}
    }
  );
}

export async function sendReportEmailWithPdf(
  base64Data,
  zone,
  role,
  userZone,
  userEmail,
  userCC
) {
  return postRequest(
    "sendReportEmailWithPdf",
    {
      base64Data:
        String(
          base64Data || ""
        ),

      zone:
        String(
          zone || ""
        ),

      role:
        String(
          role || "User"
        ),

      userZone:
        String(
          userZone || ""
        ),

      userEmail:
        String(
          userEmail || ""
        ),

      userCC:
        String(
          userCC || ""
        )
    }
  );
}

export async function sendPendingFollowupEmailV2(
  base64Data,
  zone,
  role,
  userEmail,
  userCC
) {
  return postRequest(
    "sendPendingFollowupEmailV2",
    {
      base64Data:
        String(
          base64Data || ""
        ),

      zone:
        String(
          zone || ""
        ),

      role:
        String(
          role || "User"
        ),

      userEmail:
        String(
          userEmail || ""
        ),

      userCC:
        String(
          userCC || ""
        )
    }
  );
}

export async function checkApiConnection() {
  try {
    var result =
      await getRequest(
        "healthCheck"
      );

    return {
      success: true,
      data: result
    };
  } catch (error) {
    return {
      success: false,
      message:
        error &&
        error.message
          ? error.message
          : "Unable to connect to server."
    };
  }
}

const api = {
  authenticateUser:
    authenticateUser,

  resetUserPassword:
    resetUserPassword,

  getStaffDropdownData:
    getStaffDropdownData,

  getActiveZones:
    getActiveZones,

  getAllZones:
    getAllZones,

  registerZoneMaster:
    registerZoneMaster,

  registerHospitalMaster:
    registerHospitalMaster,

  registerStaffMaster:
    registerStaffMaster,

  registerAshaMaster:
    registerAshaMaster,

  getANCData:
    getANCData,

  checkMobileExists:
    checkMobileExists,

  getANCRecordByMobile:
    getANCRecordByMobile,

  saveANCRegistration:
    saveANCRegistration,

  updateANCRecord:
    updateANCRecord,

  recordFollowupLog:
    recordFollowupLog,

  updatePregnancyOutcome:
    updatePregnancyOutcome,

  getReportSummary:
    getReportSummary,

  getMyFacilityStaffData:
    getMyFacilityStaffData,

  updateMyFacilityStaffData:
    updateMyFacilityStaffData,

  sendReportEmailWithPdf:
    sendReportEmailWithPdf,

  sendPendingFollowupEmailV2:
    sendPendingFollowupEmailV2,

  checkApiConnection:
    checkApiConnection
};

export default api;
