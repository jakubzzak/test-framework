# Test Framework

## About

This test-framework was developed to unify and speed up writing tests as your code base is growing. The common

We want to focus on three core elements:

- make our code testable (enable DI - dependency injection and inversion)
- focus on context rather than the boilerplate code that comes with each test
- follow TDD (which is not always convenient)

The popular code/project structure of MVC (model, view, controller) or a similar alternative HDS (handler, domain, service) are the core of the

You will find different kinds of tests within different folders. At this point, they we cover solely unit testing.

## Setup

1. Copy-Paste the ... folder into your project as a service.
2. Ensure your packages are up to date (you might need to upgrade/downgrade according to your needs)
3. Add the test-framework path to the `coveragePathIgnorePatterns` and `modulePathIgnorePatterns` arrays
4. Run your desired customization adjustments

Congrats! You are ready to go.

## Nest Steps

- Figure out a way around `service` unit testing
- Introduce integration test
- Improve test coverage (well yes, test framework needs to be tested as well 😅)
- Release as an npm package
