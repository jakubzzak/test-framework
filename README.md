# Test Framework

## About

This test-framework was developed to unify and speed up writing unit tests as your code base is growing. Unit testing is important especially because it the the first layer of tests that capture the imperfections of your code, thus the issued resolved at this level are the cheapest ones to fix. With this analogy, we are going to invest the most time exectly into these kind of tests.

But how do we know we got the best possible coverage? Is 100% coverage even feasible? This test-framework is not trying to solve this problem. Instead, it enables you to focus on what is actually important - `context`. It introduces a strucutre to your unit tests, so you offload your busy mind from the bilerplate code that comes with it. And the best part is that while using the test-framework the `TDD` is a 🍰.

When designing and writnig tests, we want to focus on three core elements:

- 🧪 enforces code **testability** (enable DI - dependency injection and inversion)
- 💬 **focus on context** rather than the boilerplate code that comes with each test
- 🕹️ **simplifies TDD** (which is not always convenient)

The popular code/project structure of MVC (model, view, controller) or a similar alternative HDS (handler, domain, service) are the core of the

You will find different kinds of tests within different folders. At this point, there cover solely `unit testing`.

## Setup

1. ©℗ Copy-Paste the `./src` folder into your project as a (test-framework) service.
2. 📆 Ensure your packages are up to date (you might need to upgrade/downgrade according to your needs)
3. ⚙️ Run your desired customization adjustments in the config files

You can get inspired by the app examples in the `/examples` folder.

Congrats! You are ready to go. 🍻

## Nest Steps 🪜

- 💭 Figure out a way around `service/repo` unit testing
- 📈 Introduce integration test
- 🧪 Improve test coverage (well yes, test framework needs to be tested as well 😅)
- 📦 Release as an npm package
