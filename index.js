import fetch from 'node-fetch'

module.exports = (options = {}) => {

  let { API_URI, stlSID } = options

  function setSid(sid) {
    stlSID = sid
  }

  function getSid(options) {
    const { token } = options
    return get (API_URI + 'get_sid?id_token=' + token)
  }

  function postCode(options) {
    const { name, code } = options
    return post(API_URI + 'code', {
      name,
      code,
    })
  }

  function putCode(options) {
    const { name, code, project } = options
    return put(API_URI + 'project/' + encodeURIComponent(project) + '/' + encodeURIComponent(name), {
      code,
    })
  }

  async function getCode(options) {
    const { stlId } = options
    return get(API_URI + 'code/' + stlId)
  }

  function postRunTests(options) {
    const { code_stlids, test_stlids } = options
    return post(API_URI + 'run_tests', {
      code_stlids,
      test_stlids
    })
  }

  function getRunTests(requestId) {
    return fetch(API_URI + 'run_tests/' + requestId, {
      method: 'GET',
      headers: {
        'STL-SID': stlSID,
        'Content-Type': 'text/html',
        'Access-Control-Request-Method': 'GET',
        'credentials': 'include',
        'mode': 'cors',
      },
    }).then(res => res.json())
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
  async function get(url) {
    return fetch(url, {
      method: 'GET',
      headers: {
        'STL-SID': stlSID,
      },
    }).then(res => res.json())
  }
  async function post(url, body) {
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'STL-SID': stlSID,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return result.json()
  }
  async function put(url, body) {
    const result = await fetch(url, {
      method: 'PUT',
      headers: {
        'STL-SID': stlSID,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return result.json()
  }

  // return exports
  return {
    addLead,
    getCode,
    getRunTests,
    getSid,
    postCode,
    postRunTests,
    putCode,
    setSid,
    submitPaymentMethodToken,
    subscribeToBugCatcher,
    greeter: (name = 'User') => {
      return `Hey, ${name}!`;
    }
  }

}
