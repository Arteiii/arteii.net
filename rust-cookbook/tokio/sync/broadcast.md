---
id: broadcast
title: Broadcast
sidebar_position: 1
description: broadcast
---

# Broadcast Data Type in Tokio

The `broadcast` channel in Tokio is a powerful mechanism used to send data to multiple consumers simultaneously.
It is especially useful in scenarios where you need to send the same message to multiple tasks or processes concurrently
without worrying about managing each consumer independently.


- **Broadcasting**: Every message sent is delivered to all current receivers.
- **Bounded capacity**: The broadcast channel has a limited capacity, which is set during initialisation.
  If this limit is exceeded, older messages are dropped.
- **Message cloning**: Messages must implement the `Clone` trait because they are duplicated for each receiver.


## Basic Usage

### Creating a Broadcast Channel

In this example, the channel can hold up to 10 messages at a time.
When the buffer is full, the oldest messages are dropped to make room for new ones.

```rust
use tokio::sync::broadcast;

#[tokio::main]
async fn main() {
    let (tx, _rx) = broadcast::channel(10);
}
```

### Sending Messages

To send a message to all consumers, you call the `send` method on the transmitter (`tx`).

```rust
use tokio::sync::broadcast;

#[tokio::main]
async fn main() {
    let (tx, _rx) = broadcast::channel(10);

    // send a message to all consumers
    tx.send(42).unwrap();
}
```

:::info
The `send` function returns a `Result` indicating whether the message was sent successfully.
It returns an error if no receivers are listening.
:::

### Receiving Messages

To receive messages, each consumer spawns a receiver (`rx`).
You can clone the receiver to create multiple consumers.

```rust
use tokio::sync::broadcast;
use tokio::task;

#[tokio::main]
async fn main() {
    let (tx, rx1) = broadcast::channel(10);
    let mut rx2 = tx.subscribe();  // create a second receiver

    // receive messages
    task::spawn(async move {
        while let Ok(message) = rx1.recv().await {
            println!("Receiver 1 got: {}", message);
        }
    });

    // receive messages
    task::spawn(async move {
        while let Ok(message) = rx2.recv().await {
            println!("Receiver 2 got: {}", message);
        }
    });

    // send a message
    tx.send(42).unwrap();
}
```

### Handling Message Drops

Since the broadcast channel has a bounded capacity, if a receiver falls behind, it may miss some messages.
In that case, the `recv` function will return an error of type `RecvError::Lagged`,
which tells how many messages were missed.

```rust
use tokio::sync::broadcast;

#[tokio::main]
async fn main() {
    let (tx, mut rx) = broadcast::channel(2);

    tx.send(1).unwrap();
    tx.send(2).unwrap();
    tx.send(3).unwrap();  // this will cause message drop for any slow receiver

    match rx.recv().await {
        Ok(message) => println!("Received: {}", message),
        Err(broadcast::error::RecvError::Lagged(n)) => {
            println!("Missed {} messages", n);
        }
        Err(_) => println!("Receiver closed"),
    }
}
```
