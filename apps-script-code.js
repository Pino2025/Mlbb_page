/**
 * ASHVEIL — Tournament Registration backend
 * ວາງ code ນີ້ໃນ Extensions > Apps Script ຂອງ Google Sheet ຂອງທ່ານ
 * ຈາກນັ້ນ Deploy > New deployment > Web app (Execute as: Me, Access: Anyone)
 */

const SHEET_NAME = "Registrations";
const MAX_MEMBERS = 7;

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(buildHeaderRow());
    }
    // Ensure header exists on a totally empty sheet
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(buildHeaderRow());
    }

    // Save logo to Drive and get a shareable link
    let logoUrl = "";
    if (data.logoBase64) {
      logoUrl = saveLogoToDrive(data.logoBase64, data.logoMime, data.teamName);
    }

    const row = [
      data.timestamp || new Date().toISOString(),
      data.teamName || "",
      data.memberCount || (data.members ? data.members.length : ""),
      logoUrl,
    ];

    const members = data.members || [];
    for (let i = 0; i < MAX_MEMBERS; i++) {
      const m = members[i];
      if (m) {
        row.push(m.name || "", m.phone || "", m.position || "", m.details || "");
      } else {
        row.push("", "", "", "");
      }
    }

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function buildHeaderRow() {
  const header = ["Timestamp", "Team Name", "Member Count", "Logo URL"];
  for (let i = 1; i <= MAX_MEMBERS; i++) {
    header.push(
      "Member" + i + " Name",
      "Member" + i + " Phone",
      "Member" + i + " Position",
      "Member" + i + " Details"
    );
  }
  return header;
}

function saveLogoToDrive(base64DataUrl, mime, teamName) {
  try {
    const commaIndex = base64DataUrl.indexOf(",");
    const base64Data = commaIndex >= 0 ? base64DataUrl.substring(commaIndex + 1) : base64DataUrl;
    const contentType = mime || "image/png";
    const blob = Utilities.newBlob(
      Utilities.base64Decode(base64Data),
      contentType,
      (teamName || "team") + "_logo"
    );
    const file = DriveApp.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return file.getUrl();
  } catch (err) {
    return "upload_failed: " + err.message;
  }
}

// Optional: quick manual test from the Apps Script editor (Run > testDoPost)
function testDoPost() {
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        teamName: "Test Squad",
        memberCount: 5,
        members: [
          { name: "Somchai", phone: "02012345678", position: "exp", details: "test" },
          { name: "Nok", phone: "02087654321", position: "jungle", details: "" },
        ],
        logoBase64: "",
        logoMime: "",
      }),
    },
  };
  Logger.log(doPost(fakeEvent).getContent());
}
