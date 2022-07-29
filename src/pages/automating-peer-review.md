---
title: Automating Peer Review
cover: "../img/cyclr-JSON-Scripts/cyclr-json-scripts.png"
coverAlt: "The Cyclr JSON Scripts Application"
description: "Simple, helpful dev tools"
---

# Automating Peer-Review

### Improving efficiency by catching our own mistakes.

<figure>
    <img src="../../img/cyclr-JSON-Scripts/cyclr-json-scripts.png">
    <figcaption>Cyclr JSON-Script Tool</figcaption>
</figure>

## Quick Intro

About 1 Month into my time at Cyclr, I noticed a large portion of the sprint cards getting actionable feedback were simple mistakes.

The custom-auth flow was working correctly, and the complex custom-field lookups were running like a well oiled machine, a tricky challenge overcome. But the formatting on the fields wasn't perfect, the variable names didn't match the standardised list, and

## This had some issues:

- New developers' learning process was unstructured. Learning can be sped up by building ontop of the skills of each lesson, rather than jumping between topics.
- Developers had to think reactively to explain each topic as it appeared, which is not the best way to teach consisely and clearly.
- Developers found a lot of the content they were teaching was identical between new starters. If it's repeatable - it should be automated.
- New developers had little time to reflect and revise what they had just learned, as they were jumping between topics.

## The Solution

I presented the solution during a company-wide meeting a few weeks ago. This covered the problem and how it has been solved. Video below:

<figure>
<iframe width="560" height="315" src="https://www.youtube.com/embed/A3Baww3lEBI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</figure>

## The Tech

The entire App was built using a single NodeJS server using Express.

MongoDB was used as the document-based structured mirrors the familiar response structure of JSON APIs.

Since Connector Developer become familiar with that structure, this will mean they are easily able to support the project on the DB-front.

<figure>
    <img src="../../img/cyclr-sandbox/cyclr-sandbox-chapter-menu.gif">
    <figcaption>Lesson & Chapter Menu</figcaption>
</figure>

It was developed using Docker to provide portability. GitHub actions were setup to automatically build and transpose a new docker image into Kubernetes on a successful pull request.

Webpack was used to keep the bundling from /src to /public in a single place, however the Webpack flow included multiple stages of parsing for markdown files.

## Custom Markdown Parsing

The 'markdown-it-loader' package enabled me to integrate markdown-it to HTML parsing easily.

However, I wanted to develop custom markdown blocks for different situations:

<pre>
::: mermaid
Graph LR
A(Variable)-->B(Other)
:::
</pre>

and parse these into HTML-ready blocks, with pre-defined styling variables and more.

To do that, I used the following, or similar for other blocks, with each markdown-it loader stage:

<pre>
render: function (tokens, idx) {
    const me = tokens[idx].info.trim().match('mermaid');
    let markup = '';
    if (me) {
        markup = `<\div class="mermaid">%%
        {init: {'theme': 'base', 'themeVariables': 
            { 
        'darkMode': true,
        'primaryColor': '#ea3556',
        'edgeLabelBackground':'#ea3556',  
        'primaryBorderColor': '#ea3556', 
        'lineColor': '#ea3556', 
        'mainBkg': '#ea3556', 
        'fontSize': '20px'
        }}}%%\n` +
        tokens[idx + 2].children.map((child, i) => {
            if (i === 0) return child.content + '\n';
            if (child.tag === 'br') return;
            return '  ' + child.content + '\n';
            }).join('') + '</ div>';
        tokens[idx + 2].children = [];
    }
    return markup;
},
</pre>

Whilst it does the job, in hindsight, this could have been structured in a nicer way so when we return to update the process is slightly clearer. This has been added to the project trello.

## The Results

The plan was to utilise Cyclr Sandbox in the week after the presentation, when we were joined by two new Connector Developers.

We prepared a structured feedback system, with the majority of feedback being loaded straight into a Trello board.

The onboarding process was far more steamlined and effective. This was assessed by feedback from the starters, who enjoyed the mastery-style curriculum and found the challenges enjoyable.

The fact that we covered all the available content within the first 4 days of their onboarding was remarkable. I had expected at least 7 - 10 days.

These 4 days matched around three weeks worth of dedicated teaching using our previous onboarding processess and Public APIs.

After those 4 days, the new starters were independently working on the sprint, with an awareness of building custom-connectors in Cyclr.
