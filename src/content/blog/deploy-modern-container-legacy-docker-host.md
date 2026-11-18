---
title: "เอา container ใหม่ไปลงบนเครื่องเก่า: 8 กับดักที่ผมเจอมาเอง"
description: "เครื่อง Docker ที่ไม่ได้แตะมาห้าปี มันไม่ได้พังเพราะเราเขียน config ผิด แต่พังเพราะมันเกิดมาก่อนยุคของ container ที่เราเพิ่งบิลด์ มาดูกันว่ามีจุดไหนที่ต้องระวัง"
pubDate: 2026-11-18
author: "Pongsiri P."
tags: ["docker", "legacy", "deploy"]
---

<!-- source-note: Knowledge/Deploying Modern Containers on Legacy Docker Hosts.md -->

คืองี้ครับ เวลาเราบิลด์ container เสร็จใหม่ ๆ บนเครื่องตัวเอง แล้วมันรันผ่านสวยงาม เรามักจะคิดว่างานจบแล้ว เหลือแค่ยกไปวางบน production

ปัญหาคือถ้า production ตัวนั้นเป็นเครื่องที่ยืนรันมาหลายปีแบบไม่ได้แตะเลย งานมันจะไม่จบง่าย ๆ ครับ

ลองนึกภาพว่าคุณซื้อเครื่องใช้ไฟฟ้ารุ่นใหม่มา เสียบปลั๊กบ้านหลังเก่าแล้วไฟตก ไม่ใช่เพราะเครื่องเสีย ไม่ใช่เพราะบ้านเสีย แต่เพราะสายไฟในบ้านมันถูกเดินไว้ตอนที่โลกยังไม่มีเครื่องรุ่นนี้ การ deploy ลงเครื่องเก่าก็อารมณ์เดียวกันเลย

ผมเลยจดกับดักที่เจอจริงตอนเอา container ไปลงบน host ยุคก่อนปี 2020 ไว้ แยกเป็นสองกลุ่ม

## กลุ่มแรก: ปัญหาที่เกิดจาก "ตัวเครื่องเก่า"

1. MariaDB 10.x crash วนลูป พร้อม error ว่า `Can't initialize timers` ต้นเหตุคือ libseccomp กับ kernel ของเครื่องเก่ามันบล็อก syscall ที่ image ใหม่เรียกใช้ เหมือนยามหน้าตึกที่ได้ลิสต์ชื่อแขกมาจากปีที่แล้ว ใครชื่อใหม่เข้าไม่ได้หมด วิธีแก้ที่ชัวร์สุดคือใส่ `security_opt: [seccomp:unconfined]` ให้ service ของ DB ไปเลยครับ

2. `docker compose` v2 ไม่มีอยู่บนเครื่องแบบนี้ มีแต่ `docker-compose` v1 ที่มีขีดกลาง และ v1 รุ่นเก่ายังมองเห็นแค่ไฟล์ชื่อ `docker-compose.yml` ไม่รู้จัก `compose.yaml` อีกจุดที่หลายคนสะดุดคือ ถ้าอยากใช้ `depends_on` แบบรอ healthcheck ไฟล์ compose ต้องประกาศ `version: "2.4"` เพราะ schema 3.x ตัด `condition` ออกไปแล้ว

3. Caddy บนเครื่องอาจเป็น container v1 ไม่ใช่ v2 ที่ลงบน host เช็คด้วย `docker ps` กับ `docker inspect` ก่อนครับ ถ้าเจอว่าเป็น image ตระกูล `abiosoft/caddy` นั่นคือ Caddy v1 ซึ่ง syntax ของ Caddyfile คนละเรื่องกันเลย เป็น `proxy / <container>:80 { transparent }` และ `tls` ตามด้วยอีเมล วิธีต่อแอปใหม่เข้าไปคือเอา container ของเราไป join docker network เดียวกับ Caddy แล้ว proxy ด้วยชื่อ container ตรง ๆ เพราะ DNS ทำงานอยู่แล้วบน user-defined bridge

4. อันนี้เสียเวลาผมที่สุด: Caddy v1 สั่ง reload ด้วย `SIGUSR1` มันไม่ยอมออก cert ให้ไซต์ใหม่ครับ `docker kill -s USR1` จะโหลด vhost ใหม่เข้ามาจริง แต่ไม่ยิง ACME ให้ สุดท้ายได้ error ว่าไม่มี certificate ต้อง `docker restart` ตัว Caddy เต็ม ๆ แลกกับการที่ทุกไซต์สะดุดไปสองสามวินาที และก่อนทำ เช็คให้ชัวร์ว่า DNS A-record ชี้มาแล้วและ port 80 เข้าถึงได้ ที่ต้องย้ำคือถ้า Caddy เป็น container การไป `systemctl restart caddy` คือผิดที่ และ `docker compose restart` ก็ไม่โดน เพราะ container มันอยู่นอก project ของเรา

## กลุ่มสอง: ปัญหาที่ตัว image เอง (เจอได้ทุกเครื่อง)

5. base image `php:*-fpm` มีไฟล์ `zz-docker.conf` ซ่อนอยู่ใน `php-fpm.d/` และมันโหลดทีหลัง `www.conf` แปลว่าถ้าเราตั้งให้ listen เป็น unix socket มันจะถูกทับให้กลับไปเป็น TCP :9000 แบบเงียบ ๆ ต้อง `rm` ไฟล์นั้นใน Dockerfile ครับ

6. `fastcgi_params` ของ nginx สาย Debian เซ็ต `HTTP_HOST` เป็น `$host` ซึ่งตัด port ออก ผลคือ Laravel/Symfony สร้าง URL แล้ว port หาย เช่น redirect ตอน login แล้ว `:8080` หลุด แก้ด้วยการใส่ `fastcgi_param HTTP_HOST $http_host;` ใน location ของ php และถ้าอยู่หลัง reverse proxy ก็ตั้ง TrustProxies กับส่ง `X-Forwarded-Proto` ด้วย

7. โปรเจกต์ EOL จะติด Composer รุ่นใหม่ ทั้ง security-advisory blocker และ `allow-plugins` ปิดประตูใส่ dependency เก่า ทางออกคือปิด advisories block กับเปิด allow-plugins และสำคัญมาก: commit `composer.lock` ไปด้วยเสมอ ยิ่งถ้า stack นั้นใช้ `minimum-stability: dev` เพราะไม่งั้นมัน resolve ไปตาม branch-tip ที่ขยับทุกวัน

8. ถ้าแอปต้องคุยกับ service ที่ bind อยู่แค่ loopback ของเครื่อง container บน bridge จะเข้าไม่ถึง ทางที่ใช้ได้คือ `network_mode: host` เพื่อแชร์ loopback กัน ส่วนเครื่องมือจัดการ DB ให้ publish แบบ loopback-only แล้วต่อผ่าน SSH tunnel ครับ อย่าเปิดออกเน็ตตรง ๆ เด็ดขาด

แก่นของทั้งแปดข้อคือเรื่องเดียวกันครับ: เครื่องเก่าไม่ได้ "พัง" มันแค่ทำตามกฎของยุคที่มันเกิด ก่อน deploy ลง host ยุคก่อน 2020 แวะเช็คลิสต์นี้ก่อน จะประหยัดเวลาไปได้เยอะเลย
