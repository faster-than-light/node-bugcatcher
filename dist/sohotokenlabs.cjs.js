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

  /**
   * @title GET Project data
   * @dev Get file list and other data for a project
   * 
   * @param {string} project Name of project being queried
   */
  function getProject(project) {
    if (!project) return get(API_URI + 'project')
    else return get(API_URI + 'project/' + project)
  }

  /**
   * @title PUT/POST Code
   * @dev For uploading files to the backend with a project name
   * 
   * @param {object} options JSON object holding our input properties
   * @property {options.string} code Base64 encoded file data
   * @property {options.string} name Filename of posted code
   * @property {options.string} project Optional name for containing project (default used when empty)
   */
  function postCode(options) {
    const { name, code, project = 'project' } = options;
    return post(API_URI + 'project/' + encodeURIComponent(project) + '/' + encodeURIComponent(name), {
      name,
      code,
    })
  }

  /**
   * @dev PUT & POST should both persist data to the backend
   */
  const putCode = postCode;

  /**
   * @title GET Test Project
   * @dev Get the status of a test on a project or a file
   * 
   * @param {object} options JSON object holding our input properties
   * @property {options.string} stlid Identifier of the test
   */
  function getRunTests(options) {
    const { 
      stlid, // required
    } = options;
    return get(API_URI + 'run_tests/' + stlid)
  }

  /**
   * @title POST Test Project
   * @dev Initiate a test on a project or a file
   * 
   * @param {object} options JSON object holding our input properties
   * @property {options.string} projectName Name of the project
   * @property {options.string} fileName Optional filename if running est on 1 file
   */
  function postTestProject(options) {
    const { 
      projectName, // required
      fileName // optional
    } = options;
    let uri = API_URI + 'test_project/' + projectName;
    if (fileName) uri += '/' + fileName;
    return post(uri)
  }

  /**
   * @title GET Test Results
   * @dev Get results on a completed test
   * 
   * @param {object} _options JSON object holding our input properties
   * @property {_options.string} stlid Security Identifier of the completed test
   * @property {_options.object} options Optional JSON object holding request configuration properties
   *    @note `options` may include properties like `headers`, `responseType`, etc. which will be
   *        added to the request.
   * @property {options.object} headers Optional JSON object containing request headers
   * @property {options.string} responseType Optional XHR `responseType` desired {blob|json}
   * @property {options.string} format Optional specified response format desired {pdf|json}
   */
  function getTestResult(_options) {
    const { 
      stlid, // required
      format, // optional {pdf || json(default)} format
      options, // optional request options (headers, etc.)
    } = _options;
    let uri = API_URI + 'test_result/' + stlid;
    if (format) uri += '?format=' + format;
    return get(uri, options || { responseType: 'stream' })
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

  function deleteCode(pathToCode) {
    return del(API_URI + 'project/' + pathToCode)
  }

  function deleteProject(project) {
    return del(API_URI + 'project/' + project)
  }

  /** @return Promises resolving to javascript objects */
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
  async function del(url) {
    return axios.delete(url, {
      headers: {
        'STL-SID': stlSID,
        'Content-Type': 'application/json',
      }
    })
  }

  // return exports
  return {
    addLead,
    deleteCode,
    deleteProject,
    getProject,
    getRunTests,
    getSid,
    getStlSid,
    getTestResult,
    getUserData,
    postCode,
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
