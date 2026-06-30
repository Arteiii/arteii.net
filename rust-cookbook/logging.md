---
id: logging
title: Logging
sidebar_position: 3
---

# Logging

Rust provides multiple logging crates that can be easily integrated into your applications for various logging levels,
custom outputs, and more.

## Log Messages

Log messages are categorized into different levels, such as `debug`, `info`, `warn`, `error`, etc.,
each serving a unique purpose in monitoring your application's state.
Rust's `log` crate provides macros to generate these messages,
while libraries like `env_logger` help you control their output.

### Log a debug message to the console

```toml
[dependencies]
log = "0.4.22"
env_logger = "0.11.5"
```

The `log` crate provides logging utilities. The `env_logger` crate configures
logging via an environment variable. The [`log::debug!`] macro works like other
[`std::fmt`] formatted strings.

```rust
fn execute_query(query: &str) {
    log::debug!("Executing query: {}", query);
}

fn main() {
    env_logger::init();

    execute_query("DROP TABLE students");
}
```

No output prints when running this code. By default, the
log level is `error`, and any lower levels are dropped.

Set the `RUST_LOG` environment variable to print the message:

```shell
$ RUST_LOG=debug cargo run
```

Cargo prints debugging information then the
following line at the very end of the output:

```shell
DEBUG:main: Executing query: DROP TABLE students
```

[`log::debug!`]: https://docs.rs/log/*/log/macro.debug.html
[`std::fmt`]: https://doc.rust-lang.org/std/fmt/

### Log an error message to the console

```toml
[dependencies]
log = "0.4.22"
env_logger = "0.11.5"
```

Proper error handling considers exceptions exceptional. Here, an error logs
to stderr with `log`'s convenience macro [`log::error!`].

```rust
fn execute_query(_query: &str) -> Result<(), &'static str> {
    Err("I'm afraid I can't do that")
}

fn main() {
    env_logger::init();

    let response = execute_query("DROP TABLE students");
    if let Err(err) = response {
        log::error!("Failed to execute query: {}", err);
    }
}
```

[`log::error!`]: https://docs.rs/log/*/log/macro.error.html

### Log to stdout instead of stderr

```toml
[dependencies]
log = "0.4.22"
env_logger = "0.11.5"
```

Creates a custom logger configuration using the [`Builder::target`] to set the target of the log output to [`Target::Stdout`].

```rust
use env_logger::{Builder, Target};

fn main() {
    Builder::new()
        .target(Target::Stdout)
        .init();

    log::error!("This error has been printed to Stdout");
}
```

[`Builder::target`]: https://docs.rs/env_logger/*/env_logger/struct.Builder.html#method.target
[`Target::Stdout`]: https://docs.rs/env_logger/*/env_logger/fmt/enum.Target.html

### Log messages with a custom logger

```toml
[dependencies]
log = "0.4.22"
env_logger = "0.11.5"
```

Implements a custom logger `ConsoleLogger` which prints to stdout.
In order to use the logging macros, `ConsoleLogger` implements
the [`log::Log`] trait and [`log::set_logger`] installs it.

```rust
use log::{Record, Level, Metadata, LevelFilter, SetLoggerError};

static CONSOLE_LOGGER: ConsoleLogger = ConsoleLogger;

struct ConsoleLogger;

impl log::Log for ConsoleLogger {
  fn enabled(&self, metadata: &Metadata) -> bool {
     metadata.level() <= Level::Info
    }

    fn log(&self, record: &Record) {
        if self.enabled(record.metadata()) {
            println!("Rust says: {} - {}", record.level(), record.args());
        }
    }

    fn flush(&self) {}
}

fn main() -> Result<(), SetLoggerError> {
    log::set_logger(&CONSOLE_LOGGER)?;
    log::set_max_level(LevelFilter::Info);

    log::info!("hello log");
    log::warn!("warning");
    log::error!("oops");
    Ok(())
}
```

[`log::Log`]: https://docs.rs/log/*/log/trait.Log.html
[`log::set_logger`]: https://docs.rs/log/*/log/fn.set_logger.html

### Log to the Unix syslog

```toml
[dependencies]
syslog = "7.0.0"
log = "0.4.22"
```

Logs messages to [UNIX syslog]. Initializes logger backend
with [`syslog::init`]. [`syslog::Facility`] records the program submitting
the log entry's classification, [`log::LevelFilter`] denotes allowed log verbosity
and `Option<&str>` holds optional application name.

```rust
use syslog::{Facility, Error};

fn main() -> Result<(), Error> {
    syslog::init(Facility::LOG_USER,
                 log::LevelFilter::Debug,
                 Some("My app name"))?;
    log::debug!("this is a debug {}", "message");
    log::error!("this is an error!");
    Ok(())
}
```

[`log::LevelFilter`]: https://docs.rs/log/*/log/enum.LevelFilter.html
[`syslog::Facility`]: https://docs.rs/syslog/*/syslog/enum.Facility.html
[`syslog::init`]: https://docs.rs/syslog/*/syslog/fn.init.html
[UNIX syslog]: https://www.gnu.org/software/libc/manual/html_node/Overview-of-Syslog.html

## Configuration

### Enable log levels per module

```toml
[dependencies]
log = "0.4.22"
env_logger = "0.11.5"
```

Creates two modules `foo` and nested `foo::bar` with logging directives
controlled separately with [`RUST_LOG`] environmental variable.

```rust
mod foo {
    mod bar {
        pub fn run() {
            log::warn!("[bar] warn");
            log::info!("[bar] info");
            log::debug!("[bar] debug");
        }
    }

    pub fn run() {
        log::warn!("[foo] warn");
        log::info!("[foo] info");
        log::debug!("[foo] debug");
        bar::run();
    }
}

fn main() {
    env_logger::init();
    log::warn!("[root] warn");
    log::info!("[root] info");
    log::debug!("[root] debug");
    foo::run();
}
```

[`RUST_LOG`] environment variable controls [`env_logger`][env_logger] output.
Module declarations take comma separated entries formatted like
`path::to::module=log_level`. Run the `test` application as follows:

```shell
RUST_LOG="warn,test::foo=info,test::foo::bar=debug" ./test
```

Sets the default [`log::Level`] to `warn`, module `foo` and module `foo::bar`
to `info` and `debug`.

```shell
WARN:test: [root] warn
WARN:test::foo: [foo] warn
INFO:test::foo: [foo] info
WARN:test::foo::bar: [bar] warn
INFO:test::foo::bar: [bar] info
DEBUG:test::foo::bar: [bar] debug
```

[`log::Level`]: https://docs.rs/log/*/log/enum.Level.html
[`RUST_LOG`]: https://docs.rs/env_logger/*/env_logger/#enabling-logging

### Use a custom environment variable to set up logging

```toml
[dependencies]
log = "0.4.22"
env_logger = "0.11.5"
```

[`Builder`] configures logging.

[`Builder::from_env`] parses `MY_APP_LOG`
environment variable contents in the form of [`RUST_LOG`] syntax.
Then, [`Builder::init`] initializes the logger.

```rust
use env_logger::Builder;

fn main() {
    Builder::from_env("MY_APP_LOG").init();

    log::info!("informational message");
    log::warn!("warning message");
    log::error!("this is an error {}", "message");
}
```

[`Builder`]: https://docs.rs/env_logger/*/env_logger/struct.Builder.html
[`Builder::from_env`]: https://docs.rs/env_logger/*/env_logger/struct.Builder.html#method.from_env
[`Builder::init`]: https://docs.rs/env_logger/*/env_logger/struct.Builder.html#method.init
[`RUST_LOG`]: https://docs.rs/env_logger/*/env_logger/#enabling-logging

### Include timestamp in log messages

```toml
[dependencies]
log = "0.4.22"
env_logger = "0.11.5"
chrono = "0.4.38"
```

Creates a custom logger configuration with [`Builder`].
Each log entry calls [`Local::now`] to get the current [`DateTime`] in local
timezone and uses [`DateTime::format`] with [`strftime::specifiers`] to format
a timestamp used in the final log.

The example calls [`Builder::format`] to set a closure which formats each
message text with timestamp, [`Record::level`] and body ([`Record::args`]).

```rust
use std::io::Write;
use chrono::Local;
use env_logger::Builder;
use log::LevelFilter;

fn main() {
    Builder::new()
        .format(|buf, record| {
            writeln!(buf,
                "{} [{}] - {}",
                Local::now().format("%Y-%m-%dT%H:%M:%S"),
                record.level(),
                record.args()
            )
        })
        .filter(None, LevelFilter::Info)
        .init();

    log::warn!("warn");
    log::info!("info");
    log::debug!("debug");
}
```

stderr output will contain

```
2017-05-22T21:57:06 [WARN] - warn
2017-05-22T21:57:06 [INFO] - info
```

[`DateTime::format`]: https://docs.rs/chrono/*/chrono/struct.DateTime.html#method.format
[`DateTime`]: https://docs.rs/chrono/*/chrono/datetime/struct.DateTime.html
[`Local::now`]: https://docs.rs/chrono/*/chrono/offset/struct.Local.html#method.now
[`Builder`]: https://docs.rs/env_logger/*/env_logger/struct.Builder.html
[`Builder::format`]: https://docs.rs/env_logger/*/env_logger/struct.Builder.html#method.format
[`Record::args`]: https://docs.rs/log/*/log/struct.Record.html#method.args
[`Record::level`]: https://docs.rs/log/*/log/struct.Record.html#method.level
[`strftime::specifiers`]: https://docs.rs/chrono/*/chrono/format/strftime/index.html#specifiers

### Log messages to a custom location

```toml
[dependencies]
log = "0.4.22"
log4rs = "1.3.0"
```

[log4rs] configures log output to a custom location. [log4rs] can use either an
external YAML file or a builder configuration.

Create the log configuration with [`log4rs::append::file::FileAppender`]. An
appender defines the logging destination. The configuration continues with
encoding using a custom pattern from [`log4rs::encode::pattern`].
Assigns the configuration to [`log4rs::config::Config`] and sets the default
[`log::LevelFilter`].

```rust
use log::LevelFilter;
use log4rs::{
    append::file::FileAppender,
    config::{Appender, Config, Root},
    encode::pattern::PatternEncoder,
};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let logfile = FileAppender::builder()
        .encoder(Box::new(PatternEncoder::new("{l} - {m}\n")))
        .build("log/output.log")?;

    let config = Config::builder()
        .appender(Appender::builder().build("logfile", Box::new(logfile)))
        .build(Root::builder().appender("logfile").build(LevelFilter::Info))?;

    log4rs::init_config(config)?;

    log::info!("Hello, world!");

    Ok(())
}
```

[`log4rs::append::file::FileAppender`]: https://docs.rs/log4rs/*/log4rs/append/file/struct.FileAppender.html
[`log4rs::encode::pattern`]: https://docs.rs/log4rs/*/log4rs/encode/pattern/index.html
[`log::LevelFilter`]: https://docs.rs/log/*/log/enum.LevelFilter.html

## Async Logging with `tokio-tracing`

In asynchronous applications, especially those using [`tokio`](https://tokio.rs/),
it's important to use logging tools that work seamlessly with async tasks.
The [`tracing`](https://crates.io/crates/tracing) crate provides structured logging and diagnostics specifically for async Rust applications.

### Set up Tokio and Tracing

First, add the necessary dependencies:

```toml
[dependencies]
tokio = { version = "1.40.0", features = ["full"] }
tracing = "0.1.40"
tracing-subscriber = "0.3.18"
```

The `tracing` crate provides structured, async-aware logging capabilities.
`tracing-subscriber` is used to manage subscribers that handle log output, and `tokio` enables async runtimes.

### Logging with Tracing in an Async Context

To use `tracing` in an async `tokio` runtime,
set up a tracing subscriber to handle log output and instrument async functions:

```rust
#[tokio::main]
async fn main() {
    // Set up a tracing subscriber that logs to stdout
    tracing_subscriber::fmt::init();

    // Call an async function that will generate log output
    perform_task("Ben").await;
}

#[tracing::instrument]
async fn perform_task(name: &str) {
    tracing::info!("Performing an important async task");
}
```

In this example:

- The `#[instrument]` attribute automatically generates structured logs, capturing input arguments and other context.
- `tracing_subscriber::fmt::init()` sets up a subscriber that logs to stdout.

### Logging Context in Async Functions

In async Rust, capturing context with spans is essential for logging in distributed, concurrent environments.
For example:

```rust
#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();
    task1().await;
}

#[tracing::instrument]
async fn task1() {
    tracing::info!("Starting task1");
    task2().await;
}

#[tracing::instrument]
async fn task2() {
    tracing::info!("Starting task2");
}
```

Each function call logs its span,
allowing tracing to display structured logs showing which async tasks executed and when.

### Capturing Function Return Values

You can also capture return values in async functions by setting ret to true.
This is useful for debugging functions that return futures:

```rust
#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();
    let result = compute(5).await;
    println!("Result: {}", result);
}

#[tracing::instrument(ret)]
async fn compute(input: u32) -> u32 {
    input * 2
}
```

### Customizing Field Logging with `#[instrument]`

By default, #[instrument] logs all function arguments,
but you can customize which arguments or fields to include or exclude.
Use the fields argument to control the log output.

For example, you can explicitly log only specific fields:

```rust
#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();
    greet("Ben", 42).await;
}

#[tracing::instrument(fields(user = name), skip(name))]
async fn greet(name: &str, age: u32) {
    tracing::info!("Saying hello");
}
```
