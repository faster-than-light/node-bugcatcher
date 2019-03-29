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
      stlid // required
    } = options;
    let uri = API_URI + 'test_result/' + stlid;
    return get(uri)
  }


  // function getRunTests(requestId) {
  //   return fetch(API_URI + 'run_tests/' + requestId, {
  //     method: 'GET',
  //     headers: {
  //       'STL-SID': stlSID,
  //       'Content-Type': 'text/html',
  //       'Access-Control-Request-Method': 'GET',
  //       'credentials': 'include',
  //       'mode': 'cors',
  //     },
  //   }).then(res => res.json())
  // }

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
  async function get(url) {
    return axios.get(url, {
      headers: {
        'STL-SID': stlSID,
      },
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
