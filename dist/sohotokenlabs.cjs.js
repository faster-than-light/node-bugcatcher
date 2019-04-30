'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));

function index(options = {}) {

  let { API_URI, stlSID } = options;
  if (!API_URI.endsWith('/')) API_URI += '/';

  function setSid(sid) {
    stlSID = sid;
  }

  function getSid(options) {
    const { token } = options;
    return get (API_URI + 'get_sid?id_token=' + token)
  }

  function getStlSid() {
    return stlSID
  }

  function getUserData(options) {
    const { sid } = options;
    return get(API_URI + 'sid/' + sid)
  }

  function postCode(options) {
    const { name, code, project = 'project' } = options;
    return post(API_URI + 'project/' + encodeURIComponent(project) + '/' + encodeURIComponent(name), {
      name,
      code,
    }).catch(err => console.error(
      '-> HTTP POST Error', 
      err, 
      { options }
    ))
  }

  const putCode = postCode;

  async function getCode(options) {
    const { stlId } = options;
    return get(API_URI + 'code/' + stlId)
  }

  function postRunTests(options) {
    const { code_stlids, test_stlids } = options;
    return post(API_URI + 'run_tests', {
      code_stlids,
      test_stlids
    })
  }

  function postTestProject(options) {
    const { 
      projectName, // required
      fileName // optional
    } = options;
    let uri = API_URI + 'test_project/' + projectName;
    if (fileName) uri += '/' + fileName;
    return post(uri)
  }

  function getTestResult(options) {
    const { 
      stlid, // required
      options: config // optional
    } = options;
    let uri = API_URI + 'test_result/' + stlid;
    // if (config && config.format) uri += '&format=' + config.format
    return get(uri, config || { responseType: 'stream' })
  }

  function submitPaymentMethodToken(options) {
    return post(API_URI + 'payment_method', options)
  }

  function subscribeToBugCatcher(options) {
    return post(API_URI + 'subscription', options)
  }

  function addLead(options) {
    return post(API_URI + 'bugcatcher_interest', options)
  }

  // @return Promises resolving to javascript objects
  async function get(url, options) {
    let headers;
    if (options && options.headers) headers = options.headers;
    return axios.get(url, {
      ...options,
      headers: {
        'STL-SID': stlSID,
        ...headers
      }
    })
  }
  async function post(url, data) {
    return axios.post(url, data, {
      headers: {
        'STL-SID': stlSID,
        'Content-Type': 'application/json',
      }
    })
  }

  // return exports
  return {
    addLead,
    getCode,
    // getRunTests,
    getSid,
    getStlSid,
    getTestResult,
    getUserData,
    postCode,
    postRunTests,
    postTestProject,
    putCode,
    setSid,
    submitPaymentMethodToken,
    subscribeToBugCatcher,
    greeter: (name = 'User') => {
      return `Hey, ${name}!`;
    }
  }

}

module.exports = index;
