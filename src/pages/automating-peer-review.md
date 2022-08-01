---
title: Automating Peer Review
cover: "../img/cyclr-json-scripts/cyclr-json-scripts.png"
coverAlt: "The Cyclr JSON Scripts Application"
description: "Simple, helpful dev tools"
---

# Automating Peer-Review

### Quickly implementing solutions

<figure>
    <img src="../../img/cyclr-json-scripts/cyclr-json-scripts.png">
    <figcaption>Cyclr JSON-Script Tool</figcaption>
</figure>

## The Problem

After my first month of working at Cyclr, I found the same issues were causing sprint tickets to be pushed back into development.

These were typically issues related to field formatting. When you have many methods with 50+ fields each, becomes harder to manually check without spending hours of time on something which could be automated.

Many of these issues did not affect the functionality of the connectors, but caused consistency issues between the connectors.

These were issues which could be broken down into steps, from formatting to more advanced Connector Developer processes, such as evaluating the connectivity of a connector both internally but also externally to other connectors in the library.

## Iterative Problem Solving

Using Node, I planned and developed an initial prototype to manipulate connector files to perform bulk-validation and fixes of common issues. This proved a success, eliminating a large proportion of common feedback.

I used the Inquirer NPM package to add multi-choice queries to the tool. This allowed Connector Developers to select between validations, confirm operations and make choices which the program could not.

This enabled the script tool to be useful in more situations as it was not required to always make a change, particularly when the decision was more contextual.

Subsequently, with each piece of feedback, I began to consider if an automation solution was possible, no matter the size of the problem. This fed into a trello board, where each item was considered and - if viable - would be added to the tool.

This approach has found us in a situation where no issues which can be automated have not been, affording us much more time to focus on issues which are unique to the specific connector.

Due to completing the available issues, this tool now required very little maintenance and has reached the stage where it's logic will be implemented into the platform.

## The Results

By developing this tool seperately, as opposed to implementing it into the Cyclr Platform initially, I was able to accomplish a few things:

- Faster development of the tool, only focusing on the specific use-case instead of having to consider additional factors.
- The proof of concept could be verified and tested. We were also able to judge, and benefit from, the tools' effectiveness with clear results in a short timeframce. As it was a success, plans to integrate the logic into the platform are now scheduled.
- Momentum of tickets through the sprint is higher, with more tickets passing their 'peer-review' stages first time. Connector Developers do not have to spend time and productivity focus on the automatable tasks.
