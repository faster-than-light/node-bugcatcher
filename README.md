# SoHo Token Labs Client API Library

![WIP Badge](https://img.shields.io/badge/version-1.0-blue.svg) ![WIP Badge](https://img.shields.io/badge/status-wip-yellowgreen.svg)

## Installation &amp; Common Usage
1 - Install package

```
npm install bugcatcher-api
```

2 - Configure module to work with desired environment

```
const bugcatcher = require('bugcatcher-api')
const api = bugcatcher('https://api.bugcatcher.fasterthanlight.dev')
```

3 - Consume API endpoints through the initiated NPM package

```
const { stlId } = await api.postCode({
  "name": "/my/cryptocurrency/project",
  "code": "data:application/octet-stream;base64,U1RMIFJvY2tzIQ=="
})
const codeDetails = await api.getCode({stlId})
```
