---
slug: cryptography
title: Cryptography
authors: arteii
keywords:
  [
    Cryptography,
    Encryption,
    Symmetric Encryption,
    Asymmetric Encryption,
    Caesar Cipher,
  ]
date: 2023-07-25T18:00
draft: true
---

In today's digital world, where data has immense value and communication is networked, the security of sensitive
information is paramount.
Encryption plays a critical role. It allows data to be transformed into an unreadable form so that it can only be
decrypted by authorized parties.

Encryption is a fundamental concept used in many areas of digital life.
From the secure transmission of email and online payments to the protection of personal information on mobile devices,
encryption is an indispensable tool for ensuring the confidentiality and integrity of data.

<!--truncate-->

## Intro

encryption can be used for multiple securing operations such as:

### secure communication

- web traffic
  - https ([SSL/TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security#SSL_1.0,_2.0,_and_3.0))
- wireless
  - WPA ([**W**i-Fi **P**rotected **A**ccess](https://en.wikipedia.org/wiki/Wi-Fi_Protected_Access))
  - GSM ([**G**roupe **S**pecial **M**obile](https://de.wikipedia.org/wiki/Global_System_for_Mobile_Communications))

### Encryption On Disks

- TrueCrypt
- EFS ([**E**ncrypting **F**ile **S**ystem](https://en.wikipedia.org/wiki/Encrypting_File_System))

### Content Protection

- DVD: CSS ([**C**ontent **S**cramble **S**ystem](https://en.wikipedia.org/wiki/Content_Scramble_System))
- Blu-Ray: AACS ([**A**dvanced **A**ccess **C**ontent **S
  **ystem](https://en.wikipedia.org/wiki/Advanced_Access_Content_System))

### SSL/TLS and HTTPS key exchange

The client sends a request to the server to establish a secure connection.

The server responds by sending its public key and a digital certificate back to the client.
The certificate also contains the server's domain name.

The client checks the certificate to make sure it is valid and that the domain name matches the server name it is
requesting.
If the certificate is invalid or has expired, a connection warning is displayed.

If the certificate is valid, the client generates a temporary session key (symmetric key) and encrypts it with the
server's public key.
It then sends the encrypted session key to the server.

The server decrypts the received session key with its private key and receives the same symmetric session key as the
client.

The client and server now use the symmetric session key to encrypt and decrypt all data transmitted over the connection.
This ensures that the data is secure and protected from unauthorised access.

The secure connection has been successfully established and the client and server can communicate securely.
This is indicated by the padlock icon in the browser address bar.

## History

most of the encryption algorithmens i will talk about here are deprecated and mostly useless
as you will see while reading

### Caeser Cipher

## Sources

- [wikipedia Pretty Good Privacy](https://en.wikipedia.org/wiki/Pretty_Good_Privacy)
- [wikipedia Public-key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography)
- [wikipedia Secure Hash Algorithms](https://en.wikipedia.org/wiki/Secure_Hash_Algorithms)
- [wikipedia RSA (cryptosystem)](<https://en.wikipedia.org/wiki/RSA_(cryptosystem)>)
- [public key fingerprint](https://en.wikipedia.org/wiki/Public_key_fingerprint)
- [What is AES encryption and how does it work?](https://web.archive.org/web/20210811235422/https://cybernews.com/resources/what-is-aes-encryption/)
- [cheatsheetseries](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [Dan Boneh | Stanford University](https://www.coursera.org/learn/crypto?)
