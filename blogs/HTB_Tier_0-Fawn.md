---

title: "HTB Tier 0: Fawn - Complete Walkthrough"
date: "2025-08-21"
tags: ["HTB", "Cybersecurity", "Beginner", "CTF", "Walkthrough"]
excerpt: "A complete step-by-step walkthrough for the HTB Tier 0: Fawn machine, including all commands, outputs, and explanations for tools used."
---

# HTB Tier 0: Fawn Walkthrough

This walkthrough provides a detailed step-by-step solution for the HTB Tier 0: Fawn machine. All commands, outputs, and explanations are included so anyone can follow along.

---

## Step 1

**Question:** What does the 3-letter acronym FTP stand for?

**Answer:** File Transfer Protocol ✅

**Explanation:**

* Protocol for transferring files between computers over a network.
* Sends data in clear text (not encrypted).

---

## Step 2

**Question:** Which port does the FTP service usually listen on?

**Answer:** 21 ✅

**Explanation:** Standard port for FTP service.

---

## Step 3

**Question:** FTP sends data in the clear. What acronym is used for a later protocol designed to provide similar functionality securely over SSH?

**Answer:** SFTP (SSH File Transfer Protocol) ✅

**Explanation:**

* Encrypts file transfers using SSH.
* Different from FTPS (FTP over SSL/TLS).

---

## Step 4

**Question:** What is the command to send an ICMP echo request to test connectivity?

**Answer:** `ping` ✅

**Command:**

```bash
ping 10.129.211.204
```

**Explanation:** Uses ICMP (Internet Control Message Protocol) to test reachability.

---

## Step 5

**Question:** From your scans, what version is FTP running on the target?

**Answer:** vsftpd 3.0.3 ✅

**Command and Output:**

```bash
nmap -sC -sV 10.129.211.204
```

```
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_-rw-r--r--    1 0        0              32 Jun 04  2021 flag.txt
Service Info: OS: Unix
```

**Explanation:**

* Tool: Nmap (`-sC` runs default scripts, `-sV` detects service version).
* FTP running on port 21, anonymous login allowed.

---

## Step 6

**Question:** What OS type is running on the target?

**Answer:** Unix ✅

**Explanation:** Multi-user, multitasking OS. Linux/Unix commands can be used on this system.

---

## Step 7

**Question:** What command shows the FTP client help menu?

**Answer:** `ftp -?` ✅

**Explanation:** Displays all FTP options/flags such as `-a` for anonymous login, `-p` for passive mode, `-d` for debugging.

---

## Step 8

**Question:** Username used for anonymous FTP login?

**Answer:** `anonymous` ✅

**Example:**

```bash
ftp 10.129.211.204
Name (10.129.211.204:root): anonymous
Password: <blank or anything>
```

---

## Step 9

**Question:** FTP response code for “Login successful”?

**Answer:** 230 ✅

**Explanation:**
Common FTP response codes:

* 220 → Service ready
* 331 → Username accepted, need password
* 230 → Login successful

---

## Step 10

**Question:** Command to list files besides `dir`?

**Answer:** `ls` ✅

**Example:**

```text
ftp> ls
-rw-r--r-- 1 0 0 32 Jun 04 2021 flag.txt
```

---

## Step 11

**Question:** Command to download a file from the FTP server?

**Answer:** `get` ✅

**Explanation:**
`get <filename>` downloads the file to your local machine.

FTP modes:

* ASCII → for text files
* Binary → for non-text files (images, executables)

**Example:**

```text
ftp> binary   # optional, ensures exact copy
ftp> get flag.txt
```

---

## Final Step – Root Flag

**Steps Taken:**

1. Logged in to FTP anonymously.
2. Listed files with `ls`.
3. Downloaded `flag.txt` using `get`.
4. Viewed the content:

```bash
cat flag.txt
```

**Root Flag:**
`035db21c881520061c53e0536e44f815`

---

## Tools Used

* **Nmap** — Network scanner; used with `-sC -sV` for scripts and version detection.
* **FTP** — Command-line FTP client for connecting and transferring files.
* **Ping** — Check connectivity using ICMP.

---

## Glossary / Acronyms

* **FTP** = File Transfer Protocol
* **SFTP** = SSH File Transfer Protocol
* **ICMP** = Internet Control Message Protocol
* **ASCII** = American Standard Code for Information Interchange
* **Binary** = Raw 0s and 1s representation of data
<<<<<<< HEAD
=======

>>>>>>> 57abbc81022d7bd60a066c1bdbf3660f704b6b23
