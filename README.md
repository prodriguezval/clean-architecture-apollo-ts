# Clean Architecture with Apollo Server and Typescript

## Context
This is a PoC that proves that is possible to write well-structured code with Apollo server and typescript using
clean architecture pattern.

## Why

For projects that have the potential to grow maybe you'll need to separate the single apollo server in subgraphs to build a
federated service, in the beginning, if we write the code using this approach:
- Generate a common structure for all the team.
- The onboarding of new developers will become easier.
- It would be most testable and extensible.
- Can easily separate without major pains.

if you need to divide the service in subgraphs you can check this [repo](https://github.com/prodriguezval/federated-graphql-playground) to get guidance

## File Structure
- src/infrastructure: External services, like the logger or the apollo server, apply to all the project
- src/< domain >: Like product or user, contains 4 folders:
  - configuration: Link the framework, storage, and tools to the business logic
  - domain: contains the contracts, exception, and entities
  - infrastructure: contains all the external integration implementations, like API's, databases, etc, typically based on a contract in the domain
  - usecase: orchestrate the flow of the data between the outside layer and the entities.

## Tech Stack:
- @graphql-tools/merge: Allow you to merge multiples schemas in one to serve multiple services in the graphql server.
- fastify: Fastify is a web server for node
- apollo-server-fastify: This package adapts fastify to work with Apollo.
- fastify-cookie: allow easy cookie management in fastify
- graphql: Allow to write the schemas that will be served in the graphql server.
- pino: Lightweight logger for node.
- tsyringe: Dependency injector for typescript.
- reflect-metadata: required for trsyringe, to build the dependency container.
