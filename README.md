# grcengineer.io · Roman Charleston

**Cloud security. Clear evidence. Practical GRC.**

The source for my security portfolio and writing hub, built with **Eleventy 3**, Nunjucks, and vanilla CSS/JavaScript. Published at **[grcengineer.io](https://grcengineer.io)**.

## Explore the work

| Project | Evidence | Repository |
|---|---|---|
| AWS security assessment | Terraform, sanitized Prowler results, remediation analysis | [Open repo](https://github.com/rcharleston/aws-security-assessment) |
| Azure Sentinel honeypot | Telemetry workflow, KQL, original map screenshots | [Open repo](https://github.com/rcharleston/azure-sentinel-honeypot) |
| Windows Prefetch analysis | Forensic reasoning, observations, PECmd commands | [Open repo](https://github.com/rcharleston/windows-prefetch-analysis) |

Completed labs have a **Documented lab** label. Future GRC ideas are labeled **Concept**. Every completed case study links to its original Medium walkthrough and repository.

## Run locally

Requires Node.js 20+ and npm.

```sh
git clone https://github.com/rcharleston/grc.git
cd grc
npm ci
npm run serve
```

Open the URL printed by Eleventy. Build the static site with `npm run build`.

## Repository map

```text
src/_data/            Projects, writing links, site metadata
src/_includes/        Shared layouts and components
src/projects/         Index and generated case-study pages
src/posts/            On-site writing
src/assets/           Styles, scripts, banners, evidence images
.github/workflows/    Build and GitHub Pages deployment
```

Update `src/_data/projects.json`. Status is `completed` or `concept`; completed work needs an actual repository and source link. Keep claims and metrics traceable to evidence.

## Publishing

The GitHub Pages workflow deploys pushes to `main`: install locked dependencies, build `_site/`, and deploy the generated artifact. `src/CNAME` retains the custom domain.

[GitHub profile](https://github.com/rcharleston) · [Medium](https://medium.com/@romancharleston) · [LinkedIn](https://www.linkedin.com/in/romancharleston/)
