---
id: integers
title: Integers
sidebar_position: 1
description: i8, i16, i32, i64, i128, isize, u8, u16, u32, u64, u128, usize
---

In Rust, integers are primitive types used to represent whole numbers.
They come in both signed and unsigned varieties,
with different sizes available for optimal performance or specific use cases.
Rust provides multiple integer types with different ranges, ensuring type safety and efficient memory use.

#### Signed vs. Unsigned Integers

- **Signed integers** (`i`) can store both positive and negative numbers.
  The sign takes one bit, so the range of values is reduced compared to unsigned integers of the same size.

- **Unsigned integers** (`u`) can store only non-negative numbers,
  allowing them to represent a larger range of positive numbers than their signed counterparts.

#### Integer Types and Their Sizes

| Type    | Size                   | Range                                                   |
|---------|------------------------|---------------------------------------------------------|
| `i8`    | 8-bit                  | -128 to 127                                             |
| `u8`    | 8-bit                  | 0 to 255                                                |
| `i16`   | 16-bit                 | -32,768 to 32,767                                       |
| `u16`   | 16-bit                 | 0 to 65,535                                             |
| `i32`   | 32-bit                 | -2,147,483,648 to 2,147,483,647                         |
| `u32`   | 32-bit                 | 0 to 4,294,967,295                                      |
| `i64`   | 64-bit                 | -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 |
| `u64`   | 64-bit                 | 0 to 18,446,744,073,709,551,615                         |
| `i128`  | 128-bit                | Huuuuugeee                                              |
| `u128`  | 128-bit                | Huuuge aswell                                           |
| `isize` | Architecture-dependent | Varies based on CPU architecture (32 or 64-bit)         |
| `usize` | Architecture-dependent | Varies based on CPU architecture (32 or 64-bit)         |

The `isize` and `usize` types depend on the system’s architecture.
On a 32-bit system, they are 32 bits wide, and on a 64-bit system, they are 64 bits wide.
These are commonly used when indexing collections or working with memory addresses.

#### Creating and Using Integers

You can create integers using literals. By default, Rust infers `i32` if no specific type is provided.

```rust
let signed: i32 = -42;
let unsigned: u32 = 42;
```

You can specify integer literals using suffixes:

```rust
let small = 120i8;
let large: u64 = 1_000_000;
```

Note: The `_` is used for readability and does not affect the value.

#### Arithmetic Operations

Rust supports standard arithmetic operations on integers,
including addition (`+`), subtraction (`-`), multiplication (`*`), division (`/`), and modulus (`%`):

```rust
let sum = 5 + 10;
let product = 4 * 6;
let quotient = 10 / 2;
let remainder = 10 % 3;
```

#### Overflow Handling

By default, Rust checks for overflow in debug mode.
For example, if you try to assign a value that exceeds the range of the integer type, it will panic in debug mode.

In release mode, Rust allows overflow with wrapping behavior (modulo behavior).
You can also use methods like `.wrapping_add()`, `.checked_add()`, `.saturating_add()`,
and `.overflowing_add()` to handle overflows explicitly.

```rust
let result = 255u8.wrapping_add(1); // Wraps to 0
```

#### Conversion Between Integer Types

If you need to convert between integer types, you can use `as` for casting:

```rust
let small: u8 = 100;
let large: u32 = small as u32;
```

Rust will not automatically convert between different integer types to ensure type safety.

#### Common Methods

Rust’s integer types come with useful methods:

- **Checking even/odd**:
  ```rust
  let num: i32 = 4;
  println!("{}", num.is_even()); // true
  println!("{}", num.is_odd());  // false
  ```

- **Converting to/from Strings**:
  ```rust
  let num_str = 42.to_string();
  let parsed_num: i32 = "42".parse().unwrap();
  ```

#### Example: Handling Overflow Explicitly

Let’s say you want to safely add two `u8` values without panicking or wrapping:

```rust
fn safe_add(a: u8, b: u8) -> Option<u8> {
    a.checked_add(b)
}

let result = safe_add(250, 10);
println!("{:?}", result); // None (would overflow)
```
