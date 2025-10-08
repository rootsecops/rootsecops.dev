---
title: "HTB Tier 1: Dancing - Complete Walkthrough"
date: "2025-08-24"
tags: ["HTB", "Cybersecurity", "Beginner", "CTF", "Walkthrough"]
excerpt: "A complete step-by-step walkthrough for the HTB Tier 1: Dancing machine, including all commands, outputs, and explanations for tools used."
---

# HTB Tier 1: Dancing Walkthrough

This walkthrough provides a detailed step-by-step solution for the HTB Tier 1: Dancing machine. All commands, outputs, and explanations are included so anyone can follow along.

---

## Step 1

**Question:** What does the 3-letter acronym SMB stand for?

**Answer:** Server Message Block ✅

**Explanation:**
- SMB is a network file sharing protocol.
- It allows applications and users to read/write files and request services from servers.

---

## Step 2

**Question:** What port does SMB use to operate at?

**Answer:** 445 ✅

**Explanation:**
- SMB originally used port 139 (NetBIOS).
- Modern SMB runs on port **445/TCP** directly over IP.

---

## Step 3

**Question:** What is the service name for port 445 that came up in our nmap scan?

**Answer:** microsoft-ds ✅

**Explanation:**
- "microsoft-ds" refers to Microsoft Directory Services, which uses SMB over TCP.
- Confirmed via nmap service detection.

---

## Step 4

**Question:** What is the OS of the machine?

**Answer:** Windows ✅

**Explanation:**
- Nmap banner and SMB enumeration show a Windows host.
- SMB is natively implemented in Windows.

---

## Step 5

**Question:** How many shares are there on Dancing?

**Answer:** 4 ✅

**Command Used:**
```bash
smbclient -L //10.129.28.158 -N
```

**Output (trimmed):**
```
Sharename       Type      Comment
---------       ----      -------
ADMIN$          Disk      Remote Admin
C$              Disk      Default share
IPC$            IPC       Remote IPC
WorkShares      Disk
```

**Explanation:**
- 4 shares detected.
- `ADMIN$` and `C$` are administrative shares.
- `IPC$` is for interprocess communication.
- `WorkShares` is a custom share.

---

## Step 6

**Question:** What is the name of the share we are able to access in the end with a blank password?

**Answer:** WorkShares ✅

**Command Used:**
```bash
smbclient //10.129.28.158/WorkShares -U anonymous
```

**Explanation:**
- Tried connecting to each share.
- Only `WorkShares` allowed access with user `anonymous` and a blank password.
- Other shares required credentials.

---

## Step 7

**Question:** What is the command we can use within the SMB shell to download the files we find?

**Answer:** get ✅

**Explanation:**
- Inside `smbclient`, the `get <filename>` command downloads a file from the SMB share to the local system.
- Use `mget *` to download multiple files.

---

## Step 8 – Enumerating WorkShares

**Command Used:**
```bash
smbclient //10.129.28.158/WorkShares -U anonymous
```

**Output:**
```
smb: \> ls
  .                                   D        0  Mon Mar 29 04:22:01 2021
  ..                                  D        0  Mon Mar 29 04:22:01 2021
  Amy.J                               D        0  Mon Mar 29 05:08:24 2021
  James.P                             D        0  Thu Jun  3 04:38:03 2021
```

**Explanation:**
- Found directories for users `Amy.J` and `James.P`.
- To explore, use `cd Amy.J` or `cd James.P` and then `ls`.
- Files inside can be downloaded with `get`.

---

## Final Step – Retrieving the Flag

**Steps Taken:**
1. Listed available shares with `smbclient -L`.
2. Identified accessible share: `WorkShares`.
3. Connected anonymously with:
   ```bash
   smbclient //10.129.28.158/WorkShares -U anonymous
   ```
4. Navigated into user directories (`Amy.J`, `James.P`).
5. Used `get <filename>` to download files.
6. Retrieved and read the flag with:
   ```bash
   cat flag.txt
   ```

---

## Tools Used

- **Nmap**: Scanned ports, detected SMB service, OS, and shares.
- **smbclient**: Enumerated and accessed SMB shares, downloaded files.

---

## Glossary / Acronyms

- **SMB**: Server Message Block
- **IPC**: Inter-Process Communication
- **ADMIN$ / C$**: Default administrative shares on Windows
- **get**: `smbclient` command to download files