---
title: Building Cyclr Sandbox
---

# Building Cyclr Sandbox

### Improving the onboarding of Connector Developers

<figure>
    <img src="../../img/cyclr-sandbox/cyclr-sandbox-login.png">
    <figcaption>Login Page</figcaption>
</figure>

## Quick Intro

At Cyclr, an iPaaS company which provides a high-quality integration platform to businesses, I develop and maintain Integrations.

Cyclr is a growing company with recent investment.

However, with each new developer, begins a period of onboarding - getting them up to speed with our tools and systems.

This primarily consists of working with a developer on whichever problems were within the Sprint.

### This had some issues:

- By working on tasks in the Sprint, new developers' learning process was unstructured. Learning can be sped up by building ontop of the skills of each lesson, rather than jumping between topics.
- Developers had to think reactively to explain each topic as it appeared, which is not the best way to teach consisely and clearly.
- Developers found 90% (made up statistic) of what they were saying had been repeated to the previous developers. If it's repeatable - it should be automated.
- New developers had little time to reflect and revise what they had just learned, as they were jumping between topics.

## The Solution

I began a front-end lesson app (containing diagrams, quizzes, API documentation and more) combined with a back-end API which the new developers could interact with as they proceed through the lessons.

By the end of the lessons, the new developers would have a confident understanding of the Cyclr system and common procedure, without needing the constant supervision of a developer. That's not to say they will be abandoned during their onboarding, help will always be 1 Slack message away, but to get them used to independently solving problems and building integrations.

<figure>
    <img src="../../img/cyclr-sandbox/cyclr-sandbox-chapter-menu.gif">
    <figcaption>Lesson & Chapter Menu</figcaption>
</figure>

## The Tech

The entire App was hosting using a single NodeJS server using Express. This was effective since it would be an internal training tool, with a limited pool of active users.

It was developed using Docker to provide portability and GitHub actions were setup to automatically assemble and load a new docker image into Kubernetes on a successful pull request.

Webpack was used to keep the bundling from /src to /public in a single place, and whilst complicated - allowed me to easily implement certain stages within bundles.

## Custom Markdown Parsing

The 'markdown-it-loader' package enabled me to integrate markdown-it to HTML parsing easily. However, all the functionality I wanted was not there. I wanted to easily take custom blocks within markdown:

<pre>
::: mermaid
Graph LR
A(Variable)-->B(Other)
:::
</pre>

and parse these into HTML, with pre-defined styling variables and more.

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
<figure>
<iframe width="560" height="315" src="https://www.youtube.com/embed/A3Baww3lEBI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</figure>
