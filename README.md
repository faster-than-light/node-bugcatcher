# SoHo Token Labs Client API Library

![WIP Badge](https://img.shields.io/badge/version-1.0.0-lightgrey.svg) ![WIP Badge](https://img.shields.io/badge/status-wip-yellowgreen.svg)

## Installation &amp; Common Usage
1 - Install package

`npm install sohotokenlabs-api`

2 - Configure module to work with desired environment

```
const sohotokenlabs = require('sohotokenlabs-api')
const api = sohotokenlabs('https://api.bugcatcher.sohotokenlabs.com')
```

3 - Consume API endpoints through the initiated NPM package

```
const { stlId } = await api.postCode({
  "name": "/my/cryptocurrency/project",
  "code": "data:application/octet-stream;base64,U1RMIFJvY2tzIQ=="
})
const codeDetails = await api.getCode({stlId})
```
