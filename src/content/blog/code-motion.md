---
title: "ทำวิดีโอด้วยโค้ด ไม่เปิดโปรแกรมตัดต่อเลยสักครั้ง"
description: "เบื้องหลังการทำวิดีโอแนะนำ MemberConnex ด้วย Canvas, Web Audio และ Remotion แล้วแพ็กเป็น skill /code-motion ให้ AI agent ทำวิดีโอแบบนี้ได้เอง"
pubDate: 2026-10-23
author: "Pongsiri P."
heroImage: "/blog/code-motion/cover.png"
tags: ["ai", "remotion", "claude-code", "video"]
---

ช่วงนี้ทีมกำลังทำ MemberConnex ระบบจัดการสมาชิกสมาคมบน LINE แล้วอยากได้วิดีโอสั้นๆ ไว้เล่าว่าระบบทำอะไรได้บ้าง ปกติงานแบบนี้ต้องจ้างโมชันดีไซเนอร์ หรือนั่งลากคีย์เฟรมกันหลายวัน รอบนี้เลยลองอีกทาง คือเขียนวิดีโอเป็นโค้ดทั้งเรื่อง แล้วให้ AI agent เป็นคนลงมือ

<div style="position:relative;width:100%;padding-bottom:56.25%;margin:1.5rem 0;">
  <iframe src="https://www.youtube.com/embed/aFTZO_R5H10" title="MemberConnex trailer" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;border-radius:1em;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>
</div>

## ทำงานยังไง

วิดีโอหนึ่งตัวมีสองไฟล์หลัก

- `visuals.js` วาดภาพลง Canvas เป็นฟังก์ชันของเวลา ใส่ t = 12.5 วินาที ก็ได้ภาพเดิมทุกครั้ง ไม่มีการสุ่ม
- `score.js` บอกว่าวินาทีไหนมีเสียงอะไร แล้วใช้ Web Audio สังเคราะห์เสียงออกมา ไม่ได้ใช้ไฟล์เพลงสักไฟล์

สองไฟล์นี้ไปรวมกันที่ Remotion ซึ่งเปิด Chrome แบบ headless วาดทีละเฟรม แล้วออกมาเป็น MP4

![render pipeline: visuals.js และ score.js รวมกันที่ Remotion ออกมาเป็น MP4](/blog/code-motion/render-pipeline.svg)

ผลที่ได้คือวิดีโอกลายเป็น source code มี git history รีวิวใน PR ได้ วันหน้าฟีเจอร์เปลี่ยนก็แก้ข้อความแล้ว render ใหม่

## สไตล์มาจากไหน

ผมไม่ได้ออกแบบสไตล์เอง ใช้ prompt จาก [AI Style Atlas ของ Futurepedia](https://www.futurepedia.io/resources/ai-style-atlas/view) ซึ่งแต่ละสไตล์มีโค้ด animation ต้นแบบกับชุดเสียงมาให้ครบ ตัว trailer ใช้สไตล์ Isometric Pastel ส่วนวิดีโอสอนใช้งานใช้ Manga Page

## สิ่งที่เรียนรู้ระหว่างทำ

**ให้ทำ storyboard ก่อนเสมอ** AI จะวาดภาพนิ่งของทุกฉากมาให้ดูก่อน ผมอนุมัติแล้วค่อยลงมือทำเต็ม ประหยัดเวลาแก้ทีหลังได้เยอะ

**ข้อความไทยล้นกรอบคือบั๊กอันดับหนึ่ง** รอบแรกเจอหลายจุด เลยเขียนเป็น checklist ไว้ ให้ render ภาพนิ่งทุกฉากมาตรวจก่อน render วิดีโอจริง

**ฟอนต์ต้องเก็บไว้ในโปรเจกต์** ตอนแรกโหลดจาก Google Fonts ตอน render ถ้าวันหนึ่ง Google อัปเดตฟอนต์ วิดีโอที่ render ใหม่ก็จะเปลี่ยนตาม เลยดาวน์โหลดไฟล์มาเก็บไว้เอง render ได้แม้ไม่มีเน็ต

**ไฟล์หายก็ render ใหม่ได้** ผมลองลบ MP4 กับไฟล์เสียงทิ้งแล้ว render ใหม่ ได้วิดีโอที่ภาพและเสียงเหมือนเดิม ไฟล์เสียงต่างจากเดิมแค่ 78 จาก 2.4 ล้าน sample เพราะเศษปัดทศนิยม ซึ่งหูคนไม่มีทางได้ยิน

**สไตล์ฝรั่งไม่มีอักษรไทย** ฟอนต์ในสไตล์ส่วนใหญ่มีแค่ภาษาอังกฤษ เลยต้องหาฟอนต์ไทยที่ฟีลใกล้กันมาแทน เช่น ใช้ Mali แทนลายมือ และ Kanit แทนตัวหนา

## แพ็กเป็น skill ให้ใช้กัน

พอโพสต์ไปแล้วมีหลายคนขอ ผมเลยแพ็กทั้งหมดเป็น skill ชื่อ `/code-motion` เปิดเป็น open source บน GitHub ใช้ได้ทั้ง Claude Code, Codex และ Cursor

👉 https://github.com/savepong/code-motion-skill

ใน repo มีโค้ดของวิดีโอสอนใช้งานข้างล่างนี้ทั้งเรื่องด้วย เปิดดูเป็นตัวอย่างได้ว่าโปรเจกต์จริงหน้าตาเป็นยังไง

ขั้นตอนมีแค่นี้

1. ติดตั้ง skill ในโปรเจกต์ของคุณ
2. สั่ง `/code-motion` แล้วบอกว่าอยากได้วิดีโออะไร
3. เลือกสไตล์จาก Style Atlas
4. ตรวจ storyboard แล้วอนุมัติ
5. เปิดดูใน Remotion Studio ด้วย `bun run studio` เลื่อนดูได้ทุกเฟรม
6. `bun run render` ได้ MP4

วิดีโอสอนใช้งานข้างล่างนี้ ผมก็ใช้ skill ตัวนี้ทำ เป็นการทดสอบไปในตัว ซึ่งก็เจอข้อบกพร่องใน skill เองอีกหลายจุด แก้แล้วอัปเดตลง gist ไปเรียบร้อย มีทั้งแนวนอนสำหรับ YouTube และแนวตั้งสำหรับ TikTok

<div style="position:relative;width:100%;padding-bottom:56.25%;margin:1.5rem 0;">
  <iframe src="https://www.youtube.com/embed/usVhV6zz9fo" title="code-motion tutorial" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;border-radius:1em;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>
</div>

## ท้ายนี้

AI ไม่ได้มาแทนคนทำงานสร้างสรรค์ แต่ทำให้คนที่มีไอเดียลงมือได้เร็วขึ้นมาก ส่วนการตัดสินใจว่า "แบบนี้ยังไม่สวย" ยังเป็นงานของเราอยู่

ลองแล้วเป็นยังไงมาเล่าให้ฟังกันบ้างนะครับ เจอปัญหาก็เปิด issue ได้ อยากช่วยปรับก็ส่ง PR มาได้เลย ยินดีมากครับ
