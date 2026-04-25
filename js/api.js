<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Booking Detail</title>

<style>
body{font-family:Arial;background:#f5f6fa;padding:20px}
.container{max-width:900px;margin:auto;background:#fff;padding:25px;border-radius:10px}
.row{display:flex;gap:20px;margin-bottom:15px}
.col{flex:1}
input,select{width:100%;padding:8px;border-radius:6px;border:1px solid #ccc}
.readonly{padding:8px;background:#eee;border-radius:6px}

.checkbox-group{display:flex;flex-direction:column;gap:6px}
.checkbox-item{display:inline-flex;align-items:center;gap:6px}

.status-section{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
}

.status-actions{
  display:flex;
  gap:10px;
}

button{
  padding:10px 14px;
  border:none;
  border-radius:6px;
  cursor:pointer;
}

.big{font-size:16px;padding:12px 18px}
.green{background:#28a745;color:white}
.red{background:#dc3545;color:white}
.gray{background:#aaa;color:white}
.warning{color:#dc3545;font-size:13px}
</style>
</head>

<body>
<div class="container">

<div style="display:flex;justify-content:space-between">
  <h2>📋 Booking Detail</h2>
  <button id="editBtn" onclick="toggleEdit()">✏️ Edit</button>
</div>

<!-- READONLY -->
<div class="row">
  <div class="col">
    <label>Transaction ID</label>
    <div id="transactionId" class="readonly"></div>
  </div>
  <div class="col">
    <label>Channel</label>
    <div id="channel" class="readonly"></div>
  </div>
</div>

<!-- ROOM -->
<div class="row">
  <div class="col">
    <label>ประเภทห้อง</label>
    <select id="roomType"></select>
  </div>
  <div class="col">
    <label>หมายเลขห้อง</label>
    <select id="room"></select>
    <div id="roomWarning" class="warning"></div>
  </div>
</div>

<input id="name" placeholder="ชื่อ">

<div class="row">
  <input id="checkin" type="date">
  <input id="checkout" type="date">
</div>

<!-- STATUS -->
<h3>💰 สถานะ</h3>

<div class="status-section">

  <div class="checkbox-group">
    <label class="checkbox-item">
      <input type="checkbox" id="deposit"> มัดจำแล้ว
    </label>

    <label class="checkbox-item">
      <input type="checkbox" id="refund"> คืนมัดจำแล้ว
    </label>

    <label class="checkbox-item">
      <input type="checkbox" id="water" disabled> วางน้ำ
    </label>

    <label class="checkbox-item">
      <input type="checkbox" id="tissue" disabled> วางทิชชู่
    </label>
  </div>

  <div class="status-actions">
    <button id="btnCheckin" class="big green">Check-in</button>
    <button id="btnCheckout" class="big gray">Check-out</button>
    <button id="btnCancel" class="big red">Cancel</button>
    <!-- 🔥 SAVE -->
    <button id="saveBtn" class="big green">Save</button>
  </div>

</div>

<!-- FINANCE -->
<h3>💰 การเงิน</h3>
<div class="row">
  <input id="total" placeholder="ราคาสุทธิ">
  <select id="paymentType">
    <option>เงินสด</option>
    <option>โอน</option>
  </select>
</div>

</div>

<script src="js/global.js"></script>
<script src="js/api.js"></script>

<script>
let bookingId;
let originalData;

// ===== LOAD =====
async function load(){
  bookingId = new URLSearchParams(location.search).get("id");

  // 🔥 FIX ตรงนี้
  const res = await apiGet("getBookingDetail",{id:bookingId});
  const d = Array.isArray(res) ? res[0] : res;

  console.log("DETAIL:", d);

  if (!d || d.error){
    alert("ไม่พบข้อมูล");
    return;
  }

  originalData = {...d};

  document.getElementById("transactionId").innerText=d.id;
  document.getElementById("channel").innerText=d.channel;
  document.getElementById("name").value=d.name||"";

  document.getElementById("checkin").value=format(d.checkin);
  document.getElementById("checkout").value=format(d.checkout);

  document.getElementById("deposit").checked=!!d.deposit;
  document.getElementById("refund").checked=!!d.refund;

  updateButtons(d);
}

function format(d){
  return d ? new Date(d).toISOString().split("T")[0] : "";
}

// ===== SAVE =====
async function save(){
  const data = {
    id: bookingId,
    room: document.getElementById("room").value,
    name: document.getElementById("name").value,
    deposit: document.getElementById("deposit").checked,
    refund: document.getElementById("refund").checked
  };

  console.log("SAVE DATA:", data);

  const res = await apiPost("updateBooking", data);

  console.log("SAVE RESULT:", res);

  if (res && res.error){
    alert("❌ "+res.error);
    return;
  }

  alert("✅ บันทึกแล้ว");
}

// ===== BUTTON =====
function updateButtons(d){
  const checkoutBtn = document.getElementById("btnCheckout");
  const cancelBtn = document.getElementById("btnCancel");

  if (!d.checkinStatus){
    checkoutBtn.disabled = true;
    cancelBtn.disabled = true;
  }
}

// ===== EVENT =====
const saveBtn = document.getElementById("saveBtn");
if (saveBtn) saveBtn.onclick = save;

load();
</script>

</body>
</html>
