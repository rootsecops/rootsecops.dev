---
title: "THM_Writeup: w1seguy"
date: "2025-12-05"
tags: ["THM", "Cybersecurity", "Beginner", "CTF", "Walkthrough"]
excerpt: "A clear step-by-step walkthrough of the TryHackMe W1seGuy room, demonstrating how to break weak XOR encryption, recover both flags, and use known-plaintext analysis to derive the key."
---

# Breaking W1seGuy: Exploiting Weak XOR Encryption

**Room:** [https://tryhackme.com/room/w1seguy](https://tryhackme.com/room/w1seguy)

**Category:** Cryptography

**Difficulty:** Easy

---

## Introduction

The W1seGuy room on TryHackMe demonstrates a fundamental cryptography weakness: using XOR encryption with a short repeating key. This write-up explains how I solved the challenge, recovered the first flag through XOR decryption, and obtained the second flag by deriving the correct encryption key used by the server.

The challenge is intentionally designed to show why XOR must never be used with predictable plaintext and short keys.

---

## How the Challenge Works

When you connect to the server on port 1337, it displays:

```
This XOR encoded text has flag 1: <hex string>
What is the encryption key?
```

The server expects a five-character key. If the correct key is provided for that specific connection, it returns the second and final flag.

Each new connection generates a new random 5-character key, but the encryption logic is identical:

```
cipher[i] = plaintext[i] XOR key[i % 5]
hex_output = cipher.encode().hex()
```

Because the XOR key repeats, and the plaintext has a predictable format (`THM{...}`), the encryption can be reversed.

---

## Understanding XOR Weakness

XOR encryption is reversible using the same operation:

```
cipher = plaintext XOR key
plaintext = cipher XOR key
key = cipher XOR plaintext
```

If any part of the plaintext is known or can be guessed, the corresponding key bytes can be recovered.

All TryHackMe flags begin with:

```
THM{
```

This gives us the first four plaintext bytes. The closing brace `}` helps recover the final key byte. With these five bytes, we can fully reconstruct the key.

---

## Recovering Flag 1 (Decrypting the XOR Output)

Given the following hex-encoded XOR string:

```
110e752a3f7427543f3b003e4c103b31725b3a2c04284a622e290a41391a373241613a373e772332
```

I used the following Python script to recover the key and decrypt the message:

```python
import string

xor_output = "110e752a3f7427543f3b003e4c103b31725b3a2c04284a622e290a41391a373241613a373e772332"
key = ''
key_length = 5
target_letters = ["T", "H", "M", "{", "}"]
decrypted_msg = ''

decode_xored = bytes.fromhex(xor_output).decode()
options = list(string.ascii_letters + string.digits)

def key_gen(encrypted_char, target):
    for c in options:
        if chr(ord(encrypted_char) ^ ord(c)) == target:
            return c

for i in range(key_length):
    if i < key_length - 1:
        key += key_gen(decode_xored[i], target_letters[i])
    else:
        key += key_gen(decode_xored[-1], target_letters[i])

for i in range(len(decode_xored)):
    decrypted_msg += chr(ord(decode_xored[i]) ^ ord(key[i % len(key)]))

print(f"The encryption key is: {key}")
print(f"The decrypted message is: {decrypted_msg}")
```

### Output

```
The encryption key is: EF8QO
The decrypted message is: THM{p1alntExtAtt4ckcAnr3alLyhUrty0urxOr}
```

### Flag 1

```
THM{p1alntExtAtt4ckcAnr3alLyhUrty0urxOr}
```

---

## Recovering Flag 2 (Deriving the Correct Key per Connection)

To retrieve the second flag, you must derive the correct five-character key for the current connection and send it to the server. Since the server generates a different key on each connection, you must compute it from the displayed XOR output.

For this XOR output:

```
0e2c230e3c6b05021b381f1c1a34382e500d1e2f1b0a1c462d3628171d192810174539281c210731
```

Using the same known-plaintext method, the script produced:

```
The encryption key is: ZdnuL
```

Entering this key during the same connection:

```
nc 10.48.140.98 1337
This XOR encoded text has flag 1: ...
What is the encryption key? ZdnuL
```

Server response:

```
Congrats! That is the correct key!
Here is flag 2: THM{BrUt3_ForC1nG_XOR_cAn_B3_FuN_nO?}
```

### Flag 2

```
THM{BrUt3_ForC1nG_XOR_cAn_B3_FuN_nO?}
```

---

## Lessons Learned

This room demonstrates common cryptographic mistakes:

1. Using XOR with a short repeating key.
2. Encrypting predictable plaintext.
3. Returning hex output that directly leaks XOR relationships.
4. No randomness or salting applied to plaintext.

XOR becomes insecure when plaintext patterns can be guessed. With only a few known bytes, an attacker can recover the entire key and decrypt all content.

---

## Conclusion

The W1seGuy room provides a beginner-friendly but realistic example of why XOR should not be used for secure encryption. By exploiting predictable plaintext and a short repeating key, both flags can be recovered with minimal computation.

Thanks for reading. Happy hacking.

Written on December 5, 2025
