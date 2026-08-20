# ຕັ້ງຄ່າ Google Sheet ໃຫ້ຮັບຂໍ້ມູນຈາກ Form (5 ຂັ້ນຕອນ)

## 1. ສ້າງ Google Sheet
- ໄປ https://sheets.new ສ້າງຊີດໃໝ່ ຕັ້ງຊື່ເຊັ່ນ `Ashveil Tournament Registrations`
- ໃນແຖວທຳອິດ (row 1) ໃສ່ຫົວຂໍ້ຄໍລຳ:
  `Timestamp | Team Name | Member Count | Logo URL | Member1 Name | Member1 Phone | Member1 Position | Member1 Details | Member2 Name | ... (ເຮັດຊ້ຳຮອດ Member7)`
  *(ບໍ່ຈຳເປັນຕ້ອງພິມໃຫ້ຄົບກ່ອນ, script ຂ້າງລຸ່ມຈະຂຽນຕາມລຳດັບໃຫ້ອັດຕະໂນມັດ)*

## 2. ເປີດ Apps Script
- ໃນຊີດ, ໄປທີ່ເມນູ **Extensions → Apps Script**
- ລຶບ code ເລີ່ມຕົ້ນອອກ, ວາງ code ຈາກໄຟລ໌ `apps-script-code.js` ທີ່ໃຫ້ມາພ້ອມກັນ

## 3. Deploy ເປັນ Web App
- ກົດ **Deploy → New deployment**
- ເລືອກ type: **Web app**
- Execute as: **Me**
- Who has access: **Anyone**
- ກົດ **Deploy** → ອະນຸຍາດສິດ (authorize) ຕາມທີ່ Google ຖາມ
- ຄັດລອກ **Web app URL** ທີ່ໄດ້ (ຮູບແບບ `https://script.google.com/macros/s/XXXXXXXX/exec`)

## 4. ວາງລິ້ງເຂົ້າ register.html
- ເປີດ `register.html`
- ຊອກຫາແຖວ:
  ```js
  const SCRIPT_URL = "";
  ```
- ວາງລິ້ງທີ່ຄັດລອກມາໃສ່ລະຫວ່າງ `""` ເຊັ່ນ:
  ```js
  const SCRIPT_URL = "https://script.google.com/macros/s/XXXXXXXX/exec";
  ```
- ບັນທຶກໄຟລ໌

## 5. ທົດສອບ
- ເປີດ `register.html` ໃນ browser, ລົງທະບຽນທີມທົດລອງ, ກົດສົ່ງ
- ກັບໄປເບິ່ງ Google Sheet — ຄວນມີແຖວຂໍ້ມູນໃໝ່ເພີ່ມເຂົ້າມາ, ພ້ອມລິ້ງໂລໂກ້ (ຈະຖືກເກັບໄວ້ໃນ Google Drive ຂອງທ່ານ ອັດຕະໂນມັດ)

---

### ໝາຍເຫດ
- ໂລໂກ້ຖືກອັບໂຫລດເປັນຮູບ ແລ້ວເກັບໄວ້ໃນ Google Drive (ໂຟນເດີ root) ຂອງບັນຊີທີ່ deploy script, ບໍ່ແມ່ນເກັບໃນ cell ຂອງ Sheet ໂດຍກົງ (ເພື່ອບໍ່ໃຫ້ Sheet ໜັກເກີນໄປ)
- ຖ້າຢາກປ່ຽນຊື່ Sheet ຈາກ `Registrations` ເປັນຊື່ອື່ນ, ແກ້ໄດ້ໃນ code ຢູ່ແຖວ `SHEET_NAME`
- ຖ້າຢາກຈຳກັດຄົນເຂົ້າເຖິງ script, ປ່ຽນ "Who has access" ຄືນຫຼັງ deploy ໄດ້ໃນ **Deploy → Manage deployments**
