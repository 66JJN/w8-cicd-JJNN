# Lab 8 — Build and Observe a CI Pipeline with GitHub Actions
**Repository:** w8-cicd-JJNN  
**Student ID:** 66025795  
**Course:** 225381 · Application Development with Cloud Platform

---

## Project Overview
โปรเจกต์นี้เป็น Node.js HTTP application ขนาดเล็กที่ใช้สาธิตการทำงานของ Continuous Integration (CI) ผ่าน GitHub Actions โดยมี automated test เป็น Quality Gate เพื่อป้องกันโค้ดที่มีข้อผิดพลาดไม่ให้ถูกรวมเข้าสู่ branch `main`

### How to Run Locally
```bash
npm install
npm test
npm start
```

---

## Self-study Extension: Option 1 — Add Test Coverage
ในส่วนของ Self-study Extension ได้เลือกทำ **Option 1: Add Test Coverage** โดยเพิ่มชุดทดสอบใน `index.test.js` จากเดิม 2 กรณี เพิ่มอีก 3 กรณี (รวมเป็น 5 กรณี) ดังนี้:

1. **Thai Unicode Name (`'สมชาย'`)**:
   - **ความเสี่ยงที่ลดลง:** ลดความเสี่ยงเรื่อง Character Encoding (UTF-8 / Unicode) เมื่อรันข้ามระบบปฏิบัติการระหว่าง Local machine (Windows) กับ GitHub Actions Runner (Ubuntu Linux) ป้องกันไม่ให้ข้อความภาษาไทยเกิดปัญหาตัวอักษรเพี้ยน (Mojibake)
2. **Empty String (`''`)**:
   - **ความเสี่ยงที่ลดลง:** ตรวจสอบพฤติกรรมกรณีที่รับค่าเป็น String ว่างเข้ามา ซึ่งใน JavaScript ค่า `''` จะไม่ถูกแทนที่ด้วย default parameter เพื่อให้มั่นใจว่าฟังก์ชันยังคงคืนค่าข้อความได้ตามปกติโดยไม่เกิด Runtime Error
3. **Numeric Input (`2026`)**:
   - **ความเสี่ยงที่ลดลง:** ตรวจสอบกรณี Unexpected Input หรือข้อมูลประเภทตัวเลข เพื่อให้มั่นใจว่า Template Literal ใน JavaScript สามารถแปลง Type เป็น String และเชื่อมต่อข้อความได้อย่างถูกต้อง

**ผลการสังเกต:** รันผ่านครบทั้ง 5 tests (`pass 5, fail 0`) ทั้งบน Local machine และบน GitHub Actions CI Runner

---

## Lab Reflection

ก่อนการทำแล็บนี้ ผมเคยเข้าใจว่า CI/CD เป็นเพียงคำศัพท์ทางทฤษฎีของการรวมโค้ดและส่งขึ้นคลาวด์ แต่หลังจากได้ลงมือปฏิบัติจริงและสังเกต Pipeline เปลี่ยนสถานะจาก Green → Red → Green ทำให้เข้าใจอย่างลึกซึ้งว่า CI (Continuous Integration) มีหัวใจสำคัญคือการใช้ Automated Test เป็น **Quality Gate** ที่คอยตรวจจับข้อผิดพลาดทันทีที่มีการเปลี่ยนแปลงโค้ด และหยุดการทำงาน (Fail-Fast) ก่อนที่บั๊กจะหลุดไปยัง Branch หลัก

ขั้นตอนที่ใช้เวลามากที่สุดในแล็บนี้ คือช่วงแรกที่ Workflow บน GitHub Actions ไม่ทำงานและติดสถานะ Error ซึ่งมีสาเหตุมาจากปัญหาพาธโฟลเดอร์ที่ไม่ตรงตามข้อกำหนดของ GitHub (`.github/workflows/`) รวมถึงข้อจำกัดเรื่อง Billing Verification ของบัญชี GitHub ในการหาสาเหตุ ผมได้ใช้วิธีเปิดอ่าน Error Log และตรวจสอบ Annotation จากระบบอย่างละเอียดแทนการคาดเดา ซึ่งช่วยให้ระบุและแก้ไขปัญหาได้อย่างตรงจุด

สำหรับ Automation ขั้นถัดไปที่ต้องการเพิ่มให้กับระบบนี้ คือการเพิ่ม **Continuous Delivery / Deployment (CD)** โดยตั้งค่าให้เมื่อผ่านการทดสอบบน CI แล้ว ระบบจะทำการ Deploy แอปพลิเคชันไปยัง PaaS (เช่น Vercel หรือ Render) พร้อมทำ Health Check ตรวจสอบสถานะการทำงานของเซิร์ฟเวอร์โดยอัตโนมัติ