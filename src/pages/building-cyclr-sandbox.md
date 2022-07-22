---
title: Improving Onboarding Speed and Quality by 200%+
---

# Improving Onboarding Speed and Quality by 200%+

### Taking a 1 month onboarding to a 4 day onboarding

<figure>
    <img src="../../img/cyclr-sandbox/cyclr-sandbox-login.png">
    <figcaption>Login Page</figcaption>
</figure>

## Quick Intro

At Cyclr, an iPaaS company which provides a zero-code integration platform to businesses, I develop and maintain integrations.

Cyclr is a growing company with recent investment.

However, with each new developer, begins a period of onboarding - getting them up to speed with our tools and systems. This can take up to 2 weeks per new starter.

This primarily consists of working with a developer on whichever problems were within the Sprint.

## This had some issues:

- New developers' learning process was unstructured. Learning can be sped up by building ontop of the skills of each lesson, rather than jumping between topics.
- Developers had to think reactively to explain each topic as it appeared, which is not the best way to teach consisely and clearly.
- Developers found 90% (made up statistic) of what they were saying had been repeated to the previous developers. If it's repeatable - it should be automated.
- New developers had little time to reflect and revise what they had just learned, as they were jumping between topics.

## The Solution

Please see my presentation to understand the previous issues with the onboarding process, and how we intend to improve these.

<figure>
<iframe width="560" height="315" src="https://www.youtube.com/embed/A3Baww3lEBI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</figure>

<figure>
    <img src="../../img/cyclr-sandbox/cyclr-sandbox-chapter-menu.gif">
    <figcaption>Lesson & Chapter Menu</figcaption>
</figure>

## The Tech

The entire App was built using a single NodeJS server using Express.

It was developed using Docker to provide portability and GitHub actions were setup to automatically build and load a new docker image into Kubernetes on a successful pull request.

Webpack was used to keep the bundling from /src to /public in a single place, however the Webpack flow included multiple stages of parsing for markdown files.

## Custom Markdown Parsing

The 'markdown-it-loader' package enabled me to integrate markdown-it to HTML parsing easily. However, I wanted to develop custom markdown blocks for different situations:

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

Whilst it does the job, in hindsight, this could have been structured in a slightly nicer way so when we return to update the process is slightly clearer. This has been added to the project trello.

## The Results

The initial plan was always to utilise Cyclr Sandbox in the week after the presentation, when we were joined by two new Connector Developers.

We prepared a structured feedback system, with the majority of feedback being loaded straight into a trello board.

The onboarding process was far more steamlined and effective. This was assessed by feedback from the starters, who thoroughly enjoyed the mastery style process and found the challenges enjoyable.

The fact that we managed to cover all the available content within the first 4 days of their onboarding was remarkable. This content matched around two weeks worth of dedicated teaching using our previous onboarding processess and Public APIs.

After those 4 days, the new starters were independently working on the sprint, with an awareness of building custom-connectors in Cyclr that probably took me about three weeks to reach.
