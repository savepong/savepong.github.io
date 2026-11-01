---
title: "เอา container ใหม่ไปลงบนเครื่อง Docker เก่า: บทเรียนที่ผมเจ็บมาแล้ว"
description: "รวมกับดักเวลา deploy container ที่เพิ่ง build เสร็จลงเครื่องที่รัน Docker รุ่นเก่ามานานหลายปี ตั้งแต่ DB crash-loop ยันเรื่อง cert ที่ไม่ยอมออก"
pubDate: 2026-11-01
author: "Pongsiri P."
tags: ["docker", "legacy", "deploy"]
---

<!-- source-note: Knowledge/Deploying Modern Containers on Legacy Docker Hosts.md -->

คืองี้ครับ เวลาเราได้ยินคำว่า container คนส่วนใหญ่จะนึกถึงภาพสวย ๆ ว่า "build ที่ไหนก็รันได้เหมือนกันหมด" ซึ่งมันก็จริง... ตราบใดที่เครื่องปลายทางไม่ได้เก่าเกินไป

แต่ถ้าเครื่องที่คุณจะ deploy ลงไปเป็นเครื่องที่รัน Docker รุ่นเก่า ๆ ตั้งแต่ก่อนปี 2020 แล้วอัปไทม์ยาวเป็นปี ๆ โดยไม่เคยแตะเลย เรื่องมันจะไม่ง่ายแบบนั้นครับ

ผมเปรียบเทียบง่าย ๆ ว่ามันเหมือนเอาปลั๊กไฟสามขารุ่นใหม่ไปเสียบเต้ารับบ้านเก่า หน้าตาคล้ายกัน แต่พอเสียบจริงมันไม่เข้า แล้วปัญหาไม่ได้อยู่ที่ปลั๊ก ไม่ได้อยู่ที่เต้ารับ มันอยู่ที่ "ช่องว่างระหว่างสองรุ่น" ซึ่งเป็นจุดที่ไม่มีใครเขียน doc ไว้ให้

## เรื่องที่ 1: ฐานข้อมูลที่ crash วนไม่หยุด

อันนี้เจอแล้วปวดหัวที่สุดครับ MariaDB 10.x ขึ้นมาแล้วตายวนลูป พร้อม error ว่า `mariadbd: Can't initialize timers`

ต้นเหตือคือ libseccomp กับ kernel ของเครื่องเก่ามันบล็อก syscall บางตัวที่ image ใหม่ต้องใช้ พูดง่าย ๆ คือ container พยายามเคาะประตูขอบริการจากระบบปฏิบัติการ แต่ยามหน้าประตูรุ่นเก่าไม่รู้จักรหัสเคาะแบบใหม่ ก็เลยไม่เปิดให้

ทางแก้ที่ผมใช้คือใส่ `security_opt: [seccomp:unconfined]` ให้ service ของ DB ไปเลย บรรทัดเดียวจบ (จะไปหา DB image เก่ากว่าก็ได้ แต่ทางนี้ชัวร์กว่า)

## เรื่องที่ 2: `docker compose` ที่ไม่มีอยู่จริง

บนเครื่องเก่า คำสั่ง `docker compose` แบบ v2 ไม่มีนะครับ มีแต่ `docker-compose` ที่มีขีดกลาง และของเก่าแบบ v1 นี้มันจุกจิกกว่าที่คิด

อย่างแรก มันหาไฟล์ `docker-compose.yml` เจอเท่านั้น ถ้าคุณตั้งชื่อ `compose.yaml` ตามสไตล์สมัยนี้ มันจะทำหน้าไม่รู้จัก

อย่างที่สอง ถ้าคุณอยากใช้ `depends_on` แบบรอ healthcheck (`condition: service_healthy`) ไฟล์ compose ต้องประกาศ `version: "2.4"` ครับ เพราะ schema 3.x ตัด `condition` ออกไปแล้ว — ใช่ครับ ของใหม่กว่าแต่ทำได้น้อยกว่า

## เรื่องที่ 3: Caddy ที่คุณคิดว่ารู้จัก

ก่อนจะแตะอะไร ให้ `docker ps` แล้ว `docker inspect` ดูก่อนเสมอครับ เพราะ Caddy บนเครื่องอาจไม่ได้ลงบน host และอาจไม่ใช่ v2 ด้วย

ถ้าเจอ image ชื่อ `abiosoft/caddy` นั่นคือ Caddy v1 ซึ่ง syntax ของ Caddyfile คนละเรื่องกับที่เราคุ้นเลย เป็นแนว `proxy / <container>:80 { transparent }` กับ `tls email@x` การจะเอาแอปใหม่เข้าไปก็ต้องเอา container ไป join docker network เดียวกับ Caddy แล้ว proxy ด้วยชื่อ container ตรง ๆ (DNS บน user-defined bridge ทำงานให้อยู่แล้ว)

และจุดที่ทำผมเสียเวลาที่สุด: การส่ง `SIGUSR1` ให้ Caddy v1 reload **ไม่ได้ขอ cert ให้ไซต์ใหม่** ครับ

`docker kill -s USR1 caddy` มันโหลด vhost ใหม่ให้จริง พอร์ต 443 รู้จักไซต์เราแล้ว แต่มันไม่เคยวิ่งไปทำ ACME ผลคือขึ้น "no certificate available" ค้างอยู่อย่างนั้น ทางแก้คือ `docker restart caddy` เต็ม ๆ ซึ่งแลกมาด้วยการที่ทุกไซต์สะดุดไปสองสามวินาที แต่ก่อนจะรีสตาร์ท เช็กให้ชัวร์ว่า DNS A-record ชี้มาถูกและพอร์ต 80 เข้าถึงได้แล้ว

เสริมอีกข้อ ถ้า Caddy เป็น container อย่าเผลอไปเคาะ `systemctl restart caddy` ครับ ผิดฝาผิดตัว และ `docker compose restart` ก็ไม่ไปแตะ container ที่อยู่นอกโปรเจกต์เราด้วย

## แล้ว image ของเราเองก็มีกับดัก

สองข้อนี้ไม่เกี่ยวกับเครื่องเก่า แต่เจอได้ทุกที่

`php:*-fpm` base image มีไฟล์ `zz-docker.conf` ซ่อนอยู่ใน `php-fpm.d/` แล้วมันโหลด**หลัง** `www.conf` เลยบังคับ pool ให้เป็น TCP `:9000` เงียบ ๆ ถ้าคุณตั้งใจใช้ unix socket ต้อง `RUN rm /usr/local/etc/php-fpm.d/zz-docker.conf` ใน Dockerfile ไม่งั้นคุณจะนั่งงงว่าทำไม config ตัวเองไม่มีผล

อีกอันคือ `fastcgi_params` ของ Debian/nginx ตั้ง `HTTP_HOST $host` ซึ่งมันตัดพอร์ตออก ผลคือ Laravel/Symfony สร้าง URL กับ redirect แล้วพอร์ตหายไปเลย (เช่น `:8080` หลุดตอน redirect หลัง login) แก้ด้วย `fastcgi_param HTTP_HOST $http_host;` ใน location ของ php และถ้าอยู่หลัง reverse proxy ก็ตั้ง TrustProxies ของแอปกับ forward `X-Forwarded-Proto` ด้วย

## ทิ้งท้ายเรื่อง stack ที่ EOL แล้ว

ถ้าโค้ดมันเก่าถึงขั้น dependency หมดอายุ Composer รุ่นใหม่จะไม่ยอม install ให้ ทั้ง security-advisory blocker และ `allow-plugins` gate จะดีดทิ้ง ทางออกคือปิด block advisory กับอนุญาต plugins แล้ว **commit `composer.lock` ให้เรียบร้อยเสมอ** โดยเฉพาะถ้าใช้ `minimum-stability: dev` เพราะไม่งั้นมันจะไปหยิบปลายกิ่งที่ขยับทุกวันมาให้

บทเรียนรวมของผมคือ: เครื่องเก่าไม่ได้ "พัง" ครับ มันแค่พูดภาษาคนละรุ่นกับของใหม่ที่เราถือไป งานของเราไม่ใช่การดื้อดันให้ของใหม่ชนะ แต่คือหาจุดที่สองรุ่นคุยกันรู้เรื่อง — แล้วจดไว้ เพราะคุณจะเจออีก
