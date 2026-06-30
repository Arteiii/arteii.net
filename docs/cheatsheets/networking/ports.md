---
sidebar_position: 2
sidebar_label: Ports
toc_min_heading_level: 2
toc_max_heading_level: 5
---

# Ports

## Port Ranges

- **Well-known Ports (0-1023)**: For system-wide services and standards. Require root privileges to open
- **Registered Ports (1024-49151)**: For user-defined or less common services
- **Dynamic/Private Ports (49152-65535)**: Temporarily assigned for client-side communications

## Network Tools

### nmap

Network scanner for checking open ports and services on remote systems.  
[Documentation](https://nmap.org/docs.html)

```bash
nmap <IP-Address>
```

### netstat

Display open ports and associated services.  
[Documentation](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netstat)

```bash
netstat -tuln
```

### ss

Modern alternative to netstat for displaying network connections.  
[Documentation](https://www.commandlinux.com/man-page/man8/ss.8.html)

```bash
ss -tuln
```

### lsof

List open files and associated processes, useful for checking open ports.  
[Documentation](https://lsof.readthedocs.io/en/latest/)

```bash
lsof -i
```

## Firewall Configuration

### iptables or nftables

Manage Netfilter firewall rules.  
[Documentation](https://netfilter.org/documentation/)  
[IptablesHowTo](https://help.ubuntu.com/community/IptablesHowTo)

### ufw (Uncomplicated Firewall)

User-friendly frontend for iptables.  
[Documentation](https://help.ubuntu.com/community/UFW)

```bash
ufw allow 22/tcp
```

## Security Considerations

- Avoid unused ports: Disable or close unused ports to reduce the attack surface.
- Use secure protocols: Prefer encrypted protocols (e.g., SSH instead of Telnet, HTTPS instead of HTTP).
- Firewall rules: Configure firewall rules to restrict access to open ports.

## Commonly Used Ports

### Port 20/21 (FTP)

- Usage: File Transfer Protocol (FTP)
- Port 20: Data transfers
- Port 21: Control (commands and responses)

### Port 22 (SSH)

- Usage: Secure Shell (SSH) for secure remote connections and file transfers (SCP, SFTP)
- Standard services: OpenSSH

### Port 23 (Telnet)

- Usage: Unencrypted terminal protocol for remote connections (not secure and largely replaced by SSH)

### Port 25 (SMTP)

- Usage: Simple Mail Transfer Protocol (SMTP) for sending emails
- Standard services: Postfix, Sendmail

### Port 53 (DNS)

- Usage: Domain Name System (DNS) for name resolution
- Standard services: BIND, dnsmasq

### Port 80 (HTTP)

- Usage: Hypertext Transfer Protocol (HTTP) for unencrypted web communication
- Standard services: Apache, Nginx

### Port 110 (POP3)

- Usage: Post Office Protocol Version 3 (POP3) for retrieving emails
- Standard services: Dovecot, qpopper

### Port 143 (IMAP)

- Usage: Internet Message Access Protocol (IMAP) for retrieving and managing emails
- Standard services: Dovecot, Courier

### Port 443 (HTTPS)

- Usage: Hypertext Transfer Protocol Secure (HTTPS) for encrypted web communication
- Standard services: Apache, Nginx

### Port 3306 (MySQL/MariaDB)

- Usage: MySQL database server
- Standard services: MySQL, MariaDB

### Port 5432 (PostgreSQL)

- Usage: PostgreSQL database server
- Standard services: PostgreSQL

### Port 6379 (Redis)

- Usage: In-memory data structure store
- Standard services: Redis

### Port 8080 (HTTP Alternate)

- Usage: Alternate HTTP port, often used for development purposes
- Standard services: Apache Tomcat, Spring Boot

## Resources

- [IANA Service Name and Transport Protocol Port Number Registry](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml)
- [RFC 6335](https://datatracker.ietf.org/doc/html/rfc6335)
- [wikipedia](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers)
- [All Ports CheatSheet](https://github.com/shauryasharma-05/All-Ports-CheatSheet-/blob/master/AllPortsDB.txt)
